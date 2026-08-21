import { useContext, useState } from "react";
import { useRef } from "react";
import io from "socket.io-client";
import { TextField, Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/videocall.css";

const isLocal = window.location.hostname === "localhost";

const server_url = isLocal
  ? import.meta.env.VITE_BACKEND_URL_LOCAL
  : import.meta.env.VITE_BACKEND_URL_PROD;
let connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export function VideoCall() {
  const navigate = useNavigate();

  let socketRef = useRef();
  let socketIdRef = useRef();
  let localVideoRef = useRef();

  let [videoAvailable, setVideoAvailable] = useState(true);
  let [audioAvailable, setAudioAvailable] = useState(true);
  let [screenAvailable, setScreenAvailable] = useState(true);
  let [video, setVideo] = useState([]);
  let [audio, setAudio] = useState(true);
  let [screen, setScreen] = useState(false);

  let [showModal, setShowModal] = useState(false);

  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);

  const { user } = useContext(AuthContext);

  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");

  const videoRef = useRef([]);
  let [videos, setVideos] = useState([]);

  async function getPermissions() {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  });

  useEffect(() => {
    getPermissions();
  }, []);

  function getUserMediaSuccess(stream) {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        console.log(description);
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setVideo(false);
          setAudio(false);

          try {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoRef.current.srcObject = window.localStream;

          for (let id in connections) {
            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
              connections[id]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id,
                    JSON.stringify({ sdp: connections[id].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        })
    );
  }

  let silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  function getUserMedia() {
    if ((videoAvailable && video) || (audioAvailable && audio)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .then((stream) => {})
        .catch((err) => console.log(err));
    } else {
      try {
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [video, audio]);

  function gotMessageFromServer(fromId, message) {
    let signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }
      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  }

  function addMessage(data, sender, socketIdSender) {
    setMessages((prev) => [...prev, { sender: sender, data: data }]);

    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevMessages) => prevMessages + 1);
    }
  }

  let connectToSocketServer = () => {
    console.log("Socket.IO server initializing...");

    socketRef.current = io.connect(server_url, { secure: false });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);
      console.log("windowlocationhref", window.location.href);
      socketIdRef.current = socketRef.current.id;

      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConfigConnections
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            console.log("BEFORE:", videoRef.current);
            console.log("FINDING ID: ", socketListId);

            let videoExists = videoRef.current.find(
              (video) => video.socketId === socketListId
            );

            if (videoExists) {
              console.log("FOUND EXISTING");

              // Update the stream of the existing video
              setVideos((videos) => {
                const updatedVideos = videos.map((video) =>
                  video.socketId === socketListId
                    ? { ...video, stream: event.stream }
                    : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            } else {
              // Create a new video
              console.log("CREATING NEW");
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true,
              };

              setVideos((videos) => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {
              console.log(e);
            }

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  let connect = () => {
    setAskForUsername(false);
    getMedia();

    localStorage.setItem("zoom-username", username);
    localStorage.setItem("zoom-meeting-url", window.location.href);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("zoom-username");
    const savedMeetingUrl = localStorage.getItem("zoom-meeting-url");

    if (savedUsername && savedMeetingUrl === window.location.href) {
      setUsername(savedUsername);
      setAskForUsername(false);
      getMedia();
    }
  }, []);

  function handleVideo() {
    setVideo(!video);
  }
  function handleAudio() {
    setAudio(!audio);
  }

  function handleCallDisconnect() {
    try {
      const stream = localVideoRef.current?.srcObject;
      if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setVideo(false);
        setAudio(false);
      }

      localVideoRef.current.srcObject = null; // ✅ Clear the video element
    } catch (e) {
      console.log("Error stopping tracks:", e);
    }

    localStorage.removeItem("zoom-username");
    localStorage.removeItem("zoom-meeting-url");

    navigate("/home");
    window.location.reload();
  }

  function sendMessage() {
    console.log(socketRef.current);
    socketRef.current.emit("chat-message", message, username);
    setMessage("");
  }

  function getDislayMediaSuccess(stream) {
    console.log("HERE");
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setScreen(false);

          try {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoRef.current.srcObject = window.localStream;

          getUserMedia();
        })
    );
  }

  function getDisplayMedia() {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  }

  useEffect(() => {
    if (screen !== undefined) {
      getDisplayMedia();
    }
  }, [screen]);

  function handleScreen() {
    setScreen(!screen);
  }

  return (
  <div className="min-h-screen overflow-hidden bg-slate-950 text-white">

    {askForUsername ? (
      /* =========================
         LOBBY / PREVIEW
      ========================== */
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">

        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />
        </div>

        <div className="relative w-full max-w-4xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium text-indigo-400">
              Mern Connect
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Enter into Lobby
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Set your username and make sure your camera is ready.
            </p>
          </div>

          {/* Preview Card */}
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-sm sm:p-6">

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

              {/* Video Preview */}
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
                <video
                  className="h-full w-full object-cover"
                  ref={localVideoRef}
                  autoPlay
                  muted
                />

                {/* Camera label */}
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  Camera Preview
                </div>
              </div>

              {/* Join Section */}
              <div className="flex flex-col justify-center">

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white">
                    Ready to join?
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Enter your name below before joining the meeting.
                  </p>
                </div>

                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <button
                  type="button"
                  onClick={connect}
                  className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
                >
                  Join Meeting
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

    ) : (

      /* =========================
         MEETING ROOM
      ========================== */
      <div className="relative h-screen w-screen overflow-hidden bg-black">

        {/* =========================
            CHAT PANEL
        ========================== */}
        {showModal ? (
          <div className="absolute right-4 top-4 z-30 flex h-[calc(100vh-120px)] w-[calc(100%-32px)] max-w-sm flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 sm:right-6 sm:top-6 sm:h-[calc(100vh-140px)]">

            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Chat
                </h4>

                <p className="mt-0.5 text-xs text-slate-500">
                  Meeting messages
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <CloseIcon sx={{ fontSize: 19 }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((item, index) => (
                    <div key={index}>
                      <p className="text-xs font-semibold text-indigo-400">
                        {item.sender}
                      </p>

                      <p className="mt-1 break-words text-sm leading-6 text-slate-300">
                        {item.data}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-center">
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      No messages yet
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Start the conversation.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-800 bg-slate-900 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* =========================
            LOCAL VIDEO
        ========================== */}
        <video
          className="absolute bottom-24 right-4 z-20 h-28 w-44 rounded-xl border border-slate-700 bg-slate-900 object-cover shadow-2xl sm:bottom-28 sm:right-6 sm:h-36 sm:w-56"
          ref={localVideoRef}
          autoPlay
          muted
        />

        {/* =========================
            REMOTE VIDEOS
        ========================== */}
        <div className="flex h-full w-full items-center justify-center p-4 pb-24 sm:p-6 sm:pb-28">
          <div className="grid h-full w-full auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <div
                key={video.socketId}
                className="relative min-h-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                <video
                  className="h-full w-full object-cover"
                  ref={(ref) => {
                    if (ref && video.stream) {
                      ref.srcObject = video.stream;
                    }
                  }}
                  autoPlay
                />
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            CONTROL BAR
        ========================== */}
        <div className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl sm:gap-2 sm:p-2.5">

            {/* Video */}
            <button
              type="button"
              onClick={handleVideo}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors sm:h-12 sm:w-12 ${
                video
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "bg-red-500/15 text-red-400 hover:bg-red-500/25"
              }`}
            >
              {video ? (
                <VideocamIcon sx={{ fontSize: 22 }} />
              ) : (
                <VideocamOffIcon sx={{ fontSize: 22 }} />
              )}
            </button>

            {/* Audio */}
            <button
              type="button"
              onClick={handleAudio}
              className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors sm:h-12 sm:w-12 ${
                audio
                  ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                  : "bg-red-500/15 text-red-400 hover:bg-red-500/25"
              }`}
            >
              {audio ? (
                <MicIcon sx={{ fontSize: 22 }} />
              ) : (
                <MicOffIcon sx={{ fontSize: 22 }} />
              )}
            </button>

            {/* Screen Share */}
            <button
              type="button"
              onClick={handleScreen}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-slate-800 hover:text-white sm:h-12 sm:w-12"
            >
              {screenAvailable ? (
                <StopScreenShareIcon sx={{ fontSize: 22 }} />
              ) : (
                <ScreenShareIcon sx={{ fontSize: 22 }} />
              )}
            </button>

            {/* Chat */}
            <button
              type="button"
              onClick={() => setShowModal(!showModal)}
              className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors sm:h-12 sm:w-12 ${
                showModal
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Badge badgeContent={newMessages} color="primary">
                <MessageIcon sx={{ fontSize: 22 }} />
              </Badge>
            </button>

            {/* Divider */}
            <div className="mx-1 h-7 w-px bg-slate-700" />

            {/* End Call */}
            <button
              type="button"
              onClick={handleCallDisconnect}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white transition-colors hover:bg-red-500 sm:h-12 sm:w-12"
            >
              <CallEndIcon sx={{ fontSize: 22 }} />
            </button>

          </div>
        </div>

      </div>
    )}
  </div>
);
}