"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

interface ColorStop {
  color: string;
  position: number;
}

export default function GradientBuilderPage() {
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#3b82f6", position: 0 },
    { color: "#8b5cf6", position: 0.5 },
    { color: "#06b6d4", position: 1 },
  ]);
  const [rotation, setRotation] = useState(0);
  const [transparency, setTransparency] = useState(0);

  function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  function updateStop(index: number, updates: Partial<ColorStop>) {
    setStops((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...updates } : s))
    );
  }

  function addStop() {
    if (stops.length >= 6) return;
    setStops([...stops, { color: "#ffffff", position: 0.75 }]);
  }

  function removeStop(index: number) {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  }

  const cssGradient = `linear-gradient(${rotation}deg, ${stops
    .map((s) => `${s.color} ${Math.round(s.position * 100)}%`)
    .join(", ")})`;

  const colorSequence = stops
    .map((s) => {
      const [r, g, b] = hexToRgb(s.color);
      return `\tColorSequenceKeypoint.new(${s.position}, Color3.fromRGB(${r}, ${g}, ${b}))`;
    })
    .join(",\n");

  const luauCode = `-- UIGradient Configuration
local gradient = Instance.new("UIGradient")
gradient.Rotation = ${rotation}
gradient.Transparency = NumberSequence.new(${transparency})
gradient.Color = ColorSequence.new({
${colorSequence}
})
gradient.Parent = YOUR_UI_ELEMENT -- Replace with your UI element`;

  return (
    <ToolLayout
      title="UIGradient Builder"
      description="Design color gradients visually and export as Roblox UIGradient code"
      section="gui"
      category="Styling & Effects"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Preview */}
          <div className="glass-card overflow-hidden rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Preview</h3>
            <div
              className="h-40 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
              style={{ background: cssGradient }}
            />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div
                className="h-12 rounded-xl"
                style={{ background: cssGradient }}
              />
              <div
                className="flex h-12 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ background: cssGradient }}
              >
                Button
              </div>
              <div
                className="h-12 rounded-full"
                style={{ background: cssGradient }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Rotation</span>
                  <span className="tabular-nums">{rotation}°</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Transparency</span>
                  <span className="tabular-nums">{transparency}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={transparency}
                  onChange={(e) => setTransparency(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Color Stops */}
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Color Stops</h3>
              <button
                onClick={addStop}
                disabled={stops.length >= 6}
                className="rounded-lg bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.1] hover:text-white disabled:opacity-40"
              >
                + Add
              </button>
            </div>

            <div className="space-y-3">
              {stops.map((stop, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3"
                >
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateStop(i, { color: e.target.value })}
                    className="h-8 w-8 cursor-pointer rounded-lg border-0 bg-transparent"
                  />
                  <div className="flex-1">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={stop.position}
                      onChange={(e) =>
                        updateStop(i, { position: Number(e.target.value) })
                      }
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-[11px] tabular-nums text-zinc-500">
                    {Math.round(stop.position * 100)}%
                  </span>
                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(i)}
                      className="text-xs text-zinc-600 hover:text-red-400"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <CodeOutput code={luauCode} />
        </div>
      </div>
    </ToolLayout>
  );
}
