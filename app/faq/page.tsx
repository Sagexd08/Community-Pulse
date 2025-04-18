"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Search, Menu, X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

export default function FAQPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is Community Pulse?",
          answer:
            "Community Pulse is a platform that uses AI and geospatial technology to help underrepresented communities report and resolve local issues like flooding, trash, and broken infrastructure. Our goal is to empower communities through technology and data-driven solutions.",
        },
        {
          question: "How does Community Pulse work?",
          answer:
            "Community members can report issues through our platform using photos, text, or voice recordings. Our AI system analyzes these reports, categorizes issues, and helps local authorities prioritize and address them efficiently. The platform also provides analytics and visualizations to track progress and impact.",
        },
        {
          question: "Is Community Pulse available in my area?",
          answer:
            "Community Pulse is currently available in select cities across North America, with plans to expand globally. Please contact us or check our coverage map to see if your community is currently supported.",
        },
      ],
    },
    {
      category: "Account & Registration",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Sign Up' button at the top of the page. You'll need to provide your name, email address, and create a password. You can also sign up using your Google or Facebook account for faster registration.",
        },
        {
          question: "Is Community Pulse free to use?",
          answer:
            "Yes, Community Pulse is free for individual community members. We offer premium features for community organizations and local governments that require advanced analytics and management tools.",
        },
        {
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account at any time through your account settings. Please note that while your personal information will be removed, anonymized data about reported issues may be retained to maintain community records.",
        },
      ],
    },
    {
      category: "Reporting Issues",
      questions: [
        {
          question: "How do I report an issue in my community?",
          answer:
            "After signing in, you can report an issue by clicking the 'Submit an Issue' button on the dashboard. You can upload photos, provide a description, and mark the location on the map. You can also record a voice description if you prefer.",
        },
        {
          question: "What types of issues can I report?",
          answer:
            "You can report a wide range of community issues including infrastructure problems (potholes, broken streetlights), environmental concerns (flooding, trash accumulation), safety hazards, and more. If you're unsure if an issue is appropriate for reporting, you can always contact our support team.",
        },
        {
          question: "Can I report issues anonymously?",
          answer:
            "Yes, you can choose to report issues anonymously. However, creating an account allows you to track the status of your reports and receive updates when they're addressed.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What devices and browsers are supported?",
          answer:
            "Community Pulse works on most modern devices including smartphones, tablets, and computers. We support the latest versions of Chrome, Firefox, Safari, and Edge browsers. Our mobile app is available for both iOS and Android devices.",
        },
        {
          question: "How do I update the mobile app?",
          answer:
            "The mobile app can be updated through your device's app store (Google Play Store for Android or Apple App Store for iOS). We recommend enabling automatic updates to ensure you always have the latest features and security improvements.",
        },
        {
          question: "What should I do if I encounter a technical issue?",
          answer:
            "If you encounter any technical issues, please contact our support team through the 'Help' section in the app or website. You can also email support@communitypulse.org with details about the issue you're experiencing.",
        },
      ],
    },
  ]

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery.trim().length > 0
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(q => 
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">Community Pulse</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop navigation */}
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
            <Link href="/faq" className="text-sm font-medium text-emerald-500 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500 after:rounded">
              FAQ
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Link href="/signin">
              <Button variant="outline" className="rounded-full px-5">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-5">Sign Up</Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden p-4 bg-white border-t animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-4">
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
              <Link href="/faq" className="text-sm font-medium text-emerald-500">
                FAQ
              </Link>
              <div className="flex flex-col pt-4 space-y-2">
                <Link href="/signin">
                  <Button variant="outline" className="w-full justify-center">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-teal-600 hover:bg-teal-700 w-full justify-center">Sign Up</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">Frequently Asked Questions</h1>
              <p className="text-lg text-zinc-600 mb-10">
                Find answers to common questions about Community Pulse and how it works.
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-sm"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {searchQuery && filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl font-medium text-gray-700 mb-4">No results found</p>
                  <p className="text-gray-500">Try a different search term or browse all categories below.</p>
                  <Button 
                    onClick={() => setSearchQuery("")}
                    variant="outline" 
                    className="mt-6"
                  >
                    Clear search
                  </Button>
                </div>
              ) : (
                filteredFAQs.map((category, index) => (
                  <div key={index} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                      <span className="inline-block w-1 h-6 bg-gradient-to-b from-teal-400 to-emerald-500 mr-3 rounded"></span>
                      {category.category}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((item, qIndex) => (
                        <AccordionItem 
                          key={qIndex} 
                          value={`item-${index}-${qIndex}`}
                          className="border border-gray-100 rounded-lg mb-3 overflow-hidden bg-white shadow-sm hover:shadow transition-shadow"
                        >
                          <AccordionTrigger className="text-left font-medium px-5">{item.question}</AccordionTrigger>
                          <AccordionContent className="text-zinc-600 px-5 bg-gray-50">{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              )}
            </div>

            <div className="max-w-3xl mx-auto mt-16 text-center">
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-zinc-600 mb-8">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-6">Contact Support</Button>
                  <Link href="/resources">
                    <Button variant="outline" className="rounded-full px-6">Browse Resources</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-6 w-6 text-teal-400" />
                <span className="text-xl font-bold text-white">Community Pulse</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">Empowering communities through technology and data-driven solutions.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/faq" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Community Forum
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-400 hover:text-teal-400 transition-colors inline-flex items-center">
                    <span className="h-1 w-1 rounded-full bg-teal-400 mr-2"></span>
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <ul className="space-y-3">
                <li className="text-sm text-gray-400 flex items-start">
                  <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@communitypulse.org</span>
                </li>
                <li className="text-sm text-gray-400 flex items-start">
                  <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="text-sm text-gray-400 flex items-start">
                  <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Impact Drive, Innovation City</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Community Pulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}