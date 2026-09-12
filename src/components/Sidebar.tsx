"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GUI_CATEGORIES, SCRIPTS_CATEGORIES, getToolCount } from "@/lib/tools-registry";
import type { ToolSection } from "@/lib/tools-registry";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") as ToolSection | null;
  const activeCategory = searchParams.get("category");

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-white/[0.06] bg-white/[0.01]">
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-[11px] font-bold text-white">
            RB
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">
            RBDeveloper
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <Link
          href="/dashboard"
          className={`mb-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-300 ${
            !activeSection && !activeCategory
              ? "bg-white/[0.08] text-white"
              : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
          }`}
        >
          <span className="text-base">🏠</span>
          All Tools
          <span className="ml-auto rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] tabular-nums text-zinc-500">
            {getToolCount()}
          </span>
        </Link>

        <div className="mb-1 mt-5 flex items-center gap-2 px-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            GUI Design
          </span>
          <span className="rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-medium text-blue-400">
            {getToolCount("gui")}
          </span>
        </div>

        {GUI_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/dashboard?category=${cat.slug}`}
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition-all duration-300 ${
              activeCategory === cat.slug
                ? "bg-white/[0.08] font-medium text-white"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            }`}
          >
            <span className="text-sm">{cat.icon}</span>
            <span className="truncate">{cat.name}</span>
            <span className="ml-auto text-[10px] tabular-nums text-zinc-700">
              {cat.tools.length}
            </span>
          </Link>
        ))}

        <div className="mb-1 mt-5 flex items-center gap-2 px-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Scripts
          </span>
          <span className="rounded-full bg-purple-500/10 px-1.5 py-0.5 text-[9px] font-medium text-purple-400">
            {getToolCount("scripts")}
          </span>
        </div>

        {SCRIPTS_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/dashboard?category=${cat.slug}`}
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition-all duration-300 ${
              activeCategory === cat.slug
                ? "bg-white/[0.08] font-medium text-white"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            }`}
          >
            <span className="text-sm">{cat.icon}</span>
            <span className="truncate">{cat.name}</span>
            <span className="ml-auto text-[10px] tabular-nums text-zinc-700">
              {cat.tools.length}
            </span>
          </Link>
        ))}
      </div>

      <div className="border-t border-white/[0.06] p-3">
        <Link
          href="/pricing"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500/[0.1] to-purple-500/[0.1] px-3 py-2.5 text-[13px] font-medium text-zinc-300 transition-all duration-300 hover:from-blue-500/[0.15] hover:to-purple-500/[0.15] hover:text-white"
        >
          <span>✨</span>
          Upgrade to Pro
        </Link>
      </div>
    </aside>
  );
}
