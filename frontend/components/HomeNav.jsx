import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";

export default function HomeNav() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("User Logged Out");
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">

        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <img
            src="/logo.png"
            alt="Mern Connect"
            className="h-9 w-9 object-contain"
          />

          <span className="text-lg font-semibold tracking-tight text-white">
            Mern Connect
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">

          {/* Home */}
          <Link
            to="/home"
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <HomeIcon
              sx={{ fontSize: 19 }}
              className="transition-colors"
            />

            <span className="hidden sm:inline">
              Home
            </span>
          </Link>

          {/* History */}
          <Link
            to="/history"
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <HistoryIcon sx={{ fontSize: 19 }} />

            <span className="hidden sm:inline">
              History
            </span>
          </Link>

          {/* Divider */}
          <div className="mx-1 hidden h-6 w-px bg-slate-800 sm:block" />

          {/* Logout */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
          >
            <LogoutIcon sx={{ fontSize: 19 }} />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </nav>
      </div>
    </header>
  );
}