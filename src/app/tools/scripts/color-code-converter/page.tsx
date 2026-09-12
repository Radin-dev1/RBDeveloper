"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

function hexToRgb(hex: string): [number, number, number] | null {
  const match = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0")).join("")}`;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

const BRICK_COLORS: { name: string; r: number; g: number; b: number }[] = [
  { name: "White", r: 242, g: 243, b: 243 },
  { name: "Bright red", r: 196, g: 40, b: 28 },
  { name: "Bright blue", r: 13, g: 105, b: 172 },
  { name: "Bright green", r: 75, g: 151, b: 75 },
  { name: "Bright yellow", r: 245, g: 205, b: 48 },
  { name: "Black", r: 27, g: 42, b: 53 },
  { name: "Really red", r: 255, g: 0, b: 0 },
  { name: "Really blue", r: 0, g: 0, b: 255 },
  { name: "Lime green", r: 0, g: 255, b: 0 },
  { name: "Medium stone grey", r: 163, g: 162, b: 165 },
  { name: "Dark stone grey", r: 99, g: 95, b: 98 },
  { name: "Nougat", r: 204, g: 142, b: 105 },
  { name: "Toothpaste", r: 0, g: 255, b: 255 },
  { name: "Hot pink", r: 255, g: 0, b: 191 },
  { name: "Institutional white", r: 248, g: 248, b: 248 },
  { name: "Really black", r: 17, g: 17, b: 17 },
];

function findClosestBrickColor(r: number, g: number, b: number): string {
  let closest = BRICK_COLORS[0].name;
  let minDist = Infinity;
  for (const bc of BRICK_COLORS) {
    const dist = Math.sqrt((r - bc.r) ** 2 + (g - bc.g) ** 2 + (b - bc.b) ** 2);
    if (dist < minDist) {
      minDist = dist;
      closest = bc.name;
    }
  }
  return closest;
}

export default function ColorCodeConverterPage() {
  const [r, setR] = useState(59);
  const [g, setG] = useState(130);
  const [b, setB] = useState(246);

  const hex = rgbToHex(r, g, b);
  const [h, s, l] = rgbToHsl(r, g, b);
  const brickColor = findClosestBrickColor(r, g, b);
  const color3Norm = `Color3.new(${(r / 255).toFixed(3)}, ${(g / 255).toFixed(3)}, ${(b / 255).toFixed(3)})`;

  function handleHexChange(val: string) {
    const rgb = hexToRgb(val);
    if (rgb) {
      setR(rgb[0]);
      setG(rgb[1]);
      setB(rgb[2]);
    }
  }

  const code = `-- All Color Formats
-- Hex: ${hex}
-- RGB: ${r}, ${g}, ${b}
-- HSL: ${h}°, ${s}%, ${l}%

-- Roblox Color3 (fromRGB)
local color = Color3.fromRGB(${r}, ${g}, ${b})

-- Roblox Color3 (normalized 0-1)
local color = ${color3Norm}

-- Roblox Color3 (fromHex)
local color = Color3.fromHex("${hex}")

-- Roblox Color3 (fromHSV)
local color = Color3.fromHSV(${(h / 360).toFixed(3)}, ${(s / 100).toFixed(3)}, ${(l / 100).toFixed(3)})

-- Closest BrickColor
local brick = BrickColor.new("${brickColor}")`;

  return (
    <ToolLayout
      title="Color Code Converter"
      description="Convert between Hex, RGB, HSL, Color3, and BrickColor formats"
      section="scripts"
      category="Utilities & Tools"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Color Preview */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Color</h3>
            <div className="flex items-center gap-4">
              <div
                className="h-24 w-24 shrink-0 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.15)]"
                style={{ backgroundColor: hex }}
              />
              <div className="flex-1 space-y-2">
                <div>
                  <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">Hex</label>
                  <input
                    type="text"
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 font-mono text-sm text-white outline-none focus:border-blue-500/30"
                  />
                </div>
                <input
                  type="color"
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="h-8 w-full cursor-pointer rounded-lg border-0"
                />
              </div>
            </div>
          </div>

          {/* RGB Sliders */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">RGB</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 flex justify-between text-xs text-zinc-400">
                  <span className="text-red-400">Red</span>
                  <span className="tabular-nums">{r}</span>
                </label>
                <input type="range" min={0} max={255} value={r} onChange={(e) => setR(Number(e.target.value))} className="w-full accent-red-500" />
              </div>
              <div>
                <label className="mb-1.5 flex justify-between text-xs text-zinc-400">
                  <span className="text-green-400">Green</span>
                  <span className="tabular-nums">{g}</span>
                </label>
                <input type="range" min={0} max={255} value={g} onChange={(e) => setG(Number(e.target.value))} className="w-full accent-green-500" />
              </div>
              <div>
                <label className="mb-1.5 flex justify-between text-xs text-zinc-400">
                  <span className="text-blue-400">Blue</span>
                  <span className="tabular-nums">{b}</span>
                </label>
                <input type="range" min={0} max={255} value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-blue-500" />
              </div>
            </div>
          </div>

          {/* All Formats */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">All Formats</h3>
            <div className="space-y-2">
              {[
                { label: "Hex", value: hex },
                { label: "RGB", value: `${r}, ${g}, ${b}` },
                { label: "HSL", value: `${h}°, ${s}%, ${l}%` },
                { label: "Color3.fromRGB", value: `Color3.fromRGB(${r}, ${g}, ${b})` },
                { label: "Color3.new", value: color3Norm },
                { label: "Color3.fromHex", value: `Color3.fromHex("${hex}")` },
                { label: "BrickColor", value: `BrickColor.new("${brickColor}")` },
              ].map((fmt) => (
                <div key={fmt.label} className="flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2">
                  <span className="w-28 shrink-0 text-[11px] font-medium text-zinc-500">{fmt.label}</span>
                  <span className="flex-1 truncate font-mono text-[11px] text-zinc-300">{fmt.value}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(fmt.value)}
                    className="shrink-0 text-[10px] text-zinc-600 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <CodeOutput code={code} />
        </div>
      </div>
    </ToolLayout>
  );
}
