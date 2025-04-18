import { Card, CardContent } from "@/components/ui/card"
import { Brain, Database, Globe, Layers, MessageSquare, Server, Smartphone, Zap } from "lucide-react"

export default function TechStack() {
  const technologies = [
    {
      category: "AI & Machine Learning",
      icon: <Brain className="h-8 w-8 text-teal-600" />,
      items: [
        "Computer Vision for image analysis",
        "Natural Language Processing for text & voice",
        "Sentiment Analysis for community feedback",
        "Predictive Analytics for issue prioritization",
      ],
    },
    {
      category: "Geospatial Technology",
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      items: [
        "Interactive mapping visualization",
        "Geospatial clustering algorithms",
        "Location-based analytics",
        "Spatial data processing",
      ],
    },
    {
      category: "Frontend & Mobile",
      icon: <Smartphone className="h-8 w-8 text-teal-600" />,
      items: [
        "Progressive Web App (PWA)",
        "React Native mobile applications",
        "Responsive web design",
        "Offline-first functionality",
      ],
    },
    {
      category: "Backend & Infrastructure",
      icon: <Server className="h-8 w-8 text-teal-600" />,
      items: [
        "Serverless architecture",
        "Real-time data processing",
        "Secure API endpoints",
        "Scalable cloud infrastructure",
      ],
    },
    {
      category: "Data Storage",
      icon: <Database className="h-8 w-8 text-teal-600" />,
      items: [
        "NoSQL databases for flexible data",
        "Time-series data for trend analysis",
        "Geospatial data indexing",
        "Secure user data storage",
      ],
    },
    {
      category: "Integration",
      icon: <Layers className="h-8 w-8 text-teal-600" />,
      items: [
        "Open APIs for government systems",
        "Social media integration",
        "Weather data services",
        "Public transportation data",
      ],
    },
    {
      category: "Communication",
      icon: <MessageSquare className="h-8 w-8 text-teal-600" />,
      items: ["Real-time notifications", "Community messaging", "Automated alerts", "Multi-channel communication"],
    },
    {
      category: "Performance",
      icon: <Zap className="h-8 w-8 text-teal-600" />,
      items: [
        "Low-bandwidth optimization",
        "Fast load times on all devices",
        "Efficient data transfer",
        "Battery-friendly mobile design",
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {technologies.map((tech, index) => (
        <Card key={index} className="transition-all duration-300 hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              {tech.icon}
              <h3 className="font-bold text-lg">{tech.category}</h3>
            </div>
            <ul className="space-y-2">
              {tech.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                  <span className="text-teal-600 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
