"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, MapIcon, Clock, Calendar, Check, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: '',
    message: '',
    callbackRequested: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      callbackRequested: checked
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          subject: '',
          message: '',
          callbackRequested: false
        })
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        })
      } else {
        throw new Error(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <Link href="/contact" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 pb-0.5">
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

      <main className="flex-1 py-20 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">Contact Us</h1>
            <p className="text-lg text-zinc-600 leading-relaxed">Have questions or feedback? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-zinc-600">info@communitypulse.org</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-zinc-600">+1 (555) 123-4567</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapIcon className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold">Address</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-zinc-600">123 Impact Drive, Innovation City</CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg rounded-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <CardTitle className="text-2xl font-bold">Send us a message</CardTitle>
                <CardDescription className="text-emerald-50">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900">Message Sent!</h3>
                    <p className="text-zinc-600 text-center">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-zinc-700 font-medium">First name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          className="rounded-lg border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-zinc-700 font-medium">Last name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          className="rounded-lg border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-zinc-700 font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="rounded-lg border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-zinc-700 font-medium">Phone Number (optional)</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="rounded-lg border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-zinc-700 font-medium">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help you?"
                        className="rounded-lg border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-zinc-700 font-medium">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide as much detail as possible..."
                        rows={5}
                        className="rounded-lg border-zinc-300 focus:border-emerald-500 focus:ring-emerald-500"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="callback"
                        checked={formData.callbackRequested}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="callback" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Request a callback at the phone number provided
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md rounded-lg py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            <div className="rounded-xl overflow-hidden shadow-lg h-[500px] relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 group-hover:opacity-0 transition-opacity duration-300 z-10"></div>
              {/* This would be a map in a real implementation */}
              <div className="w-full h-full flex items-center justify-center bg-emerald-50 relative">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
                <div className="z-10 text-center">
                  <MapIcon className="h-12 w-12 text-emerald-500 mx-auto mb-4 opacity-50" />
                  <p className="text-emerald-800 font-medium">Interactive Map Would Go Here</p>
                </div>

                {/* Map placeholder with grid lines */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-emerald-200/30"></div>
                  ))}
                </div>

                {/* Map marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="h-6 w-6 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30 shadow-lg pulse-animation"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 text-zinc-600">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-emerald-600" />
                </div>
                <span>Monday - Friday: 9am - 5pm</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-zinc-300"></div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-1.5 rounded-full">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                </div>
                <span>Available for appointments</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t py-8 bg-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-500" />
            <span className="text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-transparent bg-clip-text">Community Pulse</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-zinc-600 hover:text-emerald-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-zinc-600 hover:text-emerald-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-zinc-600 hover:text-emerald-500 transition-colors">
              Sitemap
            </Link>
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Community Pulse. All rights reserved.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}