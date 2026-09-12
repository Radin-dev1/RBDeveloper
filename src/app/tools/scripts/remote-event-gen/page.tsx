"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

type RemoteType = "RemoteEvent" | "RemoteFunction";
type Direction = "client-to-server" | "server-to-client" | "server-to-all";

interface RemoteConfig {
  name: string;
  type: RemoteType;
  direction: Direction;
  params: string[];
  validation: boolean;
  rateLimit: boolean;
}

export default function RemoteEventGenPage() {
  const [config, setConfig] = useState<RemoteConfig>({
    name: "DamagePlayer",
    type: "RemoteEvent",
    direction: "client-to-server",
    params: ["targetId", "damage"],
    validation: true,
    rateLimit: true,
  });

  const [newParam, setNewParam] = useState("");

  function addParam() {
    if (!newParam.trim()) return;
    setConfig({
      ...config,
      params: [...config.params, newParam.trim()],
    });
    setNewParam("");
  }

  function removeParam(index: number) {
    setConfig({
      ...config,
      params: config.params.filter((_, i) => i !== index),
    });
  }

  const paramList = config.params.join(", ");
  const isEvent = config.type === "RemoteEvent";

  const serverCode = (() => {
    if (config.direction === "client-to-server") {
      return `-- Server Script (ServerScriptService)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
${config.rateLimit ? 'local Players = game:GetService("Players")\n' : ""}
local ${config.name} = Instance.new("${config.type}")
${config.name}.Name = "${config.name}"
${config.name}.Parent = ReplicatedStorage
${config.rateLimit ? `\n-- Rate limiting\nlocal lastFired = {}\nlocal RATE_LIMIT = 0.1 -- seconds\n` : ""}${
        isEvent
          ? `\n${config.name}.OnServerEvent:Connect(function(player${paramList ? ", " + paramList : ""})${config.rateLimit ? `\n\t-- Rate limit check\n\tlocal now = tick()\n\tif lastFired[player.UserId] and now - lastFired[player.UserId] < RATE_LIMIT then\n\t\treturn\n\tend\n\tlastFired[player.UserId] = now\n` : ""}${config.validation ? `\n\t-- Validation\n${config.params.map((p) => `\tif ${p} == nil then return end`).join("\n")}\n` : ""}\n\t-- Your logic here\n\tprint(player.Name .. " fired ${config.name}")\nend)`
          : `\n${config.name}.OnServerInvoke = function(player${paramList ? ", " + paramList : ""})${config.rateLimit ? `\n\t-- Rate limit check\n\tlocal now = tick()\n\tif lastFired[player.UserId] and now - lastFired[player.UserId] < RATE_LIMIT then\n\t\treturn nil\n\tend\n\tlastFired[player.UserId] = now\n` : ""}${config.validation ? `\n\t-- Validation\n${config.params.map((p) => `\tif ${p} == nil then return nil end`).join("\n")}\n` : ""}\n\t-- Your logic here\n\treturn true\nend`
      }`;
    }
    return `-- Server Script (ServerScriptService)
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

local ${config.name} = Instance.new("${config.type}")
${config.name}.Name = "${config.name}"
${config.name}.Parent = ReplicatedStorage

-- Fire to ${config.direction === "server-to-all" ? "all clients" : "specific client"}
${
      config.direction === "server-to-all"
        ? `${config.name}:FireAllClients(${paramList})`
        : `local targetPlayer = Players:FindFirstChild("PlayerName")
if targetPlayer then
\t${config.name}:FireClient(targetPlayer${paramList ? ", " + paramList : ""})
end`
    }`;
  })();

  const clientCode = (() => {
    if (config.direction === "client-to-server") {
      return `-- Local Script (StarterPlayerScripts)
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ${config.name} = ReplicatedStorage:WaitForChild("${config.name}")

-- Fire to server
${
        isEvent
          ? `${config.name}:FireServer(${paramList})`
          : `local result = ${config.name}:InvokeServer(${paramList})
print("Result:", result)`
      }`;
    }
    return `-- Local Script (StarterPlayerScripts)
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local ${config.name} = ReplicatedStorage:WaitForChild("${config.name}")

${
      isEvent
        ? `${config.name}.OnClientEvent:Connect(function(${paramList})\n\t-- Handle event from server\n\tprint("Received ${config.name}")\nend)`
        : `${config.name}.OnClientInvoke = function(${paramList})\n\t-- Handle invoke from server\n\treturn true\nend`
    }`;
  })();

  return (
    <ToolLayout
      title="RemoteEvent Generator"
      description="Generate client-server communication code with validation and rate limiting"
      section="scripts"
      category="Code Generators"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Config */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-zinc-400">Name</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 font-mono text-sm text-white outline-none focus:border-blue-500/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-zinc-400">Type</label>
                <div className="flex gap-2">
                  {(["RemoteEvent", "RemoteFunction"] as RemoteType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setConfig({ ...config, type: t })}
                      className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                        config.type === t
                          ? "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/20"
                          : "bg-white/[0.04] text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-zinc-400">Direction</label>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { key: "client-to-server", label: "Client → Server" },
                      { key: "server-to-client", label: "Server → Client" },
                      { key: "server-to-all", label: "Server → All" },
                    ] as { key: Direction; label: string }[]
                  ).map((d) => (
                    <button
                      key={d.key}
                      onClick={() => setConfig({ ...config, direction: d.key })}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                        config.direction === d.key
                          ? "bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/20"
                          : "bg-white/[0.04] text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    checked={config.validation}
                    onChange={(e) =>
                      setConfig({ ...config, validation: e.target.checked })
                    }
                    className="accent-blue-500"
                  />
                  Validation
                </label>
                <label className="flex items-center gap-2 text-xs text-zinc-400">
                  <input
                    type="checkbox"
                    checked={config.rateLimit}
                    onChange={(e) =>
                      setConfig({ ...config, rateLimit: e.target.checked })
                    }
                    className="accent-blue-500"
                  />
                  Rate Limit
                </label>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">Parameters</h3>
            <div className="mb-3 flex gap-2">
              <input
                type="text"
                value={newParam}
                onChange={(e) => setNewParam(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addParam()}
                placeholder="paramName"
                className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 font-mono text-xs text-white outline-none focus:border-blue-500/30"
              />
              <button
                onClick={addParam}
                className="rounded-lg bg-white/[0.06] px-3 py-2 text-xs font-medium text-zinc-400 hover:bg-white/[0.1] hover:text-white"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {config.params.map((p, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-2.5 py-1.5 font-mono text-xs text-zinc-300"
                >
                  {p}
                  <button
                    onClick={() => removeParam(i)}
                    className="text-zinc-600 hover:text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Server Script
          </h3>
          <CodeOutput code={serverCode} />

          <h3 className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            Client Script
          </h3>
          <CodeOutput code={clientCode} />
        </div>
      </div>
    </ToolLayout>
  );
}
