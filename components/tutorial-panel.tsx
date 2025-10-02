"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, ArrowRight, Lightbulb } from "lucide-react"

interface TutorialPanelProps {
  step: number
  onNext: () => void
  onClose: () => void
}

const tutorialSteps = [
  {
    title: "Welcome to NASA Farm Consultant Dashboard",
    content:
      "This simulator uses real NASA satellite data to help you make informed farming decisions. You'll analyze crop health, soil moisture, and weather patterns to solve real-world agricultural challenges.",
    image: "/satellite-view-of-farmland.jpg",
    tip: "This tool is designed for educational purposes and professional farm consulting training.",
  },
  {
    title: "Understanding the Time System",
    content:
      "Time progresses in days, weeks, months, and years. Watch the calendar in the top header. You can control simulation speed (Slow/Normal/Fast) to observe long-term crop growth patterns and seasonal changes.",
    image: "/calendar-and-clock-farming-seasons.jpg",
    tip: "One simulation day = 2 seconds in real-time at normal speed.",
  },
  {
    title: "Your Farm Layout",
    content:
      "The center map shows your 6 fields with different crops (Wheat, Corn, Soybeans). Each field has unique characteristics: crop health, soil moisture, and nutrient levels. Click any field to see detailed information.",
    image: "/farm-fields-aerial-view-with-different-crops.jpg",
    tip: "Different crops have different water and nutrient requirements.",
  },
  {
    title: "Using Farm Tools",
    content:
      "Select a tool from the left sidebar (Irrigation or Fertilizer), then click on a field to apply it. Irrigation adds 25% soil moisture and costs 50 water units. Fertilizer adds 30% nutrients and costs 25 fertilizer units.",
    image: "/irrigation-system-and-fertilizer-application.jpg",
    tip: "Monitor your resources carefully - running out can harm your crops!",
  },
  {
    title: "NASA Data Layers",
    content:
      "When a mission is active, toggle NASA data layers: NDVI (crop health from satellites), SMAP (soil moisture), and GPM (weather forecasts). These real data sources help you make informed decisions.",
    image: "/satellite-data-visualization-ndvi-map.jpg",
    tip: "NDVI shows vegetation health - green is healthy, red indicates stress.",
  },
  {
    title: "Mission System",
    content:
      "Complete missions to practice real farm consulting scenarios. Each mission presents a problem, provides NASA data, and evaluates your decisions. Log your actions and generate reports to see how well you solved the challenge.",
    image: "/farm-consultant-analyzing-data-on-computer.jpg",
    tip: "Start with Mission 1 to learn how to diagnose crop stress using satellite data.",
  },
  {
    title: "Crop Growth & Harvesting",
    content:
      "Crops grow through stages: Germinating → Seedling → Growing → Flowering → Mature. Growth depends on soil moisture, nutrients, and temperature. When crops reach 100% growth, click the 'Harvest Crop' button to collect your yield and earn money!",
    image: "/crop-growth-stages-from-seed-to-harvest.jpg",
    tip: "Healthy crops (80%+ health) produce higher yields and more profit. Track growth over time with the graph!",
  },
  {
    title: "Livestock Management",
    content:
      "Manage your livestock (Cows, Chickens, Pigs) by monitoring their health, hunger, and production levels. Feed animals regularly to keep them healthy and productive. Each animal produces valuable products: milk, eggs, or meat.",
    image: "/farm-animals-cows-chickens-pigs-in-barn.jpg",
    tip: "Hungry animals (70%+ hunger) lose health quickly. Feed them before their health drops too low!",
  },
  {
    title: "Ready to Start!",
    content:
      "You're all set! Click 'Start Simulation' to begin. Monitor the data dashboard on the right for real-time analytics. Complete missions to improve your farm consulting skills. Good luck!",
    image: "/farmer-using-technology-successful-harvest.jpg",
    tip: "You can reopen this tutorial anytime by clicking the Tutorial button in the header.",
  },
]

export function TutorialPanel({ step, onNext, onClose }: TutorialPanelProps) {
  const currentStep = tutorialSteps[step] || tutorialSteps[tutorialSteps.length - 1]
  const isLastStep = step >= tutorialSteps.length - 1

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {tutorialSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-8 rounded-full transition-colors ${idx <= step ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-2">
              Step {step + 1} of {tutorialSteps.length}
            </span>
          </div>
          <CardTitle className="text-xl text-foreground">{currentStep.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <img
            src={currentStep.image || "/placeholder.svg"}
            alt={currentStep.title}
            className="w-full h-48 object-cover rounded-lg"
          />

          <p className="text-foreground leading-relaxed">{currentStep.content}</p>

          <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Pro Tip</p>
              <p className="text-sm text-muted-foreground">{currentStep.tip}</p>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={onClose}>
              Skip Tutorial
            </Button>
            <Button onClick={isLastStep ? onClose : onNext}>
              {isLastStep ? "Get Started" : "Next"}
              {!isLastStep && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
