import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, User, ArrowRight, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Blog | Community Pulse",
  description: "Latest news, stories, and updates from Community Pulse",
}

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: "How Community Data is Transforming Urban Planning",
    excerpt:
      "Discover how community-generated data is helping city planners make more informed decisions and create more equitable urban spaces.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "June 15, 2023",
    author: "Alex Rivera",
    authorRole: "Founder & CEO",
    category: "Urban Planning",
    readTime: "8 min read",
  }

  const posts = [
    {
      id: 2,
      title: "5 Ways to Increase Community Engagement in Your Neighborhood",
      excerpt:
        "Practical strategies to boost participation and create a more connected community through digital tools.",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 8, 2023",
      author: "Priya Sharma",
      category: "Community Building",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Success Story: How Riverside Community Tackled Recurring Flooding",
      excerpt:
        "A case study on how one community used data and collaboration to address a persistent environmental challenge.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 27, 2023",
      author: "Marcus Johnson",
      category: "Success Stories",
      readTime: "10 min read",
    },
    {
      id: 4,
      title: "The Future of AI in Community Problem Solving",
      excerpt:
        "Exploring how artificial intelligence is evolving to better serve community needs and facilitate local solutions.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 15, 2023",
      author: "Sofia Chen",
      category: "Technology",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Building Inclusive Digital Platforms for All Community Members",
      excerpt:
        "Strategies for ensuring that digital community tools are accessible and usable by everyone, regardless of technical ability.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 3, 2023",
      author: "David Thompson",
      category: "Accessibility",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "How to Measure the Real Impact of Community Initiatives",
      excerpt: "A framework for evaluating the effectiveness and outcomes of community improvement projects.",
      image: "/placeholder.svg?height=400&width=600",
      date: "April 22, 2023",
      author: "Amanda Rodriguez",
      category: "Impact Assessment",
      readTime: "9 min read",
    },
  ]

  const categories = [
    "All Categories",
    "Urban Planning",
    "Community Building",
    "Success Stories",
    "Technology",
    "Accessibility",
    "Impact Assessment",
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
            <Link href="/resources" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Resources
            </Link>
            <Link href="/blog" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 pb-0.5">
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
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">Community Pulse Blog</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Stories, insights, and updates from communities using technology to drive positive change.
              </p>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 rounded-lg overflow-hidden">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover aspect-[16/9]"
                />
              </div>
              <div className="lg:col-span-2 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-teal-600">{featuredPost.category}</Badge>
                <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-teal-600" />
                    <span className="text-sm">
                      {featuredPost.author}, {featuredPost.authorRole}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-teal-600" />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                </div>
                <Button className="w-fit bg-teal-600 hover:bg-teal-700">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-gray-50">
          <div className="container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  className={index === 0 ? "bg-teal-600 hover:bg-teal-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline" className="text-teal-600 border-teal-600">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{post.excerpt}</CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-teal-600" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-teal-600" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-teal-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
              <p className="text-lg mb-8">
                Get the latest articles, community stories, and updates delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md border border-white bg-transparent text-white placeholder-white placeholder-opacity-75 flex-1"
                />
                <Button variant="secondary">Subscribe</Button>
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
