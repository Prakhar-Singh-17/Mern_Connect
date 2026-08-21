import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { axios } from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LandingNav from "../components/LandingNav";

export default function AuthenticationPage() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  let [formState, setFormState] = useState(1);
  let [fullname, setFullName] = useState("");
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");

  async function signup(e) {
    console.log("Clicked for signup");
    e.preventDefault();

    axios
      .post("/signup", { fullname, username, password })
      .then((res) => {
        if (res.data.success) {
          toast.success("Signup Successful");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function login(e) {
    console.log("Clicked for signup");
    e.preventDefault();

    axios
      .post("/login", { username, password })
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          toast.success("Login Successful");
          localStorage.setItem("token", res.data.token);
          setUser(res.data.user);
          navigate("/home");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in login");
      });
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-200px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute bottom-[-200px] right-[-150px] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <LandingNav />

      <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {formState ? "Welcome back" : "Create your account"}
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              {formState
                ? "Sign in to continue to Mern Connect"
                : "Join Mern Connect and stay connected"}
            </p>
          </div>

          {/* Auth Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">

            {/* Login / Signup Toggle */}
            <div className="mb-7 flex rounded-xl border border-slate-800 bg-slate-950 p-1">
              <button
                type="button"
                onClick={() => setFormState(0)}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  !formState
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Sign Up
              </button>

              <button
                type="button"
                onClick={() => setFormState(1)}
                className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  formState
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                Login
              </button>
            </div>

            <form className="flex flex-col gap-5">

              {/* Full Name */}
              {!formState && (
                <div>
                  <label
                    htmlFor="fullname"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              )}

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                onClick={!formState ? signup : login}
                className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-[0.98]"
              >
                {formState ? "Login" : "Create Account"}
              </button>
            </form>
          </div>

          {/* Footer text */}
          <p className="mt-6 text-center text-xs text-slate-600">
            Securely connect with the people who matter.
          </p>
        </div>
      </main>
    </div>
  );
}