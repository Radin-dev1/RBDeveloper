"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getToolCount, GUI_CATEGORIES, SCRIPTS_CATEGORIES } from "@/lib/tools-registry";

export default function Home() {
  const guiCount = getToolCount("gui");
  const scriptsCount = getToolCount("scripts");
  const totalCount = guiCount + scriptsCount;

  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        {/* Hero */}
        <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.07] blur-[120px]" />
            <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-purple-500/[0.05] blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.04] blur-[80px]" />
          </div>

          <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
            <div className="animate-fade-up mb-6 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                {totalCount}+ Developer Tools
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Build Roblox Games{" "}
              <span className="accent-text">10x Faster</span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              The all-in-one toolkit with {guiCount}+ GUI design tools and{" "}
              {scriptsCount}+ scripting tools. Like Figma meets VS Code — built
              for Roblox.
            </p>

            <div className="animate-fade-up-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="group relative flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.97]"
              >
                Start Building — Free
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/[0.08] text-xs transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                  →
                </span>
              </Link>
              <Link
                href="/pricing"
                className="flex items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-[15px] font-medium text-zinc-300 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white active:scale-[0.97]"
              >
                View Pricing
              </Link>
            </div>

            <div className="animate-fade-up-delay-4 mt-14 flex items-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Free to start
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-blue-500" />
                No credit card
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-purple-500" />
                {totalCount}+ tools
              </span>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative border-y border-white/[0.06] bg-white/[0.02]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 px-4 py-16 sm:flex-row sm:gap-16 md:gap-24">
            <StatItem value={`${guiCount}+`} label="GUI Tools" color="blue" />
            <div className="hidden h-8 w-px bg-white/[0.08] sm:block" />
            <StatItem value={`${scriptsCount}+`} label="Script Tools" color="purple" />
            <div className="hidden h-8 w-px bg-white/[0.08] sm:block" />
            <StatItem value="Free" label="Core Access" color="emerald" />
            <div className="hidden h-8 w-px bg-white/[0.08] sm:block" />
            <StatItem value="∞" label="No Limits" color="cyan" />
          </div>
        </section>

        {/* Two Sections Showcase */}
        <section className="mx-auto w-full max-w-6xl px-4 py-28 sm:py-36">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                Two Powerhouses
              </span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Everything You Need to Build
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Two specialized workspaces. One unstoppable toolkit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* GUI Card */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-blue-500/20 hover:shadow-[0_0_80px_rgba(59,130,246,0.08)]">
              <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-blue-500/[0.08] to-transparent p-8 sm:p-10">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/[0.1] blur-[60px] transition-all duration-700 group-hover:bg-blue-500/[0.15]" />

                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/[0.15] text-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    🎨
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    GUI Design
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Like Figma — but for Roblox
                  </p>
                  <div className="tool-count-badge mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium text-blue-300">
                    {guiCount}+ Tools
                  </div>

                  <div className="mt-6 space-y-2">
                    {GUI_CATEGORIES.slice(0, 5).map((cat) => (
                      <div
                        key={cat.slug}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2 text-sm"
                      >
                        <span>{cat.icon}</span>
                        <span className="text-zinc-300">{cat.name}</span>
                        <span className="ml-auto text-xs text-zinc-600">
                          {cat.tools.length}
                        </span>
                      </div>
                    ))}
                    <p className="pt-1 text-center text-xs text-zinc-600">
                      +{GUI_CATEGORIES.length - 5} more categories
                    </p>
                  </div>

                  <Link
                    href="/dashboard?section=gui"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                  >
                    Explore GUI Tools
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Scripts Card */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.06] bg-white/[0.02] p-1.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-purple-500/20 hover:shadow-[0_0_80px_rgba(139,92,246,0.08)]">
              <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-purple-500/[0.08] to-transparent p-8 sm:p-10">
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/[0.1] blur-[60px] transition-all duration-700 group-hover:bg-purple-500/[0.15]" />

                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/[0.15] text-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    💻
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Scripts
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Like VS Code — but better for Roblox
                  </p>
                  <div className="premium-badge mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium text-purple-300">
                    {scriptsCount}+ Tools
                  </div>

                  <div className="mt-6 space-y-2">
                    {SCRIPTS_CATEGORIES.slice(0, 5).map((cat) => (
                      <div
                        key={cat.slug}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2 text-sm"
                      >
                        <span>{cat.icon}</span>
                        <span className="text-zinc-300">{cat.name}</span>
                        <span className="ml-auto text-xs text-zinc-600">
                          {cat.tools.length}
                        </span>
                      </div>
                    ))}
                    <p className="pt-1 text-center text-xs text-zinc-600">
                      +{SCRIPTS_CATEGORIES.length - 5} more categories
                    </p>
                  </div>

                  <Link
                    href="/dashboard?section=scripts"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-purple-400 transition-colors hover:text-purple-300"
                  >
                    Explore Script Tools
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="border-t border-white/[0.06] bg-white/[0.01]">
          <div className="mx-auto w-full max-w-6xl px-4 py-28 sm:py-36">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Full Breakdown
                </span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {GUI_CATEGORIES.length + SCRIPTS_CATEGORIES.length} Categories,{" "}
                {totalCount}+ Tools
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_CATEGORIES_DISPLAY.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/dashboard?category=${cat.slug}`}
                  className="glass-card glass-card-hover group flex items-center gap-4 rounded-2xl px-5 py-4"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    style={{ background: `${cat.color}20` }}
                  >
                    {cat.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{cat.name}</p>
                    <p className="text-xs text-zinc-500">
                      {cat.section === "gui" ? "GUI" : "Scripts"} ·{" "}
                      {cat.tools.length} tools
                    </p>
                  </div>
                  <span className="text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-400">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.04] to-transparent" />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:py-36">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Build?
            </h2>
            <p className="mt-4 text-lg text-zinc-400">
              Join thousands of Roblox developers using RBDeveloper to ship
              games faster.
            </p>
            <Link
              href="/dashboard"
              className="group mt-8 flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.97]"
            >
              Open RBDeveloper
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/[0.08] text-xs transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                →
              </span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] bg-white/[0.01]">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600 text-[9px] font-bold text-white">
                RB
              </div>
              <span className="text-sm font-medium text-zinc-500">
                RBDeveloper
              </span>
            </div>
            <p className="text-xs text-zinc-600">
              Built for Roblox developers, by Roblox developers.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

function StatItem({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  const colorClass =
    color === "blue"
      ? "text-blue-400"
      : color === "purple"
        ? "text-purple-400"
        : color === "emerald"
          ? "text-emerald-400"
          : "text-cyan-400";

  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`text-3xl font-bold tabular-nums ${colorClass}`}>
        {value}
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

import { ALL_CATEGORIES } from "@/lib/tools-registry";
const ALL_CATEGORIES_DISPLAY = ALL_CATEGORIES;
