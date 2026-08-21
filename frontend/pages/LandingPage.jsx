import { Link } from "react-router-dom"
import LandingNav from "../components/LandingNav"

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-[-200px] left-[-150px] h-[400px] w-[400px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <LandingNav />

      <main className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* Hero Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            {/* Small badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Connect. Communicate. Anywhere.
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Connect with your{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                loved ones
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Cover the distance with Mern Connect. Enjoy seamless,
              reliable video communication with the people who matter most.
            </p>

            <div className="mt-8">
              <Link to="/auth">
              <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-[0.98]">
                Get Started
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <div className="flex -space-x-2">
                <div className="h-7 w-7 rounded-full border-2 border-slate-950 bg-indigo-500" />
                <div className="h-7 w-7 rounded-full border-2 border-slate-950 bg-violet-500" />
                <div className="h-7 w-7 rounded-full border-2 border-slate-950 bg-sky-500" />
              </div>
              <span>Stay connected from anywhere</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl sm:h-96 sm:w-96" />

            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl shadow-black/30 backdrop-blur-sm">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="landing_page_img.jpg"
                  alt="Mern Connect"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}