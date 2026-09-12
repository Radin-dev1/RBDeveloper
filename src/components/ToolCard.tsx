"use client";

import Link from "next/link";
import type { Tool, ToolCategory } from "@/lib/tools-registry";

export default function ToolCard({
  tool,
  category,
}: {
  tool: Tool;
  category: ToolCategory;
}) {
  const isLive = tool.status === "live";
  const href = isLive
    ? `/tools/${category.section}/${tool.slug}`
    : "#";

  return (
    <Link
      href={href}
      className={`glass-card group relative flex flex-col rounded-2xl p-1.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isLive
          ? "glass-card-hover cursor-pointer"
          : "cursor-default opacity-60"
      }`}
      onClick={(e) => !isLive && e.preventDefault()}
    >
      <div
        className="relative flex flex-1 flex-col rounded-[calc(1rem-0.375rem)] p-5"
        style={{ background: `${category.color}08` }}
      >
        {tool.premium && (
          <div className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-purple-300 ring-1 ring-purple-500/20">
            Pro
          </div>
        )}

        {!isLive && (
          <div className="absolute right-3 top-3 rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-zinc-500">
            Soon
          </div>
        )}

        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]"
          style={{ background: `${category.color}15` }}
        >
          {tool.icon}
        </div>

        <h3 className="text-[13px] font-semibold text-white">{tool.name}</h3>
        <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
          {tool.description}
        </p>

        {isLive && (
          <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-zinc-600 transition-colors duration-300 group-hover:text-blue-400">
            Open tool
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
