import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ArrowRight, Calendar, Users, MapIcon, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Projects | Community Pulse",
  description: "Explore community projects powered by Community Pulse",
}

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Green Spaces Initiative",
      description: "Revitalizing urban parks and creating new green spaces in underserved neighborhoods.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Environment",
      location: "Downtown Metro Area",
      participants: 156,
      startDate: "March 2023",
      status: "Active",
    },
    {
      id: 2,
      title: "Safe Streets Coalition",
      description: "Improving pedestrian safety through infrastructure improvements and traffic calming measures.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Infrastructure",
      location: "Eastside District",
      participants: 89,
      startDate: "January 2023",
      status: "Active",
    },
    {
      id: 3,
      title: "Community Flood Response",
      description: "Coordinating community efforts to address recurring flooding issues in low-lying neighborhoods.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Disaster Response",
      location: "Riverside Community",
      participants: 212,
      startDate: "September 2022",
      status: "Completed",
    },
    {
      id: 4,
      title: "Youth Tech Education",
      description: "Providing technology education and resources to underserved youth in the community.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Education",
      location: "Multiple Locations",
      participants: 78,
      startDate: "June 2023",
      status: "Active",
    },
    {
      id: 5,
      title: "Community Garden Network",
      description: "Creating a network of community gardens to address food insecurity and promote healthy eating.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Food Security",
      location: "Citywide",
      participants: 143,
      startDate: "April 2023",
      status: "Active",
    },
    {
      id: 6,
      title: "Public Transit Advocacy",
      description: "Advocating for improved public transportation options in underserved communities.",
      image: "/placeholder.svg?height=400&width=600",
      category: "Transportation",
      location: "Metropolitan Area",
      participants: 67,
      startDate: "February 2023",
      status: "Planning",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-emerald-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">Community Pulse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/projects" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 pb-0.5">
              Projects
            </Link>
            <Link href="/resources" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Resources
            </Link>
            <Link href="/blog" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Contact
            </Link>
            <Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost" className="hidden md:flex hover:text-emerald-500 hover:bg-emerald-50">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-sm">Sign Up</Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50 to-white py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">Community Projects</h1>
              <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
                Explore the impactful projects powered by Community Pulse technology and driven by passionate community
                members.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md">
                  Start a Project
                </Button>
                <Button variant="outline" className="border-emerald-500 text-emerald-500 hover:bg-emerald-50">
                  Volunteer
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                      <Badge variant={project.status === "Active" ? "default" : "secondary"} 
                        className={project.status === "Active" 
                          ? "bg-emerald-500 hover:bg-emerald-600" 
                          : project.status === "Completed"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-amber-500 hover:bg-amber-600"}>
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-emerald-600 font-medium">{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 mb-6 leading-relaxed">{project.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="bg-emerald-100 p-1.5 rounded-full">
                          <MapIcon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-zinc-600">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-emerald-100 p-1.5 rounded-full">
                          <Calendar className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-zinc-600">{project.startDate}</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <div className="bg-emerald-100 p-1.5 rounded-full">
                          <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-zinc-600">{project.participants} participants</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 group">
                      View Project 
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Ready to Make a Difference?</h2>
              <p className="text-lg mb-10 opacity-90 leading-relaxed">
                Join the growing number of communities using Community Pulse to drive positive change.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100 shadow-lg">
                  Start a Project
                </Button>
                <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100 shadow-lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 text-zinc-300 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold text-white">Community Pulse</span>
              </div>
              <p className="text-sm">Empowering communities through technology and data-driven solutions.</p>
              <div className="flex gap-4 mt-6">
                <Link href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="bg-zinc-800 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/faq" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-emerald-400 transition-colors flex items-center gap-2">
                    <ArrowRight className="h-3 w-3" />
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
              <ul className="space-y-4">
                <li className="text-sm flex items-start gap-3">
                  <svg className="h-5 w-5 mt-0.5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  info@communitypulse.org
                </li>
                <li className="text-sm flex items-start gap-3">
                  <svg className="h-5 w-5 mt-0.5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  +1 (555) 123-4567
                </li>
                <li className="text-sm flex items-start gap-3">
                  <svg className="h-5 w-5 mt-0.5 text-emerald-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  123 Impact Drive, Innovation City
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} Community Pulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}