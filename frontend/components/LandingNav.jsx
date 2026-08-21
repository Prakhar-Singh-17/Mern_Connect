import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CodeModal from "./CodeModal";
import { toast } from "react-toastify";

export default function LandingNav() {
  let [showModal, setShowModal] = useState(false);
  let [meetingCode, setMeetingCode] = useState("");

  const navigate = useNavigate();

  function navigateToMeeting() {
    if (meetingCode.length > 0) {
      navigate(`/${meetingCode}`);
      showModal(false);
      toast.success("Meeting Joined");
    } else {
      toast.error("Failed to join meeting");
    }
  }

  return (
    <>
      {/* Join Meeting Modal */}
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/40">

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Join a meeting
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Enter the meeting code to continue
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>

            {/* Meeting Code Input */}
            <div className="mb-6">
              <label
                htmlFor="meeting-code"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Meeting code
              </label>

              <input
                id="meeting-code"
                type="text"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                placeholder="Enter meeting code"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={navigateToMeeting}
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
              >
                Join / Create
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Navbar */}
      <header className="relative z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">

          {/* Logo */}
          <Link to="/" className="group">
            <div className="flex items-center gap-3">
              <img
      src="/logo.png"
      alt="Mern Connect"
      className="h-9 w-9 object-contain"
    />

              <span className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-indigo-300">
                Mern Connect
              </span>
            </div>
          </Link>

          {/* Navigation Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            <button
              type="button"
              onClick={() => setShowModal(!showModal)}
              className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              <span className="hidden sm:inline">
                Join as a Guest
              </span>
              <span className="sm:hidden">
                Join
              </span>
            </button>

            <Link to="/auth">
              <button
                type="button"
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-[0.98]"
              >
                Login / Signup
              </button>
            </Link>

          </div>
        </div>

        {/* Subtle divider */}
        <div className="mx-6 border-b border-slate-900 sm:mx-8 lg:mx-12" />
      </header>
    </>
  );
}