"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

const EASING_STYLES = [
  "Linear",
  "Sine",
  "Back",
  "Quad",
  "Quart",
  "Quint",
  "Bounce",
  "Elastic",
  "Exponential",
  "Circular",
] as const;

const EASING_DIRECTIONS = ["In", "Out", "InOut"] as const;

const PROPERTIES = [
  "Position",
  "Size",
  "Transparency",
  "BackgroundColor3",
  "BackgroundTransparency",
  "Rotation",
  "TextTransparency",
  "ImageTransparency",
  "AnchorPoint",
] as const;

export default function TweenBuilderPage() {
  const [easingStyle, setEasingStyle] = useState<string>("Sine");
  const [easingDir, setEasingDir] = useState<string>("Out");
  const [duration, setDuration] = useState(0.5);
  const [repeatCount, setRepeatCount] = useState(0);
  const [reverses, setReverses] = useState(false);
  const [delayTime, setDelayTime] = useState(0);
  const [selectedProps, setSelectedProps] = useState<string[]>(["Position"]);
  const [animating, setAnimating] = useState(false);

  function toggleProp(prop: string) {
    setSelectedProps((prev) =>
      prev.includes(prop) ? prev.filter((p) => p !== prop) : [...prev, prop]
    );
  }

  const goalProps = selectedProps
    .map((p) => {
      switch (p) {
        case "Position":
          return `\t${p} = UDim2.new(0.5, 0, 0.5, 0)`;
        case "Size":
          return `\t${p} = UDim2.new(0, 200, 0, 200)`;
        case "Transparency":
        case "BackgroundTransparency":
        case "TextTransparency":
        case "ImageTransparency":
          return `\t${p} = 0`;
        case "BackgroundColor3":
          return `\t${p} = Color3.fromRGB(255, 255, 255)`;
        case "Rotation":
          return `\t${p} = 360`;
        case "AnchorPoint":
          return `\t${p} = Vector2.new(0.5, 0.5)`;
        default:
          return `\t${p} = nil`;
      }
    })
    .join(",\n");

  const luauCode = `local TweenService = game:GetService("TweenService")

local tweenInfo = TweenInfo.new(
\t${duration}, -- Duration
\tEnum.EasingStyle.${easingStyle}, -- EasingStyle
\tEnum.EasingDirection.${easingDir}, -- EasingDirection
\t${repeatCount}, -- RepeatCount (${repeatCount === -1 ? "infinite" : repeatCount === 0 ? "no repeat" : `${repeatCount} times`})
\t${reverses}, -- Reverses
\t${delayTime} -- DelayTime
)

local goal = {
${goalProps}
}

local tween = TweenService:Create(YOUR_OBJECT, tweenInfo, goal)
tween:Play()`;

  function previewAnimation() {
    setAnimating(true);
    setTimeout(() => setAnimating(false), duration * 1000 + 100);
  }

  return (
    <ToolLayout
      title="Tween Builder"
      description="Visual TweenService configuration with code output"
      section="gui"
      category="Animation & Tweening"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Preview */}
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Preview</h3>
              <button
                onClick={previewAnimation}
                className="rounded-lg bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20 transition-all hover:bg-blue-500/20"
              >
                ▶ Play
              </button>
            </div>
            <div className="flex h-40 items-center justify-center rounded-xl bg-white/[0.03]">
              <div
                className="h-12 w-12 rounded-xl bg-blue-500"
                style={{
                  transition: animating
                    ? `all ${duration}s ${easingStyle.toLowerCase()}`
                    : "none",
                  transform: animating ? "translateX(80px) scale(1.3)" : "translateX(0) scale(1)",
                  opacity: animating ? 0.6 : 1,
                }}
              />
            </div>
          </div>

          {/* Easing Style */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Easing Style
            </h3>
            <div className="flex flex-wrap gap-2">
              {EASING_STYLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setEasingStyle(s)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    easingStyle === s
                      ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20"
                      : "bg-white/[0.04] text-zinc-500 hover:bg-white/[0.08] hover:text-zinc-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <h3 className="mb-3 mt-5 text-sm font-semibold text-white">
              Direction
            </h3>
            <div className="flex gap-2">
              {EASING_DIRECTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setEasingDir(d)}
                  className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                    easingDir === d
                      ? "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/20"
                      : "bg-white/[0.04] text-zinc-500 hover:bg-white/[0.08] hover:text-zinc-300"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Timing */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Timing</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Duration</span>
                  <span className="tabular-nums">{duration}s</span>
                </label>
                <input
                  type="range"
                  min={0.1}
                  max={5}
                  step={0.1}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Delay</span>
                  <span className="tabular-nums">{delayTime}s</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.1}
                  value={delayTime}
                  onChange={(e) => setDelayTime(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Repeat Count</span>
                  <span className="tabular-nums">
                    {repeatCount === -1 ? "∞" : repeatCount}
                  </span>
                </label>
                <input
                  type="range"
                  min={-1}
                  max={10}
                  value={repeatCount}
                  onChange={(e) => setRepeatCount(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={reverses}
                  onChange={(e) => setReverses(e.target.checked)}
                  className="accent-blue-500"
                />
                Reverses
              </label>
            </div>
          </div>

          {/* Properties */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Goal Properties
            </h3>
            <div className="flex flex-wrap gap-2">
              {PROPERTIES.map((p) => (
                <button
                  key={p}
                  onClick={() => toggleProp(p)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    selectedProps.includes(p)
                      ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/20"
                      : "bg-white/[0.04] text-zinc-500 hover:bg-white/[0.08] hover:text-zinc-300"
                  }`}
                >
                  {p}
                </button>
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
