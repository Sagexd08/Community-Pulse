import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TeamMemberProps {
  image: string
  name: string
  role: string
  bio: string
}

export default function TeamMember({ image, name, role, bio }: TeamMemberProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-teal-600 font-medium">{role}</p>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription className="text-sm">{bio}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-start gap-2 pt-0">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">LinkedIn profile</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Twitter className="h-4 w-4" />
          <span className="sr-only">Twitter profile</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <Github className="h-4 w-4" />
          <span className="sr-only">GitHub profile</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
