"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

const PATTERN_REFERENCE = [
  { pattern: "%a", desc: "Any letter (A-Z, a-z)" },
  { pattern: "%d", desc: "Any digit (0-9)" },
  { pattern: "%w", desc: "Any alphanumeric character" },
  { pattern: "%s", desc: "Any whitespace character" },
  { pattern: "%p", desc: "Any punctuation character" },
  { pattern: "%l", desc: "Any lowercase letter" },
  { pattern: "%u", desc: "Any uppercase letter" },
  { pattern: ".", desc: "Any character" },
  { pattern: "+", desc: "1 or more (greedy)" },
  { pattern: "-", desc: "0 or more (lazy)" },
  { pattern: "*", desc: "0 or more (greedy)" },
  { pattern: "?", desc: "0 or 1 occurrence" },
  { pattern: "^", desc: "Start of string" },
  { pattern: "$", desc: "End of string" },
  { pattern: "()", desc: "Capture group" },
];

const EXAMPLES = [
  { name: "Extract numbers", pattern: "%d+", text: "Score: 42, Lives: 3" },
  { name: "Extract words", pattern: "%a+", text: "Hello World 123" },
  { name: "Username validation", pattern: "^%a%w+$", text: "Player123" },
  { name: "Color code", pattern: "#(%x%x%x%x%x%x)", text: "Color: #FF5500" },
  { name: "Key:Value pairs", pattern: "(%w+)%s*=%s*(%w+)", text: "name = John, age = 25" },
];

function simulateLuaMatch(text: string, pattern: string): { matches: string[]; indices: [number, number][] } {
  const matches: string[] = [];
  const indices: [number, number][] = [];

  try {
    const jsPattern = luaPatternToRegex(pattern);
    if (!jsPattern) return { matches: [], indices: [] };

    const regex = new RegExp(jsPattern, "g");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      if (match[1]) {
        matches.push(match[1]);
      } else {
        matches.push(match[0]);
      }
      indices.push([match.index, match.index + match[0].length]);
      if (match[0].length === 0) regex.lastIndex++;
    }
  } catch {
    // silently fail for invalid patterns
  }

  return { matches, indices };
}

function luaPatternToRegex(pattern: string): string | null {
  try {
    let result = "";
    let i = 0;
    while (i < pattern.length) {
      const c = pattern[i];
      if (c === "%") {
        i++;
        const next = pattern[i];
        const classMap: Record<string, string> = {
          a: "[a-zA-Z]",
          A: "[^a-zA-Z]",
          d: "\\d",
          D: "\\D",
          w: "\\w",
          W: "\\W",
          s: "\\s",
          S: "\\S",
          p: "[^\\w\\s]",
          P: "[\\w\\s]",
          l: "[a-z]",
          L: "[^a-z]",
          u: "[A-Z]",
          U: "[^A-Z]",
          x: "[0-9a-fA-F]",
        };
        if (classMap[next]) {
          result += classMap[next];
        } else {
          result += "\\" + next;
        }
      } else if (c === "-") {
        result += "*?";
      } else {
        result += c === "." ? "." : c.replace(/[.*+?^${}()|[\]\\]/g, (m) => (m === "." ? m : "\\" + m));
      }
      i++;
    }
    new RegExp(result);
    return result;
  } catch {
    return null;
  }
}

export default function StringPatternPage() {
  const [pattern, setPattern] = useState("%d+");
  const [text, setText] = useState("Score: 42, Lives: 3, Level: 7");

  const { matches, indices } = simulateLuaMatch(text, pattern);

  const luauCode = `-- String Pattern: ${pattern}
local text = "${text}"

-- string.match (first match)
local result = string.match(text, "${pattern}")
print(result) --> ${matches[0] ?? "nil"}

-- string.gmatch (all matches)
for match in string.gmatch(text, "${pattern}") do
\tprint(match)
end
-- Output:
${matches.map((m) => `-- ${m}`).join("\n")}

-- string.find (position)
local start, finish = string.find(text, "${pattern}")
print(start, finish) --> ${indices[0] ? `${indices[0][0] + 1}, ${indices[0][1]}` : "nil"}

-- string.gsub (replace)
local replaced = string.gsub(text, "${pattern}", "X")
print(replaced)`;

  return (
    <ToolLayout
      title="String Pattern Tester"
      description="Test Lua string patterns live with match highlighting"
      section="scripts"
      category="Utilities & Tools"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Pattern Input */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Pattern</h3>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full rounded-xl border border-white/[0.06] bg-[#0a0a0b] px-4 py-3 font-mono text-sm text-white outline-none transition-all focus:border-blue-500/20"
              placeholder="Enter Lua pattern..."
              spellCheck={false}
            />

            <h3 className="mb-3 mt-5 text-sm font-semibold text-white">
              Test String
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-24 w-full rounded-xl border border-white/[0.06] bg-[#0a0a0b] p-4 font-mono text-sm text-zinc-300 outline-none transition-all focus:border-blue-500/20"
              spellCheck={false}
            />
          </div>

          {/* Results */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Matches ({matches.length})
            </h3>
            {matches.length > 0 ? (
              <div className="space-y-2">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-emerald-500/[0.06] px-3 py-2"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/20 text-[10px] font-bold text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="font-mono text-sm text-emerald-300">
                      {m}
                    </span>
                    {indices[i] && (
                      <span className="ml-auto text-[10px] tabular-nums text-zinc-600">
                        pos {indices[i][0] + 1}–{indices[i][1]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-500">No matches found</p>
            )}
          </div>

          {/* Quick Examples */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Examples</h3>
            <div className="space-y-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => {
                    setPattern(ex.pattern);
                    setText(ex.text);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2 text-left transition-colors hover:bg-white/[0.06]"
                >
                  <span className="text-xs font-medium text-zinc-300">
                    {ex.name}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-zinc-600">
                    {ex.pattern}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Reference */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Pattern Reference
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {PATTERN_REFERENCE.map((ref) => (
                <div
                  key={ref.pattern}
                  className="flex items-center gap-2 rounded-lg bg-white/[0.02] px-2 py-1.5"
                >
                  <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-blue-400">
                    {ref.pattern}
                  </code>
                  <span className="text-[10px] text-zinc-500">{ref.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <CodeOutput code={luauCode} />
        </div>
      </div>
    </ToolLayout>
  );
}
