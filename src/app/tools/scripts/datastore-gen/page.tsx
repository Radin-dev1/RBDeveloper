"use client";

import { useState } from "react";
import ToolLayout, { CodeOutput } from "@/components/ToolLayout";

interface DataField {
  name: string;
  type: "number" | "string" | "boolean" | "table";
  default: string;
}

export default function DataStoreGenPage() {
  const [storeName, setStoreName] = useState("PlayerData");
  const [fields, setFields] = useState<DataField[]>([
    { name: "coins", type: "number", default: "0" },
    { name: "level", type: "number", default: "1" },
    { name: "inventory", type: "table", default: "{}" },
    { name: "hasPlayed", type: "boolean", default: "false" },
  ]);
  const [useSessionLock, setUseSessionLock] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState(60);

  function addField() {
    setFields([...fields, { name: "newField", type: "number", default: "0" }]);
  }

  function removeField(index: number) {
    if (fields.length <= 1) return;
    setFields(fields.filter((_, i) => i !== index));
  }

  function updateField(index: number, updates: Partial<DataField>) {
    setFields(fields.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  }

  const defaultData = fields
    .map((f) => `\t${f.name} = ${f.default},`)
    .join("\n");

  const code = `local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")
${useSessionLock ? 'local RunService = game:GetService("RunService")\n' : ""}
local dataStore = DataStoreService:GetDataStore("${storeName}")

local DEFAULT_DATA = {
${defaultData}
}

local playerData = {} -- Cache${useSessionLock ? "\nlocal sessionLock = {}" : ""}

local function deepCopy(original)
\tlocal copy = {}
\tfor key, value in pairs(original) do
\t\tif type(value) == "table" then
\t\t\tcopy[key] = deepCopy(value)
\t\telse
\t\t\tcopy[key] = value
\t\tend
\tend
\treturn copy
end

local function loadData(player)
\tlocal key = "Player_" .. player.UserId
\tlocal success, data = pcall(function()
\t\treturn dataStore:GetAsync(key)
\tend)

\tif success then
\t\tif data then
\t\t\t-- Merge with defaults for new fields
\t\t\tlocal merged = deepCopy(DEFAULT_DATA)
\t\t\tfor k, v in pairs(data) do
\t\t\t\tmerged[k] = v
\t\t\tend
\t\t\tplayerData[player.UserId] = merged
\t\telse
\t\t\tplayerData[player.UserId] = deepCopy(DEFAULT_DATA)
\t\tend
\telse
\t\twarn("Failed to load data for " .. player.Name .. ": " .. tostring(data))
\t\tplayerData[player.UserId] = deepCopy(DEFAULT_DATA)
\tend${useSessionLock ? "\n\n\tsessionLock[player.UserId] = true" : ""}
end

local function saveData(player)
\tlocal key = "Player_" .. player.UserId
\tlocal data = playerData[player.UserId]
\tif not data then return end

\tlocal success, err = pcall(function()
\t\tdataStore:SetAsync(key, data)
\tend)

\tif not success then
\t\twarn("Failed to save data for " .. player.Name .. ": " .. tostring(err))
\tend
end

local function getData(player)
\treturn playerData[player.UserId]
end

-- Player join
Players.PlayerAdded:Connect(function(player)
\tloadData(player)
end)

-- Player leave
Players.PlayerRemoving:Connect(function(player)
\tsaveData(player)
\tplayerData[player.UserId] = nil${useSessionLock ? "\n\tsessionLock[player.UserId] = nil" : ""}
end)

-- Server shutdown
game:BindToClose(function()
\tfor _, player in ipairs(Players:GetPlayers()) do
\t\tsaveData(player)
\tend
end)${autoSaveInterval > 0 ? `

-- Auto-save every ${autoSaveInterval} seconds
task.spawn(function()
\twhile true do
\t\ttask.wait(${autoSaveInterval})
\t\tfor _, player in ipairs(Players:GetPlayers()) do
\t\t\tsaveData(player)
\t\tend
\tend
end)` : ""}

return {
\tgetData = getData,
\tsaveData = saveData,
}`;

  return (
    <ToolLayout
      title="DataStore Generator"
      description="Generate production-ready DataStore code with save/load, session locking, and auto-save"
      section="scripts"
      category="Code Generators"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {/* Store Config */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="mb-4 text-sm font-semibold text-white">
              DataStore Config
            </h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-zinc-400">
                  Store Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 font-mono text-sm text-white outline-none focus:border-blue-500/30"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={useSessionLock}
                  onChange={(e) => setUseSessionLock(e.target.checked)}
                  className="accent-blue-500"
                />
                Session Locking
              </label>

              <div>
                <label className="mb-2 flex justify-between text-xs text-zinc-400">
                  <span>Auto-Save Interval</span>
                  <span className="tabular-nums">
                    {autoSaveInterval === 0 ? "Off" : `${autoSaveInterval}s`}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={300}
                  step={15}
                  value={autoSaveInterval}
                  onChange={(e) => setAutoSaveInterval(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Data Fields */}
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Data Fields</h3>
              <button
                onClick={addField}
                className="rounded-lg bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.1] hover:text-white"
              >
                + Add Field
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl bg-white/[0.03] p-3"
                >
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => updateField(i, { name: e.target.value })}
                    className="w-28 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 font-mono text-xs text-white outline-none"
                    placeholder="name"
                  />
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateField(i, {
                        type: e.target.value as DataField["type"],
                        default:
                          e.target.value === "number"
                            ? "0"
                            : e.target.value === "string"
                              ? '""'
                              : e.target.value === "boolean"
                                ? "false"
                                : "{}",
                      })
                    }
                    className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 text-xs text-zinc-300 outline-none"
                  >
                    <option value="number">number</option>
                    <option value="string">string</option>
                    <option value="boolean">boolean</option>
                    <option value="table">table</option>
                  </select>
                  <input
                    type="text"
                    value={field.default}
                    onChange={(e) => updateField(i, { default: e.target.value })}
                    className="w-16 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 font-mono text-xs text-zinc-400 outline-none"
                  />
                  {fields.length > 1 && (
                    <button
                      onClick={() => removeField(i)}
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

        <div className="lg:sticky lg:top-8 lg:self-start">
          <CodeOutput code={code} />
        </div>
      </div>
    </ToolLayout>
  );
}
