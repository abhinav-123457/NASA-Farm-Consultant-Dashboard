"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, CheckCircle2, AlertTriangle } from "lucide-react"
import type { Field } from "@/app/page"

interface MissionPanelProps {
  currentMission: number
  missionStarted: boolean
  onStartMission: () => void
  onNextMission: () => void
  decisions: Array<{ action: string; field: number; timestamp: number }>
  fields: Field[]
  weather: {
    temperature: number
    rainfall: number
    humidity: number
  }
}

const missions = [
  {
    id: 1,
    title: "Declining Crop Yield in South Field",
    description:
      "Your client reports that Field #3 (Soybeans) is showing signs of stress with declining yields. Analyze the NASA satellite data to identify the problem and propose a solution.",
    problem: "Low soil moisture and nutrient deficiency detected",
    nasaData: [
      "NDVI shows vegetation stress",
      "SMAP indicates critically low soil moisture",
      "GPM forecasts minimal rainfall",
    ],
    objectives: ["Analyze NDVI data layer", "Check soil moisture levels", "Implement irrigation strategy"],
  },
  {
    id: 2,
    title: "Extended Drought Forecast",
    description:
      "Local weather reports predict an extended drought period. Use NASA climate data to prepare the farm and minimize crop losses.",
    problem: "Upcoming water scarcity threatening all crops",
    nasaData: [
      "GPM predicts 14 days without rainfall",
      "Temperature forecast shows above-average heat",
      "SMAP shows declining soil moisture trend",
    ],
    objectives: ["Prioritize water allocation", "Identify most vulnerable fields", "Implement water conservation"],
  },
  {
    id: 3,
    title: "Optimize Fertilizer Application",
    description:
      "The client wants to reduce fertilizer costs while maintaining crop health. Use satellite data to identify which fields actually need fertilization.",
    problem: "Inefficient fertilizer use across multiple fields",
    nasaData: [
      "NDVI shows varying vegetation health",
      "Landsat data reveals nutrient distribution patterns",
      "Historical yield data available",
    ],
    objectives: ["Analyze crop health by field", "Target low-nutrient areas", "Reduce unnecessary fertilization"],
  },
]

export function MissionPanel({
  currentMission,
  missionStarted,
  onStartMission,
  onNextMission,
  decisions,
  fields,
  weather,
}: MissionPanelProps) {
  const [showReport, setShowReport] = useState(false)

  const mission = missions[currentMission % missions.length]

  const generateReport = () => {
    const targetField = fields.find((f) => f.id === 3) // Example: Field 3 for mission 1
    const irrigationCount = decisions.filter((d) => d.action === "Irrigation").length
    const fertilizationCount = decisions.filter((d) => d.action === "Fertilization").length

    let score = 0
    const feedback = []

    if (currentMission === 0) {
      // Mission 1: Declining yield in Field 3
      const field3Decisions = decisions.filter((d) => d.field === 3)
      if (field3Decisions.some((d) => d.action === "Irrigation")) {
        score += 50
        feedback.push("✓ Correct: You addressed the low soil moisture issue identified by SMAP data")
      } else {
        feedback.push("✗ Missed: SMAP data showed critically low soil moisture in Field #3")
      }

      if (field3Decisions.some((d) => d.action === "Fertilization")) {
        score += 30
        feedback.push("✓ Good: You applied fertilizer to address nutrient deficiency")
      }

      if (targetField && targetField.cropHealth > 60) {
        score += 20
        feedback.push("✓ Success: Crop health improved to acceptable levels")
      }
    }

    return { score, feedback }
  }

  const report = showReport ? generateReport() : null

  return (
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Mission {mission.id}
        </h3>
        <Badge variant={missionStarted ? "default" : "secondary"}>{missionStarted ? "Active" : "Not Started"}</Badge>
      </div>

      {!showReport ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">{mission.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-foreground leading-relaxed">{mission.description}</p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Problem</p>
                  <p className="text-xs text-muted-foreground">{mission.problem}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">NASA Data Available:</p>
              <ul className="space-y-1">
                {mission.nasaData.map((data, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {data}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Objectives:</p>
              <ul className="space-y-1">
                {mission.objectives.map((obj, idx) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 space-y-2">
              {!missionStarted ? (
                <Button onClick={onStartMission} className="w-full" size="sm">
                  Start Mission
                </Button>
              ) : (
                <>
                  <div className="p-2 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Decisions logged: {decisions.length}</p>
                  </div>
                  <Button onClick={() => setShowReport(true)} className="w-full" size="sm" variant="secondary">
                    Generate Mission Report
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">Mission Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <p className="text-3xl font-bold text-primary">{report?.score}/100</p>
              <p className="text-xs text-muted-foreground mt-1">Mission Score</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">Analysis:</p>
              {report?.feedback.map((item, idx) => (
                <p key={idx} className="text-xs text-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Actions Taken:</span> {decisions.length} decisions
                logged
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-semibold text-foreground">Data Sources:</span> NASA SMAP, Landsat NDVI, GPM
                Climate
              </p>
            </div>

            <Button onClick={onNextMission} className="w-full" size="sm">
              Next Mission
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
