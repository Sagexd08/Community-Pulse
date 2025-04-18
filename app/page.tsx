"use client"

import Link from "next/link"
import { ArrowRight, MapPin, BarChart3, MessageSquare, Brain, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import MapVisualization from "@/components/map-visualization"
import FeatureCard from "@/components/feature-card"
import TeamMember from "@/components/team-member"
import TechStack from "@/components/tech-stack"
import DemoWorkflow from "@/components/demo-workflow"
import { useState } from "react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/30">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-indigo-600" />
            <span className="text-xl font-bold">Community Pulse</span>
          </div>
          
          {/* Desktop Navigation */}
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
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
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <div className="container py-4 space-y-4">
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
              <div className="flex gap-4 pt-2">
                <Link href="/signin" className="flex-1">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-white py-24 md:py-32">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              <div className="space-y-6 md:col-span-5">
                <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-2">
                  Community-Driven Technology
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
                  Empowering Communities Through Data
                </h1>
                <p className="text-lg md:text-xl text-zinc-600">
                  Community Pulse uses AI and geospatial technology to help underrepresented communities report and
                  resolve local issues effectively.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Submit an Issue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl md:col-span-7 border border-zinc-200/50">
                <MapVisualization />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5 bg-cover bg-center"></div>
        </section>

        {/* Concept Overview */}
        <section id="concept" className="py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
                Our Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">Concept Overview</h2>
              <p className="text-lg text-zinc-600">
                Community Pulse bridges the gap between technology and community needs, creating a platform where
                residents can easily report issues and see real impact in their neighborhoods.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 order-2 md:order-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="font-bold text-indigo-600">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900">Democratizing Community Engagement</h3>
                  </div>
                  <p className="text-zinc-600 pl-14">
                    Our platform removes barriers to civic participation by offering multiple ways to report issues -
                    through images, text, or voice - making it accessible to everyone regardless of technical ability.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="font-bold text-indigo-600">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900">Data-Driven Decision Making</h3>
                  </div>
                  <p className="text-zinc-600 pl-14">
                    By combining AI analysis with community input, we help local authorities prioritize resources based on
                    actual community needs and sentiment.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="font-bold text-indigo-600">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900">Building Community Resilience</h3>
                  </div>
                  <p className="text-zinc-600 pl-14">
                    Community Pulse fosters collaboration between residents and local government, creating stronger, more
                    responsive communities.
                  </p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[500px] order-1 md:order-2 border border-zinc-200/50">
                <img
                  src="/placeholder.svg?height=1000&width=800"
                  alt="Community members using the Community Pulse app"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-zinc-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
                Capabilities
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">Key Features</h2>
              <p className="text-lg text-zinc-600">
                Our platform combines cutting-edge technology with user-friendly design to create a powerful tool for
                community action.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900">Multimodal Issue Reporting</h3>
                <p className="text-zinc-600">
                  Report community issues using images, text, or voice recordings, making the platform accessible to everyone.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900">AI-Generated Impact Reports</h3>
                <p className="text-zinc-600">
                  Automatically generate comprehensive reports that visualize community issues and track resolution progress.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
                  <Brain className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900">Predictive Prioritization</h3>
                <p className="text-zinc-600">
                  AI analyzes sentiment and demographic data to help authorities prioritize critical community needs.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-zinc-900">Geospatial Community Hub</h3>
                <p className="text-zinc-600">
                  Interactive maps show reported issues, resolution status, and community impact in real-time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
                Technologies
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">Our Technology Stack</h2>
              <p className="text-lg text-zinc-600">
                Community Pulse leverages cutting-edge technologies to deliver a seamless, powerful platform.
              </p>
            </div>
            <TechStack />
          </div>
        </section>

        {/* Team Info */}
        <section id="team" className="py-24 bg-zinc-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
                Our People
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">Meet The Team</h2>
              <p className="text-lg text-zinc-600">
                Meet the passionate individuals behind Community Pulse who are dedicated to creating positive social
                impact.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="aspect-square rounded-xl overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Alex Rivera"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Alex Rivera</h3>
                <p className="text-indigo-600 font-medium mb-3">Founder & CEO</p>
                <p className="text-zinc-600 text-sm">
                  Former urban planner with 10+ years experience in community development.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="aspect-square rounded-xl overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Priya Sharma" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Priya Sharma</h3>
                <p className="text-indigo-600 font-medium mb-3">AI Research Lead</p>
                <p className="text-zinc-600 text-sm">
                  PhD in Machine Learning with focus on NLP and computer vision applications.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="aspect-square rounded-xl overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Marcus Johnson"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Marcus Johnson</h3>
                <p className="text-indigo-600 font-medium mb-3">Community Engagement</p>
                <p className="text-zinc-600 text-sm">
                  Community organizer with deep connections in underrepresented neighborhoods.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/50 transition-all hover:shadow-md hover:border-indigo-200">
                <div className="aspect-square rounded-xl overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Sofia Chen"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-zinc-900">Sofia Chen</h3>
                <p className="text-indigo-600 font-medium mb-3">GIS Specialist</p>
                <p className="text-zinc-600 text-sm">
                  Expert in geospatial analysis and visualization with 8+ years experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Workflow */}
        <section id="demo" className="py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium text-sm mb-4">
                Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900">How It Works</h2>
              <p className="text-lg text-zinc-600">
                See how Community Pulse transforms community reporting into actionable insights.
              </p>
            </div>
            <DemoWorkflow />
            <div className="mt-16 text-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Try the Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-teal-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Empower Your Community?</h2>
              <p className="text-lg mb-8 text-indigo-100">
                Join the growing number of communities using Community Pulse to drive positive change.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50">
                  Submit an Issue
                </Button>
                <Button size="lg" className="bg-indigo-500 text-white border border-indigo-400 hover:bg-indigo-400">
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-900 text-zinc-400 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-6 w-6 text-indigo-400" />
                <span className="text-xl font-bold text-white">Community Pulse</span>
              </div>
              <p className="text-sm">Empowering communities through technology and data-driven solutions.</p>
              <div className="flex gap-4 mt-6">
                <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#concept" className="text-sm hover:text-indigo-400 transition-colors">
                    Our Concept
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-sm hover:text-indigo-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-sm hover:text-indigo-400 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-sm hover:text-indigo-400 transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/blog" className="text-sm hover:text-indigo-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm hover:text-indigo-400 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-indigo-400 transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-indigo-400 transition-colors">
                    Support Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@communitypulse.org
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  123 Impact Drive, Innovation City
                </li>
              </ul>
              <div className="mt-6">
                <Button variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700 hover:text-white">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-12 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} Community Pulse. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="/privacy" className="text-xs hover:text-indigo-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs hover:text-indigo-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-xs hover:text-indigo-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}