import { useEffect, useState } from "react";
import { axios } from "../axiosConfig";
import HomeNav from "../components/HomeNav";

export default function History() {
  const [history, setHistory] = useState([]);

  async function fetchUserHistory() {
    const response = await axios.get("/fetchUserHistory");
    console.log(response.data);
    setHistory(response.data.history.reverse());
  }

  function convertDate(item) {
    const timestamp = Number(item);
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return day + "/" + month + "/" + year;
  }

  useEffect(() => {
    fetchUserHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <HomeNav />

      <main className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-8 lg:px-12">

        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-indigo-400">
            Activity
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meeting History
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View the meetings you've joined or created.
          </p>
        </div>

        {/* History */}
        {history.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">

            {/* Table Header */}
            <div className="hidden grid-cols-[1fr_180px] border-b border-slate-800 bg-slate-900 px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 sm:grid">
              <span>Meeting Code</span>
              <span>Date</span>
            </div>

            {/* History Items */}
            <div className="divide-y divide-slate-800">
              {history.map((item, key) => (
                <div
                  key={key}
                  className="grid gap-3 px-6 py-5 transition-colors hover:bg-slate-800/40 sm:grid-cols-[1fr_180px] sm:items-center"
                >
                  {/* Meeting Code */}
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-600 sm:hidden">
                      Meeting Code
                    </p>

                    <p className="font-mono text-sm font-medium text-slate-200">
                      {item.meetingCode}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-600 sm:hidden">
                      Date
                    </p>

                    <p className="text-sm text-slate-400">
                      {convertDate(item.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 px-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-xl">
              🕘
            </div>

            <h2 className="text-base font-semibold text-slate-300">
              No meeting history
            </h2>

            <p className="mt-2 max-w-sm text-sm text-slate-600">
              Your joined and created meetings will appear here.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}