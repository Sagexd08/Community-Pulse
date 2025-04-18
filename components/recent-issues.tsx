import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export default function RecentIssues() {
  const issues = [
    {
      id: 1,
      title: "Flooding on Main Street",
      description: "Water accumulation after heavy rain, blocking pedestrian access",
      location: "Main St & 5th Ave",
      status: "In Progress",
      statusColor: "bg-amber-500",
      reporter: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      date: "2 days ago",
      category: "Infrastructure",
    },
    {
      id: 2,
      title: "Trash accumulation in park",
      description: "Overflowing trash bins in Central Park playground area",
      location: "Central Park, North Entrance",
      status: "Reported",
      statusColor: "bg-red-500",
      reporter: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
      date: "3 days ago",
      category: "Sanitation",
    },
    {
      id: 3,
      title: "Broken streetlight",
      description: "Streetlight not working at night, creating safety concerns",
      location: "Oak Street & 10th Ave",
      status: "Resolved",
      statusColor: "bg-green-500",
      reporter: {
        name: "Jessica Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JW",
      },
      date: "1 week ago",
      category: "Safety",
    },
    {
      id: 4,
      title: "Pothole damaging vehicles",
      description: "Large pothole causing damage to cars and creating traffic hazards",
      location: "Maple Drive near High School",
      status: "In Progress",
      statusColor: "bg-amber-500",
      reporter: {
        name: "David Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "DT",
      },
      date: "4 days ago",
      category: "Infrastructure",
    },
    {
      id: 5,
      title: "Graffiti on community center",
      description: "Vandalism on the east wall of the community center",
      location: "Community Center, 123 Pine St",
      status: "Reported",
      statusColor: "bg-red-500",
      reporter: {
        name: "Amanda Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AR",
      },
      date: "1 day ago",
      category: "Vandalism",
    },
  ]

  return (
    <div className="space-y-6">
      {issues.map((issue) => (
        <div key={issue.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg hover:bg-gray-50">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">{issue.title}</h3>
              <Badge variant="outline" className="ml-2">
                {issue.category}
              </Badge>
              <span className={`h-2 w-2 rounded-full ${issue.statusColor}`}></span>
              <span className="text-xs text-muted-foreground">{issue.status}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{issue.location}</span>
              <span>{issue.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={issue.reporter.avatar || "/placeholder.svg"} alt={issue.reporter.name} />
                <AvatarFallback>{issue.reporter.initials}</AvatarFallback>
              </Avatar>
              <span className="text-xs hidden md:inline">{issue.reporter.name}</span>
            </div>
            <Button size="sm" variant="ghost" className="text-violet-600 hover:text-violet-700 hover:bg-violet-50">
              <ArrowUpRight className="h-4 w-4" />
              <span className="sr-only">View issue</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
