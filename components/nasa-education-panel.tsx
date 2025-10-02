"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Satellite, Droplets, Cloud, Lightbulb } from "lucide-react"
import { getNASADataEducation } from "@/lib/nasa-data-service"

interface NASAEducationPanelProps {
  onClose: () => void
}

export function NASAEducationPanel({ onClose }: NASAEducationPanelProps) {
  const ndviEducation = getNASADataEducation("ndvi")
  const soilEducation = getNASADataEducation("soil-moisture")
  const climateEducation = getNASADataEducation("climate")

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Satellite className="h-6 w-6 text-primary" />
              <CardTitle className="text-xl">NASA Data for Sustainable Agriculture</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              NASA provides free, open-access satellite data that helps farmers make informed decisions for sustainable
              agriculture. Learn how to interpret and use this data to optimize crop yields while conserving resources.
            </p>
          </div>

          <Tabs defaultValue="ndvi" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ndvi">NDVI</TabsTrigger>
              <TabsTrigger value="soil">Soil Moisture</TabsTrigger>
              <TabsTrigger value="climate">Climate Data</TabsTrigger>
            </TabsList>

            <TabsContent value="ndvi" className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{ndviEducation.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{ndviEducation.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Satellite className="h-4 w-4 text-chart-1" />
                  How to Interpret NDVI Values
                </h4>
                <div className="space-y-2">
                  {ndviEducation.interpretation.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-chart-1 mt-1.5" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-chart-2" />
                  Sustainable Practices Using NDVI
                </h4>
                <div className="space-y-2">
                  {ndviEducation.sustainablePractices.map((practice, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-primary/5 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                      <p className="text-sm text-foreground">{practice}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Data Sources:</span> Landsat 8/9, Sentinel-2, MODIS
                  satellites provide NDVI data every 5-16 days at 10-30m resolution.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="soil" className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{soilEducation.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{soilEducation.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-chart-4" />
                  Understanding Soil Moisture Data
                </h4>
                <div className="space-y-2">
                  {soilEducation.interpretation.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-chart-4 mt-1.5" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-chart-2" />
                  Water Conservation Strategies
                </h4>
                <div className="space-y-2">
                  {soilEducation.sustainablePractices.map((practice, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-primary/5 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                      <p className="text-sm text-foreground">{practice}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Data Source:</span> NASA's SMAP satellite provides
                  global soil moisture data every 2-3 days at 9km resolution.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="climate" className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{climateEducation.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{climateEducation.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-muted-foreground" />
                  Key Climate Parameters
                </h4>
                <div className="space-y-2">
                  {climateEducation.interpretation.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-muted/30 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-chart-3 mt-1.5" />
                      <p className="text-sm text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-chart-2" />
                  Climate-Smart Agriculture
                </h4>
                <div className="space-y-2">
                  {climateEducation.sustainablePractices.map((practice, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-primary/5 rounded-lg">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                      <p className="text-sm text-foreground">{practice}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Data Source:</span> NASA POWER provides 40+ years of
                  daily climate data at 0.5° x 0.5° resolution globally.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="text-sm font-semibold text-foreground mb-2">How This Simulator Uses NASA Data</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When you enable "Use Real NASA Data", this simulator fetches actual satellite observations and climate
              data from NASA's open APIs. The data is used to update crop health (NDVI), soil moisture (SMAP), and
              weather conditions (POWER) in real-time, giving you hands-on experience with the same data professional
              farmers and agricultural consultants use worldwide.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
