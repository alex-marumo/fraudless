"use client";
import React, { useState } from "react";
import { ShieldAlert, ShieldCheck, Activity } from "lucide-react";

export default function FraudlessDashboard() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkFraud = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const data = {
      amount: parseFloat(formData.get("amount") as string),
      time_of_day: parseFloat(formData.get("time") as string),
      distance: parseFloat(formData.get("distance") as string),
    };

    try {
      const results = await fetch("http://127.0.0.1:8000/check-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setStatus(result);
    } catch (err) {
      console.error("Server offline:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12,">
      <header className="mb-12 flex items-center gap-3">
        <Activity className="text-emerald-500" />
        <h1 className="text-2xl font-bold tracking-tight">Fraudlesss</h1>
      </header>

      <main className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        {/*Input Form*/}
        <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-lg mb-4 fnt-semibold text-slate-400">
            Test Transactions
          </h2>
          <form onSubmit={checkFraud} className="space-y-4">
            <div>
              <label className="block text-xs uppercase mb-1">
                Amount (BWP)
              </label>
              <input
                name="amount"
                type="number"
                step="0.01"
                className="w-full bg-slate-800 border-none rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase mb-1">
                Time (0-24)
              </label>
              <input
                name="time"
                tyoe="number"
                step="0.1"
                className="w-full bg-slate-800 border-slate-800 rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase mb-1">
                Distance From Home (km)
              </label>
              <input
                name="distance"
                type="number"
                step="0.1"
                className="w-full bg-slate-800 border-none rounded p-2"
                required
              />
            </div>
            <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded font-bold transition">
              {loading ? "Analyzing ..." : "Check Safety"}
            </button>
          </form>
        </section>

        <section className="flex flex-col items-center justify-center bg-slate-900 rounded-xl border border-slate-800">
          {!status ? (
            <p className="text-slate-500">Run a check to see results</p>
          ) : (
            <div className="text-center p-8">
              {status.fraud_detected ? (
                <>
                  <ShieldAlert
                    size={64}
                    className="text-rose-500 mx-auto mb-4 animate-pulse"
                  />
                  <h3 className="text-2xl font-bold text-rose-500">
                    FRAUD DETECTED
                  </h3>
                </>
              ) : (
                <>
                  <ShieldCheck
                    size={64}
                    className="text-emerald-500 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-emerald-500">CLEAR</h3>
                </>
              )}
              <p className="mt-2 text-slate-400 ">Action: {status.action}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
