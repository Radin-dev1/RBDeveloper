"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

function jsonToLuau(value: unknown, indent: number = 0): string {
  const tabs = "\t".repeat(indent);
  const innerTabs = "\t".repeat(indent + 1);

  if (value === null || value === undefined) return "nil";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") return `"${value.replace(/"/g, '\\"')}"`;

  if (Array.isArray(value)) {
    if (value.length === 0) return "{}";
    const items = value.map((v) => `${innerTabs}${jsonToLuau(v, indent + 1)}`);
    return `{\n${items.join(",\n")}\n${tabs}}`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const items = entries.map(([k, v]) => {
      const key = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : `["${k}"]`;
      return `${innerTabs}${key} = ${jsonToLuau(v, indent + 1)}`;
    });
    return `{\n${items.join(",\n")}\n${tabs}}`;
  }

  return "nil";
}

const EXAMPLE_JSON = `{
  "name": "Sword",
  "damage": 25,
  "critical": true,
  "enchantments": ["fire", "speed"],
  "stats": {
    "durability": 100,
    "level": 5
  }
}`;

export default function JsonToLuauPage() {
  const [input, setInput] = useState(EXAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const [varName, setVarName] = useState("data");

  let output = "";
  try {
    const parsed = JSON.parse(input);
    output = `local ${varName} = ${jsonToLuau(parsed)}`;
    if (error) setError(null);
  } catch (e) {
    output = "-- Invalid JSON input";
    if (!error) setError((e as Error).message);
  }

  return (
    <ToolLayout
      title="JSON to Luau Converter"
      description="Convert JSON data to Luau table syntax instantly"
      section="scripts"
      category="Utilities & Tools"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">JSON Input</h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-500">var name:</span>
                <input
                  type="text"
                  value={varName}
                  onChange={(e) => setVarName(e.target.value || "data")}
                  className="w-20 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1 font-mono text-xs text-white outline-none focus:border-blue-500/30"
                />
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              className="h-80 w-full rounded-xl border border-white/[0.06] bg-[#0a0a0b] p-4 font-mono text-[13px] leading-relaxed text-zinc-300 outline-none transition-all focus:border-blue-500/20"
              spellCheck={false}
            />
            {error && (
              <p className="mt-2 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-3 text-sm font-semibold text-white">
              Quick Examples
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Weapon", json: EXAMPLE_JSON },
                {
                  label: "Config",
                  json: `{"maxPlayers": 12, "gameMode": "FFA", "roundTime": 300, "spawnProtection": true}`,
                },
                {
                  label: "Colors",
                  json: `[{"name": "Red", "rgb": [255, 0, 0]}, {"name": "Blue", "rgb": [0, 0, 255]}]`,
                },
              ].map((ex) => (
                <button
                  key={ex.label}
                  onClick={() => {
                    setInput(JSON.stringify(JSON.parse(ex.json), null, 2));
                    setError(null);
                  }}
                  className="rounded-lg bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-white/[0.08] hover:text-zinc-300"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <CodeOutput code={output} />
        </div>
      </div>
    </ToolLayout>
  );
}
