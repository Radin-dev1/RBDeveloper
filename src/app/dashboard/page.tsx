"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ToolCard from "@/components/ToolCard";
import {
  ALL_CATEGORIES,
  GUI_CATEGORIES,
  SCRIPTS_CATEGORIES,
  getToolCount,
  searchTools,
} from "@/lib/tools-registry";
import type { ToolCategory, ToolSection } from "@/lib/tools-registry";

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section") as ToolSection | null;
  const categoryParam = searchParams.get("category");
  const [query, setQuery] = useState("");
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  const categories = useMemo(() => {
    if (categoryParam) {
      return ALL_CATEGORIES.filter((c) => c.slug === categoryParam);
    }
    if (sectionParam === "gui") return GUI_CATEGORIES;
    if (sectionParam === "scripts") return SCRIPTS_CATEGORIES;
    return ALL_CATEGORIES;
  }, [sectionParam, categoryParam]);

  const filteredCategories = useMemo(() => {
    if (!query && !showPremiumOnly && !showLiveOnly) return categories;

    return categories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter((tool) => {
          if (showPremiumOnly && !tool.premium) return false;
          if (showLiveOnly && tool.status !== "live") return false;
          if (query) {
            const q = query.toLowerCase();
            return (
              tool.name.toLowerCase().includes(q) ||
              tool.description.toLowerCase().includes(q) ||
              cat.name.toLowerCase().includes(q)
            );
          }
          return true;
        }),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [categories, query, showPremiumOnly, showLiveOnly]);

  const totalFiltered = filteredCategories.reduce(
    (sum, c) => sum + c.tools.length,
    0
  );

  const title = categoryParam
    ? categories[0]?.name ?? "Tools"
    : sectionParam === "gui"
      ? "GUI Design Tools"
      : sectionParam === "scripts"
        ? "Script Tools"
        : "All Tools";

  const subtitle = categoryParam
    ? `${categories[0]?.section === "gui" ? "GUI" : "Scripts"} · ${categories[0]?.tools.length} tools`
    : sectionParam === "gui"
      ? `${getToolCount("gui")} tools for designing Roblox interfaces`
      : sectionParam === "scripts"
        ? `${getToolCount("scripts")} tools for Roblox scripting`
        : `${getToolCount()} tools across GUI design and scripting`;

  return (
    <div className="px-6 py-6 sm:px-8 sm:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-300 focus:border-blue-500/30 focus:bg-white/[0.05] focus:ring-1 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex gap-2">
          <FilterChip
            active={showLiveOnly}
            onClick={() => setShowLiveOnly(!showLiveOnly)}
          >
            Live Only
          </FilterChip>
          <FilterChip
            active={showPremiumOnly}
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
          >
            Pro Only
          </FilterChip>
        </div>
      </div>

      {query && (
        <p className="mb-6 text-sm text-zinc-500">
          {totalFiltered} result{totalFiltered !== 1 ? "s" : ""} for &quot;{query}&quot;
        </p>
      )}

      {/* Tool Grid by Category */}
      {filteredCategories.map((cat) => (
        <div key={cat.slug} className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
              style={{ background: `${cat.color}15` }}
            >
              {cat.icon}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{cat.name}</h2>
              <p className="text-[11px] text-zinc-600">
                {cat.section === "gui" ? "GUI" : "Scripts"} ·{" "}
                {cat.tools.length} tools
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cat.tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} category={cat} />
            ))}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && (
        <div className="flex flex-col items-center py-24 text-center">
          <span className="text-4xl">🔍</span>
          <p className="mt-4 text-sm text-zinc-400">No tools found</p>
          <p className="mt-1 text-xs text-zinc-600">
            Try a different search term or filter
          </p>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 ${
        active
          ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20"
          : "bg-white/[0.03] text-zinc-500 ring-1 ring-white/[0.06] hover:bg-white/[0.06] hover:text-zinc-300"
      }`}
    >
      {children}
    </button>
  );
}
