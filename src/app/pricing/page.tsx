"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getToolCount, getLiveTools } from "@/lib/tools-registry";

export default function PricingPage() {
  const totalTools = getToolCount();
  const freeTools = getLiveTools().filter((t) => !t.premium).length;
  const premiumTools = getLiveTools().filter((t) => t.premium).length;

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center px-4 pt-32 pb-20">
        <div className="mb-4 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Simple Pricing
          </span>
        </div>

        <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Start Free, Go <span className="accent-text">Pro</span>
        </h1>
        <p className="mt-4 max-w-md text-center text-lg text-zinc-400">
          Access {totalTools}+ tools. Upgrade when you need more.
        </p>

        <div className="mt-12 grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          {/* Free Tier */}
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-1.5">
            <div className="flex flex-col rounded-[calc(2rem-0.375rem)] bg-white/[0.02] p-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">Free</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Everything you need to get started
                </p>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-sm text-zinc-600">/forever</span>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  "Core GUI & Script tools",
                  "Code generation & export",
                  "All utility tools",
                  "Color tools & converters",
                  "API references",
                  "Basic templates",
                  "Community access",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] text-emerald-400">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard"
                className="mt-auto flex items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] py-3 text-sm font-medium text-zinc-300 transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Pro Tier */}
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-white/[0.02] p-1.5 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
            <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-300 ring-1 ring-blue-500/20">
              Popular
            </div>
            <div className="flex flex-col rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-blue-500/[0.04] to-transparent p-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">Pro</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  Full access to every tool
                </p>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$5</span>
                <span className="text-sm text-zinc-600">/month</span>
              </div>

              <ul className="mb-8 space-y-3">
                {[
                  `All ${totalTools}+ tools unlocked`,
                  "Advanced code generators",
                  "Premium templates & kits",
                  "Visual effects designers",
                  "Save & export projects",
                  "Priority new tools",
                  "Early access features",
                  "No ads",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/15 text-[10px] text-blue-400">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="group mt-auto flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-black transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-[0.97]">
                Upgrade to Pro
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/[0.08] text-[10px] transition-all duration-500 group-hover:translate-x-0.5 group-hover:scale-105">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-zinc-600">
          Cancel anytime. No hidden fees.
        </p>
      </main>
    </>
  );
}
