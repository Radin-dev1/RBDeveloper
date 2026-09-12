"use client";

import { useState } from "react";
import Link from "next/link";
import { getToolCount } from "@/lib/tools-registry";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalTools = getToolCount();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-5">
        <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-black/60 px-2 py-1.5 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-full px-4 py-2 transition-colors duration-300 hover:bg-white/[0.06]"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-[11px] font-bold text-white">
              RB
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              RBDeveloper
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 md:flex">
            <NavLink href="/dashboard">Tools</NavLink>
            <NavLink href="/dashboard?section=gui">
              GUI
              <span className="ml-1.5 rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[10px] tabular-nums text-zinc-400">
                {getToolCount("gui")}
              </span>
            </NavLink>
            <NavLink href="/dashboard?section=scripts">
              Scripts
              <span className="ml-1.5 rounded-full bg-white/[0.08] px-1.5 py-0.5 text-[10px] tabular-nums text-zinc-400">
                {getToolCount("scripts")}
              </span>
            </NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-2 ml-2">
            <Link
              href="/dashboard"
              className="group relative flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/90 active:scale-[0.97]"
            >
              <span>Open App</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/[0.08] text-[11px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                →
              </span>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 hover:bg-white/[0.06] md:hidden"
            aria-label="Toggle menu"
          >
            <div className="relative flex h-4 w-5 flex-col items-center justify-center">
              <span
                className={`absolute h-px w-4 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  menuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  menuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  menuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-6 bg-black/90 backdrop-blur-3xl md:hidden">
          <MobileLink href="/dashboard" onClick={() => setMenuOpen(false)} delay={0}>
            Tools — {totalTools}+
          </MobileLink>
          <MobileLink href="/dashboard?section=gui" onClick={() => setMenuOpen(false)} delay={1}>
            GUI Section
          </MobileLink>
          <MobileLink href="/dashboard?section=scripts" onClick={() => setMenuOpen(false)} delay={2}>
            Scripts Section
          </MobileLink>
          <MobileLink href="/pricing" onClick={() => setMenuOpen(false)} delay={3}>
            Pricing
          </MobileLink>
          <div className="animate-fade-up-delay-5 mt-4">
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-medium text-black transition-all duration-500 active:scale-[0.97]"
            >
              Open App
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/[0.08] text-xs transition-transform duration-500 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-full px-3.5 py-2 text-[13px] font-medium text-zinc-400 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
  delay,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
  delay: number;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`animate-fade-up-delay-${delay + 1} text-2xl font-semibold text-white transition-colors duration-300 hover:text-blue-400`}
    >
      {children}
    </Link>
  );
}
