"use client";

import Link from "next/link";

export default function ToolLayout({
  title,
  description,
  section,
  category,
  children,
}: {
  title: string;
  description: string;
  section: "gui" | "scripts";
  category: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="border-b border-white/[0.06] bg-white/[0.01]">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
          <Link
            href="/dashboard"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-sm text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            ←
          </Link>
          <div className="h-4 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-2 text-xs text-zinc-600">
            <Link href="/dashboard" className="hover:text-zinc-400">
              Tools
            </Link>
            <span>/</span>
            <Link
              href={`/dashboard?section=${section}`}
              className="hover:text-zinc-400"
            >
              {section === "gui" ? "GUI" : "Scripts"}
            </Link>
            <span>/</span>
            <span className="text-zinc-400">{category}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
}

export function CodeOutput({ code, language = "lua" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative rounded-xl border border-white/[0.06] bg-[#0a0a0b]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
          {language}
        </span>
        <button
          onClick={copy}
          className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}

import { useState } from "react";
