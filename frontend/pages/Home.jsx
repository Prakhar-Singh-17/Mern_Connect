import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import HomeNav from "../components/HomeNav";
import { axios } from "../axiosConfig";

export default function Home() {
  const { setUser } = useContext(AuthContext);
  const [meetingCode, setMeetingCode] = useState("");
  const navigate = useNavigate();

  function saveHistory() {
    axios
      .post("/addToHistory", { meetingCode })
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          navigate(`/${meetingCode}`);
          toast.success("Meeting Joined");
        }
      })
      .catch(() => {
        toast.error("Error Joining Meeting");
      });
  }

  async function joinRoom() {
    await saveHistory();
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-150px] top-1/4 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <HomeNav />

      <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-20">

          {/* Left Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-400 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Video meetings made simple
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Connect with anyone,
              <span className="block bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                anywhere.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
              Enter a meeting code to join an existing call or create a new
              meeting instantly.
            </p>

            {/* Meeting Input */}
            <div className="mt-8 flex w-full max-w-lg flex-col gap-3 sm:flex-row">

              <input
                type="text"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                placeholder="Enter meeting code"
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

              <button
                type="button"
                onClick={joinRoom}
                className="rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-[0.98]"
              >
                Join / Create
              </button>

            </div>

            <p className="mt-4 text-xs text-slate-600">
              No downloads required. Just enter a meeting code and connect.
            </p>
          </div>

          {/* Right Visual */}
          <div className="relative flex items-center justify-center">

            <div className="absolute h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/join-call.jpg"
                  alt="Join a video call"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}