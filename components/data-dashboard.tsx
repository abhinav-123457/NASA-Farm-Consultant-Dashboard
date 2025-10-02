"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Droplets, Thermometer, Cloud, Sprout, Satellite } from "lucide-react"
import type { Field } from "@/app/page"
import { useMemo } from "react"

interface DataDashboardProps {
  isSimulating: boolean
  currentWeek: number
  fields: Field[]
  weather: {
    temperature: number
    rainfall: number
    humidity: number
  }
}

export function DataDashboard({ isSimulating, currentWeek, fields, weather }: DataDashboardProps) {
  const avgCropHealth = useMemo(() => {
    return Math.round(fields.reduce((sum, f) => sum + f.cropHealth, 0) / fields.length)
  }, [fields])

  const avgGrowthStage = useMemo(() => {
    return Math.round(fields.reduce((sum, f) => sum + f.growthStage, 0) / fields.length)
  }, [fields])

  const totalYield = useMemo(() => {
    return fields.reduce((sum, f) => sum + f.yield, 0)
  }, [fields])

  const cropGrowthData = useMemo(() => {
    const data = []
    for (let week = 1; week <= Math.min(currentWeek, 12); week++) {
      data.push({
        week,
        wheat: Math.min(100, week * 8 + Math.random() * 10),
        corn: Math.min(100, week * 7 + Math.random() * 10),
        soybeans: Math.min(100, week * 7.5 + Math.random() * 10),
      })
    }
    return data
  }, [currentWeek])

  // Mock weather forecast data
  const weatherData = [
    { day: "Mon", temp: 72, rainfall: 0 },
    { day: "Tue", temp: 75, rainfall: 0.2 },
    { day: "Wed", temp: 78, rainfall: 0 },
    { day: "Thu", temp: 76, rainfall: 0.5 },
    { day: "Fri", temp: 74, rainfall: 0.8 },
    { day: "Sat", temp: 73, rainfall: 0.3 },
    { day: "Sun", temp: 75, rainfall: 0 },
  ]

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Data Dashboard</h2>
        <p className="text-sm text-muted-foreground">Real-time farm metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Crop Health</p>
                <p className="text-2xl font-bold text-foreground mt-1">{avgCropHealth}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Growth</p>
                <p className="text-2xl font-bold text-foreground mt-1">{avgGrowthStage}%</p>
              </div>
              <Sprout className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Current Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="h-4 w-4 text-chart-3" />
                <p className="text-xs text-muted-foreground">Temperature</p>
              </div>
              <p className="text-lg font-bold text-foreground">{Math.round(weather.temperature)}°F</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="h-4 w-4 text-chart-4" />
                <p className="text-xs text-muted-foreground">Rainfall</p>
              </div>
              <p className="text-lg font-bold text-foreground">{weather.rainfall.toFixed(1)}"</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cloud className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Humidity</p>
              </div>
              <p className="text-lg font-bold text-foreground">{Math.round(weather.humidity)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Growth Chart */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Crop Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={cropGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="week"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `W${value}`}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value}%`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="wheat" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="corn" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="soybeans" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-1" />
              <span className="text-xs text-muted-foreground">Wheat</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-2" />
              <span className="text-xs text-muted-foreground">Corn</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-chart-3" />
              <span className="text-xs text-muted-foreground">Soybeans</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground">Field Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-muted-foreground">#{field.id}</span>
                  <span className="text-sm text-foreground">{field.cropType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Health</p>
                    <p className="text-sm font-medium text-foreground">{Math.round(field.cropHealth)}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Growth</p>
                    <p className="text-sm font-medium text-foreground">{Math.round(field.growthStage)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Climate Data Source */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Satellite className="h-4 w-4 text-primary mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">NASA Open Data Sources</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium">NDVI:</span> Landsat/Sentinel satellites •{" "}
                <span className="font-medium">Soil Moisture:</span> NASA SMAP •{" "}
                <span className="font-medium">Climate:</span> NASA POWER Agroclimatology
              </p>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                This simulator demonstrates how real NASA satellite data can inform sustainable farming decisions,
                helping optimize yields while conserving water and reducing environmental impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
