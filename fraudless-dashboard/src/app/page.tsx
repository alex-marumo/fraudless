"use client";
import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Info,
  AlertTriangle,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function FraudlessDashboard() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>(null);

  const checkFraud = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const amount = parseFloat(formData.get("amount") as string);
    const time = parseFloat(formData.get("time") as string);
    const distance = parseFloat(formData.get("distance") as string);

    setChartData([
      { subject: "Amount", A: Math.min(amount / 50, 100) },
      { subject: "Time", A: time < 6 || time > 22 ? 90 : 20 },
      { subject: "Distance", A: Math.min(distance * 4, 100) },
    ]);

    try {
      const res = await fetch("http://127.0.0.1:8000/check-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, time_of_day: time, distance }),
      });
      const result = await res.json();
      setStatus(result);
    } catch (err) {
      console.error("AI Node Offline:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskStyles = (level: string) => {
    switch (level) {
      case "RED":
        return {
          color: "text-rose-500",
          border: "border-rose-500/20",
          bg: "bg-rose-500/10",
          icon: <ShieldAlert size={140} className="animate-pulse" />,
          chart: "#f43f5e",
          heading: "Critical Threat",
        };
      case "YELLOW":
        return {
          color: "text-amber-500",
          border: "border-amber-500/20",
          bg: "bg-amber-500/10",
          icon: <AlertTriangle size={140} />,
          chart: "#f59e0b",
          heading: "Suspicious Activity",
        };
      default:
        return {
          color: "text-emerald-500",
          border: "border-emerald-500/20",
          bg: "bg-emerald-500/10",
          icon: <ShieldCheck size={140} />,
          chart: "#10b981",
          heading: "System Secure",
        };
    }
  };

  const styles = status ? getRiskStyles(status.risk_level) : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6 lg:p-12 font-sans">
      <div className="w-full max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="text-emerald-500 w-8 h-8" />
            <h1 className="text-3xl font-black tracking-tighter">FRAUDLESS</h1>
          </div>
          <div className="hidden md:block text-[10px] font-mono text-slate-500 text-right">
            STATUS: ACTIVE
            <br />
            TRANSACTION_ANALYSIS
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <section className="lg:col-span-4 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-800 shadow-2xl">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
              <Info size={14} /> Input Transactional Data
            </h2>
            <form onSubmit={checkFraud} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase italic">
                  Transaction Amount
                </label>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  className="w-full bg-slate-800/30 border border-slate-700 rounded-2xl p-4 text-2xl font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase italic">
                    Time (0-24)
                  </label>
                  <input
                    name="time"
                    type="number"
                    step="0.1"
                    className="w-full bg-slate-800/30 border border-slate-700 rounded-2xl p-4 font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase italic">
                    Distance (KM)
                  </label>
                  <input
                    name="distance"
                    type="number"
                    step="0.1"
                    className="w-full bg-slate-800/30 border border-slate-700 rounded-2xl p-4 font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>
              <button className="w-full bg-slate-600 hover:bg-emerald-500 text-black py-5 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95">
                {loading ? "Analysing Patterns..." : "Verify Transaction"}
              </button>
            </form>
          </section>

          {/* AI Decision & Chart Section */}
          <section className="lg:col-span-8 grid md:grid-cols-2 gap-8 bg-slate-900/20 rounded-[2rem] border border-slate-800 p-8 min-h-[500px]">
            {/* Improved Alert Window Layout */}
            <div className="flex flex-col items-center justify-center text-center border-r border-slate-800/50 pr-4 space-y-6">
              {!status ? (
                <div className="opacity-10 scale-90 grayscale flex flex-col items-center gap-4">
                  <ShieldCheck size={140} strokeWidth={0.5} />
                  <p className="font-mono text-xs uppercase tracking-[0.3em]">
                    Neural Link Standby
                  </p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
                  <div className={styles?.color}>{styles?.icon}</div>

                  <div className="space-y-2 mt-4">
                    <h3
                      className={`text-4xl font-black tracking-tighter uppercase italic ${styles?.color}`}
                    >
                      {styles?.heading}
                    </h3>
                    <div
                      className={`px-6 py-3 rounded-xl border ${styles?.border} ${styles?.bg} max-w-[280px]`}
                    >
                      <p
                        className={`text-[11px] font-bold uppercase tracking-tight leading-relaxed ${styles?.color}`}
                      >
                        {status.action}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Radar Chart Section */}
            <div className="flex flex-col items-center justify-center">
              {chartData ? (
                <div className="w-full h-full min-h-[300px] relative">
                  <p className="absolute top-0 left-0 text-[10px] font-mono text-slate-600 uppercase">
                    Decision Visualization
                  </p>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="75%"
                      data={chartData}
                    >
                      <PolarGrid stroke="#1e293b" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{
                          fill: "#475569",
                          fontSize: 10,
                          fontWeight: 800,
                        }}
                      />
                      <Radar
                        name="TX_SIG"
                        dataKey="A"
                        stroke={styles?.chart}
                        fill={styles?.chart}
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center opacity-20">
                  <div className="w-48 h-48 border border-slate-800 rounded-full flex items-center justify-center border-dashed animate-spin-slow">
                    <Activity size={40} className="text-slate-600" />
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
