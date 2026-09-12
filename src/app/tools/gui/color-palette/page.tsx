"use client";

import { useState, useCallback } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

const HARMONY_MODES = [
  "Complementary",
  "Analogous",
  "Triadic",
  "Split-Complementary",
  "Monochromatic",
] as const;

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function generatePalette(
  baseHue: number,
  saturation: number,
  lightness: number,
  mode: (typeof HARMONY_MODES)[number]
): { hue: number; name: string }[] {
  switch (mode) {
    case "Complementary":
      return [
        { hue: baseHue, name: "Base" },
        { hue: (baseHue + 180) % 360, name: "Complement" },
      ];
    case "Analogous":
      return [
        { hue: (baseHue - 30 + 360) % 360, name: "Warm" },
        { hue: baseHue, name: "Base" },
        { hue: (baseHue + 30) % 360, name: "Cool" },
      ];
    case "Triadic":
      return [
        { hue: baseHue, name: "Primary" },
        { hue: (baseHue + 120) % 360, name: "Secondary" },
        { hue: (baseHue + 240) % 360, name: "Tertiary" },
      ];
    case "Split-Complementary":
      return [
        { hue: baseHue, name: "Base" },
        { hue: (baseHue + 150) % 360, name: "Split 1" },
        { hue: (baseHue + 210) % 360, name: "Split 2" },
      ];
    case "Monochromatic":
      return [
        { hue: baseHue, name: "Darkest" },
        { hue: baseHue, name: "Dark" },
        { hue: baseHue, name: "Base" },
        { hue: baseHue, name: "Light" },
        { hue: baseHue, name: "Lightest" },
      ];
    default:
      return [{ hue: baseHue, name: "Base" }];
  }
}

export default function ColorPalettePage() {
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(70);
  const [lightness, setLightness] = useState(55);
  const [mode, setMode] = useState<(typeof HARMONY_MODES)[number]>("Analogous");

  const palette = generatePalette(hue, saturation, lightness, mode);

  const colors = palette.map((entry, i) => {
    let l = lightness;
    if (mode === "Monochromatic") {
      l = 20 + i * 15;
    }
    const [r, g, b] = hslToRgb(entry.hue, saturation, l);
    return {
      ...entry,
      r,
      g,
      b,
      hex: rgbToHex(r, g, b),
      color3: `Color3.fromRGB(${r}, ${g}, ${b})`,
    };
  });

  const luauCode = `-- Color Palette: ${mode}
local palette = {
${colors.map((c) => `\t["${c.name}"] = ${c.color3},`).join("\n")}
}

return palette`;

  return (
    <ToolLayout
      title="Color Palette Generator"
      description="Generate harmonious Roblox color palettes with Color3 code output"
      section="gui"
      category="Color Tools"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Controls */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Configuration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Base Hue</span>
                  <span className="tabular-nums">{hue}°</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={hue}
                  onChange={(e) => setHue(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Saturation</span>
                  <span className="tabular-nums">{saturation}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={saturation}
                  onChange={(e) => setSaturation(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Lightness</span>
                  <span className="tabular-nums">{lightness}%</span>
                </label>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={lightness}
                  onChange={(e) => setLightness(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-zinc-400">
                  Harmony Mode
                </label>
                <div className="flex flex-wrap gap-2">
                  {HARMONY_MODES.map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                        mode === m
                          ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20"
                          : "bg-white/[0.04] text-zinc-500 hover:bg-white/[0.08] hover:text-zinc-300"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Palette</h3>
            <div className="grid gap-3">
              {colors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3"
                >
                  <div
                    className="h-10 w-10 shrink-0 rounded-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-white">{c.name}</p>
                    <p className="font-mono text-[11px] text-zinc-500">
                      {c.hex} · RGB({c.r}, {c.g}, {c.b})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Preview
            </h3>
            <div className="flex gap-2 rounded-xl bg-white/[0.03] p-4">
              {colors.map((c) => (
                <div
                  key={c.name}
                  className="h-20 flex-1 rounded-lg first:rounded-l-xl last:rounded-r-xl transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <CodeOutput code={luauCode} />
        </div>
      </div>
    </ToolLayout>
  );
}
