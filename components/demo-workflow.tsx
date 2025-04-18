"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Camera, MessageSquare, BarChart3, MapPin, CheckCircle } from "lucide-react"

export default function DemoWorkflow() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "Report an Issue",
      description:
        "Community members can report local issues using their preferred method: photos, text, or voice recordings.",
      icon: <Camera className="h-12 w-12 text-teal-600" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Take photos of issues like potholes or flooding",
        "Write detailed descriptions",
        "Record voice notes for accessibility",
        "Automatically capture location data",
      ],
    },
    {
      title: "AI Analysis",
      description:
        "Our AI system analyzes reports to categorize issues, extract key information, and identify patterns.",
      icon: <MessageSquare className="h-12 w-12 text-teal-600" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Automatic issue categorization",
        "Sentiment analysis of community feedback",
        "Priority scoring based on severity and impact",
        "Pattern recognition across multiple reports",
      ],
    },
    {
      title: "Generate Insights",
      description: "The platform transforms raw data into actionable insights and comprehensive reports.",
      icon: <BarChart3 className="h-12 w-12 text-teal-600" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Visual dashboards showing issue trends",
        "Demographic impact analysis",
        "Resource allocation recommendations",
        "Predictive models for future issues",
      ],
    },
    {
      title: "Community Action",
      description: "Local authorities and community organizations use insights to address issues efficiently.",
      icon: <MapPin className="h-12 w-12 text-teal-600" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Coordinated response to community issues",
        "Progress tracking and status updates",
        "Community feedback on resolutions",
        "Impact measurement and reporting",
      ],
    },
    {
      title: "Resolution & Feedback",
      description:
        "Issues are resolved and community members receive updates and can provide feedback on the resolution.",
      icon: <CheckCircle className="h-12 w-12 text-teal-600" />,
      image: "/placeholder.svg?height=600&width=800",
      features: [
        "Real-time status updates",
        "Before and after comparisons",
        "Community satisfaction ratings",
        "Continuous improvement through feedback",
      ],
    },
  ]

  const nextStep = () => {
    setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  const prevStep = () => {
    setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <Button variant="outline" size="icon" onClick={prevStep} className="rounded-full">
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous step</span>
        </Button>

        <div className="flex space-x-2">
          {steps.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 p-0 rounded-full ${index === activeStep ? "bg-teal-600" : "bg-gray-200"}`}
              onClick={() => setActiveStep(index)}
            >
              <span className="sr-only">Step {index + 1}</span>
            </Button>
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextStep} className="rounded-full">
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next step</span>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 space-y-6">
              <div className="mb-4">{steps[activeStep].icon}</div>
              <h3 className="text-2xl font-bold">{steps[activeStep].title}</h3>
              <p className="text-muted-foreground">{steps[activeStep].description}</p>

              <div className="space-y-3 pt-4">
                <h4 className="font-semibold">Key Features:</h4>
                <ul className="space-y-2">
                  {steps[activeStep].features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-teal-600 mr-2">•</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-100 h-[400px] overflow-hidden">
              <img
                src={steps[activeStep].image || "/placeholder.svg"}
                alt={`Illustration of ${steps[activeStep].title}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
