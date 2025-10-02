"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, TrendingUp } from "lucide-react"
import type { Field } from "@/app/page"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface FarmMapProps {
  fields: Field[]
  selectedTool: "irrigate" | "fertilize" | null
  onToolUsed: (fieldId: number, tool: "irrigate" | "fertilize", cost: number) => void
  onHarvest: (fieldId: number) => void
  missionStarted: boolean
}

export function FarmMap({ fields, selectedTool, onToolUsed, onHarvest, missionStarted }: FarmMapProps) {
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const [activeLayer, setActiveLayer] = useState<"none" | "ndvi" | "moisture" | "weather">("none")

  const handleFieldClick = (field: Field) => {
    setSelectedField(field)

    if (selectedTool === "irrigate") {
      onToolUsed(field.id, "irrigate", 50)
    } else if (selectedTool === "fertilize") {
      onToolUsed(field.id, "fertilize", 25)
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return "bg-chart-1"
    if (health >= 60) return "bg-chart-2"
    if (health >= 40) return "bg-chart-3"
    return "bg-destructive"
  }

  const getHealthLabel = (health: number) => {
    if (health >= 80) return "Excellent"
    if (health >= 60) return "Good"
    if (health >= 40) return "Fair"
    return "Poor"
  }

  const getGrowthStageLabel = (stage: number) => {
    if (stage >= 100) return "Mature"
    if (stage >= 75) return "Flowering"
    if (stage >= 50) return "Growing"
    if (stage >= 25) return "Seedling"
    return "Germinating"
  }

  const getCropImage = (cropType: string, growthStage: number) => {
    const stage = getGrowthStageLabel(growthStage).toLowerCase()
    return `/placeholder.svg?height=300&width=300&query=${cropType.toLowerCase()}+crop+${stage}+stage`
  }

  const getLayerOverlay = (field: Field) => {
    if (activeLayer === "ndvi") {
      const ndviColor =
        field.cropHealth >= 80
          ? "bg-green-500"
          : field.cropHealth >= 60
            ? "bg-yellow-500"
            : field.cropHealth >= 40
              ? "bg-orange-500"
              : "bg-red-500"
      return `${ndviColor} opacity-60`
    } else if (activeLayer === "moisture") {
      const moistureColor =
        field.soilMoisture >= 70
          ? "bg-blue-500"
          : field.soilMoisture >= 40
            ? "bg-cyan-500"
            : field.soilMoisture >= 20
              ? "bg-yellow-500"
              : "bg-red-500"
      return `${moistureColor} opacity-60`
    } else if (activeLayer === "weather") {
      return "bg-blue-400 opacity-30"
    }
    return `${getHealthColor(field.cropHealth)} opacity-40`
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Farm Overview</h2>
            <p className="text-sm text-muted-foreground">
              {selectedTool
                ? `Selected: ${selectedTool === "irrigate" ? "Irrigation" : "Fertilizer"}`
                : "Select a tool and click on a field"}
            </p>
          </div>

          {missionStarted && (
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground mr-2">NASA Satellite Layers:</span>
              <Button
                variant={activeLayer === "ndvi" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveLayer(activeLayer === "ndvi" ? "none" : "ndvi")}
                title="Normalized Difference Vegetation Index - Crop health from satellite imagery"
              >
                NDVI
              </Button>
              <Button
                variant={activeLayer === "moisture" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveLayer(activeLayer === "moisture" ? "none" : "moisture")}
                title="NASA SMAP - Soil moisture from satellite measurements"
              >
                SMAP
              </Button>
              <Button
                variant={activeLayer === "weather" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveLayer(activeLayer === "weather" ? "none" : "weather")}
                title="NASA POWER - Climate and weather data"
              >
                Climate
              </Button>
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-chart-1" />
              <span className="text-xs text-muted-foreground">Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-chart-2" />
              <span className="text-xs text-muted-foreground">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-chart-3" />
              <span className="text-xs text-muted-foreground">Fair</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <span className="text-xs text-muted-foreground">Poor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div
          className="relative mx-auto"
          style={{
            width: "800px",
            height: "600px",
            backgroundImage: "url(/placeholder.svg?height=600&width=800&query=aerial+view+of+farmland+with+fields)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        >
          {fields.map((field) => (
            <button
              key={field.id}
              onClick={() => handleFieldClick(field)}
              className={`absolute border-2 border-white/40 rounded-lg transition-all hover:border-white hover:scale-105 ${
                selectedField?.id === field.id ? "ring-4 ring-primary" : ""
              } ${selectedTool ? "cursor-pointer" : "cursor-default"}`}
              style={{
                left: `${(field.x - 1) * 33.33}%`,
                top: `${(field.y - 1) * 50}%`,
                width: "30%",
                height: "45%",
              }}
            >
              <div className={`h-full w-full ${getLayerOverlay(field)} rounded-lg`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <span className="text-sm font-semibold drop-shadow-lg">{field.cropType}</span>
                <Badge variant="secondary" className="mt-1 bg-black/60 text-white border-0">
                  {getHealthLabel(field.cropHealth)}
                </Badge>
                <Badge variant="secondary" className="mt-1 bg-black/40 text-white border-0 text-xs">
                  {getGrowthStageLabel(field.growthStage)}
                </Badge>
                {activeLayer === "moisture" && (
                  <Badge variant="secondary" className="mt-1 bg-blue-600/80 text-white border-0 text-xs">
                    {Math.round(field.soilMoisture)}% moisture
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedField && (
          <Card className="mt-6 p-4 max-w-2xl mx-auto">
            <div className="flex gap-4">
              <img
                src={getCropImage(selectedField.cropType, selectedField.growthStage) || "/placeholder.svg"}
                alt={`${selectedField.cropType} at ${getGrowthStageLabel(selectedField.growthStage)} stage`}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-3">
                  Field #{selectedField.id} - {selectedField.cropType}
                </h3>
                {missionStarted && activeLayer !== "none" && (
                  <div className="mb-3 p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs text-foreground">
                      <span className="font-semibold">Data Source:</span>{" "}
                      {activeLayer === "ndvi" && "Landsat/Sentinel NDVI"}
                      {activeLayer === "moisture" && "NASA SMAP Soil Moisture"}
                      {activeLayer === "weather" && "NASA GPM Weather Forecast"}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Growth Stage</p>
                    <p className="text-sm font-medium text-foreground">
                      {getGrowthStageLabel(selectedField.growthStage)} ({Math.round(selectedField.growthStage)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Days Planted</p>
                    <p className="text-sm font-medium text-foreground">{selectedField.daysPlanted} days</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Crop Health</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getHealthColor(selectedField.cropHealth)}`}
                      style={{ width: `${selectedField.cropHealth}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">{Math.round(selectedField.cropHealth)}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Soil Moisture</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-chart-4" style={{ width: `${selectedField.soilMoisture}%` }} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{Math.round(selectedField.soilMoisture)}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Nutrients</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-chart-5" style={{ width: `${selectedField.nutrients}%` }} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{Math.round(selectedField.nutrients)}%</span>
                </div>
              </div>
            </div>

            {selectedField.growthHistory.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                  <h4 className="text-sm font-semibold text-foreground">Growth Over Time</h4>
                </div>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={selectedField.growthHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="week"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(value) => `W${value}`}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Line type="monotone" dataKey="growth" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {selectedField.growthStage >= 100 && selectedField.yield > 0 && (
              <div className="mt-4 p-3 bg-chart-1/10 rounded-lg border border-chart-1/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Harvest Ready!</p>
                    <p className="text-xs text-muted-foreground">Yield: {selectedField.yield} bushels</p>
                    <p className="text-xs text-muted-foreground">Value: ${selectedField.yield * 50}</p>
                  </div>
                  <Button onClick={() => onHarvest(selectedField.id)} size="sm">
                    Harvest Crop
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
