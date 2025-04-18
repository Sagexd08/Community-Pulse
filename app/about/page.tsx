"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight, Mail, Phone, MapPinned } from "lucide-react"
import { useState, useEffect } from "react"

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-violet-600" />
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
            <Link href="/blog" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-emerald-500 transition-colors">
              Contact
            </Link>
            <Link href="/about" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 pb-0.5">
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
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-violet-100 via-indigo-50 to-white">
          <div className="absolute inset-0 bg-[length:20px_20px] [background-image:linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [opacity:0.2]"></div>
          <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-violet-400/30 to-fuchsia-300/30 blur-3xl"></div>
          </div>
          <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-blue-400/30 to-emerald-300/30 blur-3xl"></div>
          </div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">
                About Community Pulse
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Our mission is to empower underrepresented communities through technology, giving them a voice in shaping their neighborhoods and improving their quality of life.
              </p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white relative">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="opacity-100 transform-none transition-all duration-700">
                <div className="inline-block mb-8">
                  <span className="px-3 py-1 text-xs font-semibold tracking-wide text-violet-800 uppercase bg-violet-100 rounded-full">Our Journey</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">Our Story</h2>
                <div className="space-y-6 text-gray-600">
                  <p className="leading-relaxed">
                    Community Pulse began in 2022 when our founder, Alex Rivera, witnessed how technological barriers prevented many communities from effectively communicating their needs to local authorities.
                  </p>
                  <p className="leading-relaxed">
                    As a former urban planner, Alex understood that the most effective community improvements come from listening directly to residents. However, traditional reporting methods often excluded those without technical knowledge or access.
                  </p>
                  <p className="leading-relaxed">
                    With a team of passionate technologists, community organizers, and AI specialists, Community Pulse was born—creating a platform that makes community engagement accessible to everyone, regardless of technical ability or background.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent mix-blend-overlay z-10"></div>
                  <img
                    src="/placeholder.svg?height=800&width=600"
                    alt="Community Pulse team working with community members"
                    className="object-cover w-full h-[500px]"
                    style={{
                      transform: `translateY(${scrollY * 0.03}px)`,
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-violet-100 rounded-full z-0"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-50 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-white to-violet-50 relative">
          <div className="absolute inset-0 bg-[length:30px_30px] [background-image:linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] [opacity:0.1]"></div>
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 text-xs font-semibold tracking-wide text-violet-800 uppercase bg-violet-100 rounded-full">Guiding Principles</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-lg text-gray-600">These core principles guide everything we do at Community Pulse.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Inclusivity",
                  description: "We design our platform to be accessible to everyone, regardless of technical ability, language, or background.",
                  color: "from-violet-500 to-purple-600",
                },
                {
                  title: "Transparency",
                  description: "We believe in open communication about how data is used and how decisions are made within communities.",
                  color: "from-indigo-500 to-blue-600",
                },
                {
                  title: "Empowerment",
                  description: "We create tools that give communities the power to advocate for themselves and drive meaningful change.",
                  color: "from-fuchsia-500 to-pink-600",
                },
              ].map((value, index) => (
                <div key={index} className="relative group">
                  <div className="bg-white rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-lg mb-6 bg-gradient-to-br flex items-center justify-center text-white p-2">
                      <div className={`w-full h-full rounded bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                        {index === 0 && <div className="w-4 h-4 rounded-full bg-white/80"></div>}
                        {index === 1 && <div className="w-5 h-3 rounded-sm bg-white/80"></div>}
                        {index === 2 && <div className="w-2 h-4 rounded-sm bg-white/80 mx-1"></div>}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 text-xs font-semibold tracking-wide text-violet-800 uppercase bg-violet-100 rounded-full">Meet The Team</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Leadership Team</h2>
              <p className="text-lg text-gray-600">Meet the passionate individuals driving Community Pulse forward.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Rivera",
                  role: "Founder & CEO",
                  bio: "Former urban planner with 10+ years experience in community development.",
                },
                {
                  name: "Priya Sharma",
                  role: "AI Research Lead",
                  bio: "PhD in Machine Learning with focus on NLP and computer vision applications.",
                },
                {
                  name: "Marcus Johnson",
                  role: "Community Engagement",
                  bio: "Community organizer with deep connections in underrepresented neighborhoods.",
                },
                {
                  name: "Sofia Chen",
                  role: "GIS Specialist",
                  bio: "Expert in geospatial analysis and visualization with 8+ years experience.",
                },
              ].map((member, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-square overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-6">
                        <div>
                          <p className="text-white text-sm">{member.bio}</p>
                        </div>
                      </div>
                      <img
                        src="/placeholder.svg?height=300&width=300"
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                      <p className="text-violet-600 font-medium mb-2">{member.role}</p>
                      <div className="flex space-x-3 pt-3">
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br bg-teal-600"></div>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-violet-500/20 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-500/20 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Join Our Mission</h2>
              <p className="text-lg md:text-xl mb-10 text-violet-100">Be part of the movement to empower communities through technology.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-violet-800 hover:bg-gray-100 shadow-lg text-base px-8 py-6">
                  Join Community Pulse
                </Button>
                <Button size="lg" variant="secondary" className="bg-white text-violet-800 hover:bg-gray-100 shadow-lg text-base px-8 py-6">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Community Pulse</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">Empowering communities through technology and data-driven solutions that create lasting positive impact.</p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-violet-600 flex items-center justify-center transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-violet-600 flex items-center justify-center transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-violet-600 flex items-center justify-center transition-colors">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                </a>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/signin" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-6 text-white">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-violet-400 transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-3 text-violet-400" />
                  <span>info@communitypulse.org</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-3 text-violet-400" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPinned className="h-5 w-5 mr-3 text-violet-400" />
                  <span>123 Impact Drive, Innovation City</span>
                </li>
              </ul>
              <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                <h4 className="text-white text-sm font-medium mb-2">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-gray-700 border-0 text-white text-sm rounded-l-md p-2 focus:ring-2 focus:ring-violet-500 focus:outline-none"
                  />
                  <button className="bg-violet-600 hover:bg-violet-700 text-white rounded-r-md px-4 text-sm font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Community Pulse. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-500 hover:text-violet-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-violet-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:text-violet-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}