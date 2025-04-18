import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Download, FileText, Video, BookOpen, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Resources | Community Pulse",
  description: "Resources and tools for community engagement",
}

export default function ResourcesPage() {
  const guides = [
    {
      id: 1,
      title: "Getting Started with Community Pulse",
      description: "A comprehensive guide to setting up and using the Community Pulse platform.",
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      type: "PDF",
      size: "2.4 MB",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Community Engagement Best Practices",
      description: "Learn effective strategies for engaging your community and driving participation.",
      icon: <BookOpen className="h-8 w-8 text-teal-600" />,
      type: "PDF",
      size: "1.8 MB",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Data Collection Guidelines",
      description: "Best practices for collecting and managing community data responsibly.",
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      type: "PDF",
      size: "1.2 MB",
      downloadUrl: "#",
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Platform Overview",
      description: "A quick tour of the Community Pulse platform and its key features.",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "5:32",
      url: "#",
    },
    {
      id: 2,
      title: "Setting Up Your First Project",
      description: "Step-by-step guide to creating and configuring your first community project.",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "8:47",
      url: "#",
    },
    {
      id: 3,
      title: "Analyzing Community Data",
      description: "Learn how to use the analytics tools to gain insights from community data.",
      thumbnail: "/placeholder.svg?height=200&width=350",
      duration: "12:15",
      url: "#",
    },
  ]

  const templates = [
    {
      id: 1,
      title: "Community Survey Template",
      description: "Ready-to-use survey template for gathering community feedback.",
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      type: "DOCX",
      size: "0.8 MB",
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Project Planning Worksheet",
      description: "Structured worksheet for planning community improvement projects.",
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      type: "XLSX",
      size: "1.1 MB",
      downloadUrl: "#",
    },
    {
      id: 3,
      title: "Community Meeting Agenda",
      description: "Template for organizing effective community meetings and workshops.",
      icon: <FileText className="h-8 w-8 text-teal-600" />,
      type: "DOCX",
      size: "0.6 MB",
      downloadUrl: "#",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">Community Pulse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Dashboard
            </Link>
            <Link href="/projects" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Projects
            </Link>
            <Link href="/resources" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 pb-0.5">
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
              <Button variant="outline" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-50 to-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">Community Resources</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Access guides, templates, and tools to help you make the most of Community Pulse and drive positive
                change in your neighborhood.
              </p>
            </div>
          </div>
        </section>

        {/* Resources Tabs */}
        <section className="py-16 bg-white">
          <div className="container">
            <Tabs defaultValue="guides" className="space-y-8">
              <TabsList className="mx-auto flex justify-center">
                <TabsTrigger value="guides">Guides & Documentation</TabsTrigger>
                <TabsTrigger value="videos">Tutorial Videos</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="guides" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {guides.map((guide) => (
                    <Card key={guide.id} className="transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-4">{guide.icon}</div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <Badge variant="outline">{guide.type}</Badge>
                          <span>{guide.size}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="videos" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video) => (
                    <Card key={video.id} className="transition-all duration-300 hover:shadow-lg overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-teal-600 rounded-full p-3 bg-opacity-90">
                            <Video className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="ghost" className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                          Watch Video <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {templates.map((template) => (
                    <Card key={template.id} className="transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-4">{template.icon}</div>
                        <CardTitle className="text-xl">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <Badge variant="outline">{template.type}</Badge>
                          <span>{template.size}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-teal-600 hover:bg-teal-700">
                          <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-teal-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to our newsletter to receive the latest resources, updates, and community stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md border border-gray-300 flex-1"
                />
                <Button className="bg-teal-600 hover:bg-teal-700">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-6 w-6 text-teal-500" />
                <span className="text-xl font-bold text-white">Community Pulse</span>
              </div>
              <p className="text-sm">Empowering communities through technology and data-driven solutions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:text-teal-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-sm hover:text-teal-500 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-sm hover:text-teal-500 transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm hover:text-teal-500 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-sm hover:text-teal-500 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-teal-500 transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-teal-500 transition-colors">
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-teal-500 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-2">
                <li className="text-sm">info@communitypulse.org</li>
                <li className="text-sm">+1 (555) 123-4567</li>
                <li className="text-sm">123 Impact Drive, Innovation City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} Community Pulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
