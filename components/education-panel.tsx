"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Lightbulb } from "lucide-react"

export function EducationPanel() {
  const [currentTip, setCurrentTip] = useState(0)

  const educationalTips = [
    {
      title: "Soil Moisture",
      content:
        "Optimal soil moisture for most crops is 60-80%. Too much water can lead to root rot, while too little causes drought stress.",
      source: "NASA SMAP Data",
    },
    {
      title: "Nutrient Management",
      content:
        "Nitrogen, phosphorus, and potassium are essential for crop growth. Over-fertilization can harm the environment and waste resources.",
      source: "USDA Guidelines",
    },
    {
      title: "Climate Impact",
      content:
        "Temperature and rainfall patterns significantly affect crop yields. Use climate data to make informed irrigation decisions.",
      source: "NOAA Climate Data",
    },
  ]

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-foreground mb-3">Learning Center</h3>
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              {educationalTips[currentTip].title}
            </CardTitle>
            <Badge variant="secondary" className="text-xs">
              {currentTip + 1}/{educationalTips.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-foreground leading-relaxed">{educationalTips[currentTip].content}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>{educationalTips[currentTip].source}</span>
          </div>
          <div className="flex gap-1.5 pt-2">
            {educationalTips.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTip(index)}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  index === currentTip ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
