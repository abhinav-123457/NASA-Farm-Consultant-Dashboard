"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Beef, Egg, Ham, AlertCircle } from "lucide-react"
import type { Livestock } from "@/app/page"

interface LivestockPanelProps {
  livestock: Livestock[]
  onFeed: (livestockId: number) => void
  resources: {
    feed: number
  }
}

export function LivestockPanel({ livestock, onFeed, resources }: LivestockPanelProps) {
  const getAnimalIcon = (type: string) => {
    switch (type) {
      case "Cow":
        return <Beef className="h-5 w-5" />
      case "Chicken":
        return <Egg className="h-5 w-5" />
      case "Pig":
        return <Ham className="h-5 w-5" />
      default:
        return null
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 80) return "text-chart-1"
    if (health >= 60) return "text-chart-2"
    if (health >= 40) return "text-chart-3"
    return "text-destructive"
  }

  const getHungerColor = (hunger: number) => {
    if (hunger <= 30) return "text-chart-1"
    if (hunger <= 50) return "text-chart-2"
    if (hunger <= 70) return "text-chart-3"
    return "text-destructive"
  }

  const getFeedCost = (type: string) => {
    switch (type) {
      case "Cow":
        return 20
      case "Chicken":
        return 5
      case "Pig":
        return 15
      default:
        return 10
    }
  }

  const getProductionInfo = (type: string) => {
    switch (type) {
      case "Cow":
        return { product: "Milk", value: "$50" }
      case "Chicken":
        return { product: "Eggs", value: "$20" }
      case "Pig":
        return { product: "Meat", value: "$80" }
      default:
        return { product: "Product", value: "$0" }
    }
  }

  return (
    <div className="border-b border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Beef className="h-4 w-4" />
          Livestock Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
          <span className="text-xs text-muted-foreground">Available Feed</span>
          <span className="text-sm font-semibold text-foreground">{resources.feed} units</span>
        </div>

        {livestock.map((animal) => {
          const feedCost = getFeedCost(animal.type)
          const productionInfo = getProductionInfo(animal.type)
          const canFeed = resources.feed >= feedCost

          return (
            <Card key={animal.id} className="bg-muted/20">
              <CardContent className="p-3">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAnimalIcon(animal.type)}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{animal.type}</p>
                      <p className="text-xs text-muted-foreground">{animal.age} days old</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    #{animal.id}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Health</span>
                      <span className={`text-xs font-medium ${getHealthColor(animal.health)}`}>
                        {Math.round(animal.health)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${animal.health >= 80 ? "bg-chart-1" : animal.health >= 60 ? "bg-chart-2" : animal.health >= 40 ? "bg-chart-3" : "bg-destructive"}`}
                        style={{ width: `${animal.health}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Hunger</span>
                      <span className={`text-xs font-medium ${getHungerColor(animal.hunger)}`}>
                        {Math.round(animal.hunger)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${animal.hunger <= 30 ? "bg-chart-1" : animal.hunger <= 50 ? "bg-chart-2" : animal.hunger <= 70 ? "bg-chart-3" : "bg-destructive"}`}
                        style={{ width: `${animal.hunger}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{productionInfo.product} Production</span>
                      <span className="text-xs font-medium text-foreground">{Math.round(animal.production)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${animal.production}%` }} />
                    </div>
                    {animal.production >= 100 && (
                      <p className="text-xs text-chart-1 mt-1">Ready to collect! {productionInfo.value}</p>
                    )}
                  </div>
                </div>

                {animal.hunger > 70 && (
                  <div className="flex items-center gap-1 mb-2 p-2 bg-destructive/10 rounded-lg">
                    <AlertCircle className="h-3 w-3 text-destructive" />
                    <p className="text-xs text-destructive">Needs feeding urgently!</p>
                  </div>
                )}

                <Button
                  onClick={() => onFeed(animal.id)}
                  disabled={!canFeed}
                  size="sm"
                  className="w-full"
                  variant={animal.hunger > 50 ? "default" : "outline"}
                >
                  Feed ({feedCost} units)
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </CardContent>
    </div>
  )
}
