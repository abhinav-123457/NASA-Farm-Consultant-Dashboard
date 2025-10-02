"use client"

import { useState, useEffect } from "react"
import { FarmMap } from "@/components/farm-map"
import { DataDashboard } from "@/components/data-dashboard"
import { MissionPanel } from "@/components/mission-panel"
import { ResourcePanel } from "@/components/resource-panel"
import { TutorialPanel } from "@/components/tutorial-panel"
import { LivestockPanel } from "@/components/livestock-panel"
import { NASAEducationPanel } from "@/components/nasa-education-panel"
import { Button } from "@/components/ui/button"
import { Droplets, Sprout, Play, Pause, Target, HelpCircle, Calendar, Beef, Satellite } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  fetchNASAPowerData,
  fetchNDVIData,
  fetchSoilMoistureData,
  DEFAULT_FARM_LOCATION,
  ndviToCropHealth,
  soilMoistureToPercentage,
  type NASAPowerData,
  type NASANDVIData,
  type NASASoilMoistureData,
} from "@/lib/nasa-data-service"

export interface Field {
  id: number
  x: number
  y: number
  cropHealth: number
  soilMoisture: number
  nutrients: number
  cropType: "Wheat" | "Corn" | "Soybeans"
  growthStage: number
  daysPlanted: number
  yield: number
  growthHistory: Array<{ week: number; growth: number }>
}

export interface Livestock {
  id: number
  type: "Cow" | "Chicken" | "Pig"
  health: number
  hunger: number
  age: number
  production: number
}

export default function FarmSimulator() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [selectedTool, setSelectedTool] = useState<"irrigate" | "fertilize" | null>(null)
  const [resources, setResources] = useState({
    water: 1000,
    fertilizer: 500,
    money: 10000,
    feed: 300,
  })

  const [currentYear, setCurrentYear] = useState(2025)
  const [currentMonth, setCurrentMonth] = useState(4)
  const [currentWeek, setCurrentWeek] = useState(1)
  const [currentDay, setCurrentDay] = useState(1)
  const [simulationSpeed, setSimulationSpeed] = useState<"slow" | "normal" | "fast">("normal")

  const [weather, setWeather] = useState({
    temperature: 72,
    rainfall: 0,
    humidity: 65,
  })

  const [showTutorial, setShowTutorial] = useState(true)
  const [tutorialStep, setTutorialStep] = useState(0)

  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      x: 1,
      y: 1,
      cropHealth: 75,
      soilMoisture: 60,
      nutrients: 70,
      cropType: "Wheat",
      growthStage: 45,
      daysPlanted: 30,
      yield: 0,
      growthHistory: [],
    },
    {
      id: 2,
      x: 2,
      y: 1,
      cropHealth: 85,
      soilMoisture: 80,
      nutrients: 85,
      cropType: "Corn",
      growthStage: 55,
      daysPlanted: 35,
      yield: 0,
      growthHistory: [],
    },
    {
      id: 3,
      x: 3,
      y: 1,
      cropHealth: 45,
      soilMoisture: 30,
      nutrients: 40,
      cropType: "Soybeans",
      growthStage: 25,
      daysPlanted: 20,
      yield: 0,
      growthHistory: [],
    },
    {
      id: 4,
      x: 1,
      y: 2,
      cropHealth: 90,
      soilMoisture: 85,
      nutrients: 90,
      cropType: "Wheat",
      growthStage: 70,
      daysPlanted: 50,
      yield: 0,
      growthHistory: [],
    },
    {
      id: 5,
      x: 2,
      y: 2,
      cropHealth: 55,
      soilMoisture: 45,
      nutrients: 50,
      cropType: "Corn",
      growthStage: 35,
      daysPlanted: 25,
      yield: 0,
      growthHistory: [],
    },
    {
      id: 6,
      x: 3,
      y: 2,
      cropHealth: 70,
      soilMoisture: 65,
      nutrients: 75,
      cropType: "Wheat",
      growthStage: 50,
      daysPlanted: 35,
      yield: 0,
      growthHistory: [],
    },
  ])

  const [livestock, setLivestock] = useState<Livestock[]>([
    { id: 1, type: "Cow", health: 85, hunger: 40, age: 120, production: 0 },
    { id: 2, type: "Chicken", health: 90, hunger: 30, age: 60, production: 0 },
    { id: 3, type: "Pig", health: 75, hunger: 50, age: 90, production: 0 },
  ])

  const [currentMission, setCurrentMission] = useState<number>(0)
  const [missionStarted, setMissionStarted] = useState(false)
  const [decisions, setDecisions] = useState<Array<{ action: string; field: number; timestamp: number }>>([])
  const [showMissionPanel, setShowMissionPanel] = useState(true)
  const [showLivestockPanel, setShowLivestockPanel] = useState(false)
  const [showNASAEducation, setShowNASAEducation] = useState(false)
  const [nasaPowerData, setNasaPowerData] = useState<NASAPowerData | null>(null)
  const [nasaNDVIData, setNasaNDVIData] = useState<NASANDVIData[]>([])
  const [nasaSoilMoisture, setNasaSoilMoisture] = useState<NASASoilMoistureData | null>(null)
  const [isLoadingNASAData, setIsLoadingNASAData] = useState(false)
  const [useRealNASAData, setUseRealNASAData] = useState(false)

  const getMonthName = (month: number) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return months[month - 1]
  }

  const getSimulationInterval = () => {
    switch (simulationSpeed) {
      case "slow":
        return 3000
      case "normal":
        return 2000
      case "fast":
        return 1000
      default:
        return 2000
    }
  }

  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      setCurrentDay((prev) => {
        const newDay = prev + 1
        if (newDay > 7) {
          setCurrentWeek((w) => {
            const newWeek = w + 1
            if (newWeek > 4) {
              setCurrentMonth((m) => {
                const newMonth = m + 1
                if (newMonth > 12) {
                  setCurrentYear((y) => y + 1)
                  return 1
                }
                return newMonth
              })
              return 1
            }
            return newWeek
          })
          return 1
        }
        return newDay
      })

      setWeather({
        temperature: 68 + Math.random() * 15,
        rainfall: Math.random() < 0.3 ? Math.random() * 1.5 : 0,
        humidity: 50 + Math.random() * 30,
      })

      setFields((prevFields) =>
        prevFields.map((field) => {
          const cropRequirements = {
            Wheat: { waterNeed: 0.8, nutrientNeed: 0.6, optimalTemp: 70 },
            Corn: { waterNeed: 1.2, nutrientNeed: 1.0, optimalTemp: 75 },
            Soybeans: { waterNeed: 0.9, nutrientNeed: 0.7, optimalTemp: 72 },
          }

          const req = cropRequirements[field.cropType]

          let newMoisture = Math.max(0, field.soilMoisture - req.waterNeed - (weather.temperature > 80 ? 1 : 0))
          const newNutrients = Math.max(0, field.nutrients - req.nutrientNeed)

          newMoisture = Math.min(100, newMoisture + weather.rainfall * 10)

          const moistureHealth = newMoisture > 40 ? 1 : newMoisture / 40
          const nutrientHealth = newNutrients > 50 ? 1 : newNutrients / 50
          const tempDiff = Math.abs(weather.temperature - req.optimalTemp)
          const tempHealth = Math.max(0, 1 - tempDiff / 20)

          const overallHealth = (moistureHealth + nutrientHealth + tempHealth) / 3
          let newHealth = field.cropHealth + (overallHealth - 0.5) * 5
          newHealth = Math.max(0, Math.min(100, newHealth))

          const growthRate = overallHealth * 1.5
          const newGrowth = Math.min(100, field.growthStage + growthRate)

          let newYield = field.yield
          if (newGrowth >= 100 && field.growthStage < 100) {
            newYield = Math.floor(newHealth * 10 + Math.random() * 20)
          }

          return {
            ...field,
            soilMoisture: newMoisture,
            nutrients: newNutrients,
            cropHealth: newHealth,
            growthStage: newGrowth,
            daysPlanted: field.daysPlanted + 1,
            yield: newYield,
            growthHistory:
              currentDay === 7
                ? [...field.growthHistory, { week: currentWeek, growth: newGrowth }]
                : field.growthHistory,
          }
        }),
      )

      setLivestock((prevLivestock) =>
        prevLivestock.map((animal) => {
          const requirements = {
            Cow: { feedNeed: 2, productionRate: 5, healthDecay: 0.5 },
            Chicken: { feedNeed: 0.5, productionRate: 8, healthDecay: 0.3 },
            Pig: { feedNeed: 1.5, productionRate: 3, healthDecay: 0.4 },
          }

          const req = requirements[animal.type]

          const newHunger = Math.min(100, animal.hunger + req.feedNeed)
          let newHealth = animal.health

          if (newHunger > 70) {
            newHealth = Math.max(0, newHealth - req.healthDecay)
          } else if (newHunger < 30) {
            newHealth = Math.min(100, newHealth + 0.3)
          }

          let newProduction = animal.production
          if (newHealth > 70 && newHunger < 50) {
            newProduction += req.productionRate
            if (animal.type === "Cow" && newProduction >= 100) {
              setResources((prev) => ({ ...prev, money: prev.money + 50 }))
              newProduction = 0
            } else if (animal.type === "Chicken" && newProduction >= 100) {
              setResources((prev) => ({ ...prev, money: prev.money + 20 }))
              newProduction = 0
            } else if (animal.type === "Pig" && newProduction >= 100) {
              setResources((prev) => ({ ...prev, money: prev.money + 80 }))
              newProduction = 0
            }
          }

          return {
            ...animal,
            hunger: newHunger,
            health: newHealth,
            age: animal.age + 1,
            production: newProduction,
          }
        }),
      )
    }, getSimulationInterval())

    return () => clearInterval(interval)
  }, [isSimulating, weather.temperature, weather.rainfall, simulationSpeed, currentWeek, currentDay])

  useEffect(() => {
    if (isSimulating && useRealNASAData && !nasaPowerData) {
      fetchRealNASAData()
    }
  }, [isSimulating, useRealNASAData])

  const fetchRealNASAData = async () => {
    setIsLoadingNASAData(true)
    try {
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      const formatDate = (date: Date) => date.toISOString().split("T")[0]

      // Fetch NASA POWER climate data
      const powerData = await fetchNASAPowerData(DEFAULT_FARM_LOCATION, formatDate(yesterday), formatDate(today))
      setNasaPowerData(powerData)

      // Fetch NDVI data for each field
      const ndviPromises = fields.map((field) => fetchNDVIData(DEFAULT_FARM_LOCATION, formatDate(today)))
      const ndviResults = await Promise.all(ndviPromises)
      setNasaNDVIData(ndviResults)

      // Fetch soil moisture data
      const soilMoistureData = await fetchSoilMoistureData(DEFAULT_FARM_LOCATION)
      setNasaSoilMoisture(soilMoistureData)

      // Update weather with real NASA data
      setWeather({
        temperature: powerData.temperature,
        rainfall: powerData.precipitation,
        humidity: powerData.humidity,
      })

      // Update fields with real NASA data
      setFields((prevFields) =>
        prevFields.map((field, index) => {
          const ndvi = ndviResults[index]
          const cropHealth = ndviToCropHealth(ndvi.ndvi)
          const soilMoisture = soilMoistureToPercentage(soilMoistureData.surfaceSoilMoisture)

          return {
            ...field,
            cropHealth: cropHealth,
            soilMoisture: soilMoisture,
          }
        }),
      )
    } catch (error) {
      console.error("[v0] Error fetching NASA data:", error)
    } finally {
      setIsLoadingNASAData(false)
    }
  }

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  const handleToolUsed = (fieldId: number, tool: "irrigate" | "fertilize", cost: number) => {
    if (tool === "irrigate") {
      if (resources.water < cost) return
      setResources((prev) => ({ ...prev, water: prev.water - cost }))
      setFields((prev) =>
        prev.map((f) =>
          f.id === fieldId
            ? { ...f, soilMoisture: Math.min(100, f.soilMoisture + 25), cropHealth: Math.min(100, f.cropHealth + 5) }
            : f,
        ),
      )
    } else if (tool === "fertilize") {
      if (resources.fertilizer < cost) return
      setResources((prev) => ({ ...prev, fertilizer: prev.fertilizer - cost }))
      setFields((prev) =>
        prev.map((f) =>
          f.id === fieldId
            ? { ...f, nutrients: Math.min(100, f.nutrients + 30), cropHealth: Math.min(100, f.cropHealth + 8) }
            : f,
        ),
      )
    }

    if (missionStarted) {
      setDecisions((prev) => [
        ...prev,
        {
          action: tool === "irrigate" ? "Irrigation" : "Fertilization",
          field: fieldId,
          timestamp: Date.now(),
        },
      ])
    }
  }

  const handleHarvest = (fieldId: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id === fieldId && f.growthStage >= 100 && f.yield > 0) {
          setResources((r) => ({ ...r, money: r.money + f.yield * 50 }))
          return {
            ...f,
            growthStage: 0,
            daysPlanted: 0,
            yield: 0,
            cropHealth: 80,
            growthHistory: [],
          }
        }
        return f
      }),
    )
  }

  const handleFeedLivestock = (livestockId: number) => {
    const animal = livestock.find((l) => l.id === livestockId)
    if (!animal) return

    const feedCost = animal.type === "Cow" ? 20 : animal.type === "Chicken" ? 5 : 15

    if (resources.feed < feedCost) return

    setResources((prev) => ({ ...prev, feed: prev.feed - feedCost }))
    setLivestock((prev) => prev.map((l) => (l.id === livestockId ? { ...l, hunger: Math.max(0, l.hunger - 40) } : l)))
  }

  return (
    <div className="min-h-screen bg-background">
      {showTutorial && (
        <TutorialPanel
          step={tutorialStep}
          onNext={() => setTutorialStep(tutorialStep + 1)}
          onClose={() => setShowTutorial(false)}
        />
      )}

      {showNASAEducation && <NASAEducationPanel onClose={() => setShowNASAEducation(false)} />}

      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Sprout className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">NASA Farm Consultant Dashboard</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-lg">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {getMonthName(currentMonth)} {currentYear}, Week {currentWeek}, Day {currentDay}
              </span>
            </div>
            {useRealNASAData && (
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
                <Satellite className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-primary">Real NASA Data Active</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setShowTutorial(true)}>
              <HelpCircle className="mr-2 h-4 w-4" />
              Tutorial
            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowMissionPanel(!showMissionPanel)}>
              <Target className="mr-2 h-4 w-4" />
              {showMissionPanel ? "Hide" : "Show"} Mission
            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowLivestockPanel(!showLivestockPanel)}>
              <Beef className="mr-2 h-4 w-4" />
              {showLivestockPanel ? "Hide" : "Show"} Livestock
            </Button>

            {isSimulating && (
              <Select value={simulationSpeed} onValueChange={(v) => setSimulationSpeed(v as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Button variant={isSimulating ? "destructive" : "default"} size="sm" onClick={toggleSimulation}>
              {isSimulating ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Simulation
                </>
              )}
            </Button>

            <Button variant="outline" size="sm" onClick={() => setShowNASAEducation(true)}>
              <Satellite className="mr-2 h-4 w-4" />
              NASA Data Guide
            </Button>

            <Button
              variant={useRealNASAData ? "default" : "outline"}
              size="sm"
              onClick={() => setUseRealNASAData(!useRealNASAData)}
              disabled={isLoadingNASAData}
            >
              {isLoadingNASAData ? "Loading..." : useRealNASAData ? "Using Real Data" : "Use Real NASA Data"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        <aside className="w-80 border-r border-border bg-card overflow-y-auto">
          {showMissionPanel && (
            <MissionPanel
              currentMission={currentMission}
              missionStarted={missionStarted}
              onStartMission={() => setMissionStarted(true)}
              onNextMission={() => {
                setCurrentMission((prev) => prev + 1)
                setMissionStarted(false)
                setDecisions([])
              }}
              decisions={decisions}
              fields={fields}
              weather={weather}
            />
          )}

          {showLivestockPanel && (
            <LivestockPanel livestock={livestock} onFeed={handleFeedLivestock} resources={resources} />
          )}

          <div className="p-4">
            <ResourcePanel resources={resources} />

            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Farm Tools</h3>
              <div className="space-y-2">
                <Button
                  variant={selectedTool === "irrigate" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool(selectedTool === "irrigate" ? null : "irrigate")}
                >
                  <Droplets className="mr-2 h-4 w-4" />
                  Irrigate Field (50 water)
                </Button>
                <Button
                  variant={selectedTool === "fertilize" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool(selectedTool === "fertilize" ? null : "fertilize")}
                >
                  <Sprout className="mr-2 h-4 w-4" />
                  Apply Fertilizer (25 units)
                </Button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-hidden">
          <FarmMap
            fields={fields}
            selectedTool={selectedTool}
            onToolUsed={handleToolUsed}
            onHarvest={handleHarvest}
            missionStarted={missionStarted}
          />
        </main>

        <aside className="w-96 border-l border-border bg-card overflow-y-auto">
          <DataDashboard isSimulating={isSimulating} currentWeek={currentWeek} fields={fields} weather={weather} />
        </aside>
      </div>
    </div>
  )
}
