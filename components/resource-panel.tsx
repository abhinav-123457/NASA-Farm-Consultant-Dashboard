import { Card, CardContent } from "@/components/ui/card"
import { Droplets, Sprout, DollarSign, Wheat } from "lucide-react"

interface ResourcePanelProps {
  resources: {
    water: number
    fertilizer: number
    money: number
    feed: number
  }
}

export function ResourcePanel({ resources }: ResourcePanelProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
      <div className="space-y-3">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-chart-4" />
                <span className="text-sm text-foreground">Water</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{resources.water}L</span>
            </div>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-chart-4 transition-all"
                style={{ width: `${Math.min(100, (resources.water / 1000) * 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sprout className="h-4 w-4 text-chart-5" />
                <span className="text-sm text-foreground">Fertilizer</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{resources.fertilizer}kg</span>
            </div>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-chart-5 transition-all"
                style={{ width: `${Math.min(100, (resources.fertilizer / 500) * 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wheat className="h-4 w-4 text-chart-3" />
                <span className="text-sm text-foreground">Feed</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{resources.feed} units</span>
            </div>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-chart-3 transition-all"
                style={{ width: `${Math.min(100, (resources.feed / 300) * 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-chart-2" />
                <span className="text-sm text-foreground">Budget</span>
              </div>
              <span className="text-sm font-semibold text-foreground">${resources.money.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
