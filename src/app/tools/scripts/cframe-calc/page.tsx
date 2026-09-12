"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

export default function CFrameCalcPage() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(5);
  const [z, setZ] = useState(0);
  const [rx, setRx] = useState(0);
  const [ry, setRy] = useState(0);
  const [rz, setRz] = useState(0);
  const [operation, setOperation] = useState<"new" | "angles" | "lookat">("new");

  const [lookX, setLookX] = useState(0);
  const [lookY, setLookY] = useState(0);
  const [lookZ, setLookZ] = useState(10);

  const code =
    operation === "new"
      ? `CFrame.new(${x}, ${y}, ${z})`
      : operation === "angles"
        ? `CFrame.new(${x}, ${y}, ${z}) * CFrame.Angles(
\tmath.rad(${rx}), -- X rotation
\tmath.rad(${ry}), -- Y rotation
\tmath.rad(${rz})  -- Z rotation
)`
        : `CFrame.lookAt(
\tVector3.new(${x}, ${y}, ${z}), -- Position
\tVector3.new(${lookX}, ${lookY}, ${lookZ})  -- Look target
)`;

  const fullCode = `-- CFrame Configuration
local cf = ${code}

-- Apply to a Part
local part = workspace:FindFirstChild("Part")
if part then
\tpart.CFrame = cf
end

-- Common Operations:
-- Move forward:  cf * CFrame.new(0, 0, -5)
-- Move up:       cf * CFrame.new(0, 5, 0)
-- Rotate Y 90°:  cf * CFrame.Angles(0, math.rad(90), 0)
-- Get position:  cf.Position (Vector3)
-- Get lookVector: cf.LookVector`;

  return (
    <ToolLayout
      title="CFrame Calculator"
      description="Calculate and visualize CFrame values with Luau code output"
      section="scripts"
      category="Utilities & Tools"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Operation Mode */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              CFrame Type
            </h3>
            <div className="flex gap-2">
              {[
                { key: "new", label: "CFrame.new" },
                { key: "angles", label: "CFrame.Angles" },
                { key: "lookat", label: "CFrame.lookAt" },
              ].map((op) => (
                <button
                  key={op.key}
                  onClick={() => setOperation(op.key as typeof operation)}
                  className={`rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300 ${
                    operation === op.key
                      ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20"
                      : "bg-white/[0.04] text-zinc-500 hover:bg-white/[0.08] hover:text-zinc-300"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* Position */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Position</h3>
            <div className="grid grid-cols-3 gap-4">
              <NumberInput label="X" value={x} onChange={setX} color="red" />
              <NumberInput label="Y" value={y} onChange={setY} color="green" />
              <NumberInput label="Z" value={z} onChange={setZ} color="blue" />
            </div>
          </div>

          {/* Rotation */}
          {operation === "angles" && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="mb-4 text-sm font-semibold text-white">
                Rotation (degrees)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 flex justify-between text-xs text-zinc-400">
                    <span>X</span>
                    <span className="tabular-nums">{rx}°</span>
                  </label>
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    value={rx}
                    onChange={(e) => setRx(Number(e.target.value))}
                    className="w-full accent-red-500"
                  />
                </div>
                <div>
                  <label className="mb-2 flex justify-between text-xs text-zinc-400">
                    <span>Y</span>
                    <span className="tabular-nums">{ry}°</span>
                  </label>
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    value={ry}
                    onChange={(e) => setRy(Number(e.target.value))}
                    className="w-full accent-green-500"
                  />
                </div>
                <div>
                  <label className="mb-2 flex justify-between text-xs text-zinc-400">
                    <span>Z</span>
                    <span className="tabular-nums">{rz}°</span>
                  </label>
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    value={rz}
                    onChange={(e) => setRz(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* LookAt Target */}
          {operation === "lookat" && (
            <div className="glass-card rounded-2xl p-6">
              <h3 className="mb-4 text-sm font-semibold text-white">
                Look Target
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <NumberInput
                  label="X"
                  value={lookX}
                  onChange={setLookX}
                  color="red"
                />
                <NumberInput
                  label="Y"
                  value={lookY}
                  onChange={setLookY}
                  color="green"
                />
                <NumberInput
                  label="Z"
                  value={lookZ}
                  onChange={setLookZ}
                  color="blue"
                />
              </div>
            </div>
          )}

          {/* Quick Reference */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              Quick Reference
            </h3>
            <div className="space-y-2 text-xs text-zinc-500">
              <p>
                <span className="text-zinc-300">CFrame.new(x, y, z)</span> —
                Position only
              </p>
              <p>
                <span className="text-zinc-300">CFrame.Angles(rx, ry, rz)</span>{" "}
                — Rotation in radians
              </p>
              <p>
                <span className="text-zinc-300">CFrame.lookAt(pos, target)</span>{" "}
                — Face a direction
              </p>
              <p>
                <span className="text-zinc-300">math.rad(degrees)</span> —
                Convert degrees to radians
              </p>
              <p>
                <span className="text-zinc-300">cf.Position</span> — Get Vector3
                position
              </p>
              <p>
                <span className="text-zinc-300">cf.LookVector</span> — Forward
                direction
              </p>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <CodeOutput code={fullCode} />
        </div>
      </div>
    </ToolLayout>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  color,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  const colorClasses =
    color === "red"
      ? "focus:ring-red-500/30 focus:border-red-500/30"
      : color === "green"
        ? "focus:ring-green-500/30 focus:border-green-500/30"
        : "focus:ring-blue-500/30 focus:border-blue-500/30";

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-center font-mono text-sm text-white outline-none transition-all ${colorClasses}`}
      />
    </div>
  );
}
