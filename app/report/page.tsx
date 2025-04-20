"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Image, FileAudio, MessageSquare, Loader2, Check, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import FileUpload from "@/components/file-upload"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function ReportIssuePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("text")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "infrastructure",
    imageUrl: "",
    audioUrl: "",
  })

  // Initialize Supabase client
  const supabase = createClientSupabaseClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }))
  }

  const handleImageUpload = (fileUrl: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: fileUrl
    }))
  }

  const handleAudioUpload = (fileUrl: string) => {
    setFormData(prev => ({
      ...prev,
      audioUrl: fileUrl
    }))
  }

  const analyzeIssue = async (issueId: string) => {
    setIsAnalyzing(true)
    
    try {
      // Analyze sentiment if we have a description
      if (formData.description) {
        await fetch("/api/ai/analyze-sentiment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: formData.description,
            issueId,
          }),
        })
      }
      
      // Classify image if we have one
      if (formData.imageUrl) {
        await fetch("/api/ai/classify-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: formData.imageUrl,
            issueId,
          }),
        })
      }
      
      // Get the analysis results
      const { data, error } = await supabase
        .from("ai_analysis")
        .select("*")
        .eq("issue_id", issueId)
        .single()
      
      if (error) throw error
      
      setAnalysisResult(data)
    } catch (error) {
      console.error("Error analyzing issue:", error)
      toast({
        title: "Analysis Error",
        description: "There was an error analyzing your issue. The report was still submitted successfully.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to report an issue",
          variant: "destructive",
        })
        return
      }
      
      // Create the issue
      const { data, error } = await supabase
        .from("issues")
        .insert({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          category: formData.category,
          status: "new",
          priority: "medium",
          user_id: session.user.id,
          image_url: formData.imageUrl || null,
          audio_url: formData.audioUrl || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()
      
      if (error) throw error
      
      // Analyze the issue with AI
      await analyzeIssue(data.id)
      
      setIsSuccess(true)
      toast({
        title: "Issue reported successfully",
        description: "Thank you for your contribution to the community!",
      })
    } catch (error) {
      console.error("Error submitting issue:", error)
      toast({
        title: "Error",
        description: "Failed to submit your issue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      category: "infrastructure",
      imageUrl: "",
      audioUrl: "",
    })
    setIsSuccess(false)
    setAnalysisResult(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-emerald-500" />
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
            <Link href="/report" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 pb-0.5">
              Report Issue
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="outline" className="hidden md:flex">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">Report a Community Issue</h1>
              <p className="text-zinc-600">
                Help improve your community by reporting issues. We use AI to analyze and prioritize reports.
              </p>
            </div>

            {isSuccess ? (
              <Card className="border-emerald-300">
                <CardHeader className="bg-emerald-50">
                  <div className="flex items-center space-x-2">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <Check className="h-6 w-6 text-emerald-600" />
                    </div>
                    <CardTitle>Issue Reported Successfully</CardTitle>
                  </div>
                  <CardDescription>
                    Thank you for contributing to your community!
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
                      <p className="text-zinc-600">Analyzing your report with AI...</p>
                    </div>
                  ) : analysisResult ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">AI Analysis Results</h3>
                      
                      {analysisResult.classification_result && (
                        <div className="bg-zinc-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-zinc-700 mb-2">Image Classification</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-emerald-600 font-medium">
                              {analysisResult.classification_result.category.replace('_', ' ')}
                            </span>
                            <span className="text-xs text-zinc-500">
                              (Confidence: {Math.round(analysisResult.classification_result.confidence * 100)}%)
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {analysisResult.sentiment_score !== undefined && (
                        <div className="bg-zinc-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-zinc-700 mb-2">Sentiment Analysis</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${
                              analysisResult.sentiment_score < -0.3 ? 'text-red-600' : 
                              analysisResult.sentiment_score > 0.3 ? 'text-emerald-600' : 
                              'text-amber-600'
                            }`}>
                              {analysisResult.sentiment_score < -0.3 ? 'Negative' : 
                               analysisResult.sentiment_score > 0.3 ? 'Positive' : 
                               'Neutral'}
                            </span>
                            <span className="text-xs text-zinc-500">
                              (Score: {analysisResult.sentiment_score.toFixed(2)})
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {analysisResult.suggestions && (
                        <div className="bg-zinc-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-zinc-700 mb-2">AI Suggestions</h4>
                          <div className="text-sm text-zinc-600 whitespace-pre-line">
                            {analysisResult.suggestions}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-4 space-x-2 text-zinc-600">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <p>AI analysis not available</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end space-x-4 bg-zinc-50">
                  <Button onClick={resetForm}>
                    Report Another Issue
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">
                      View All Issues
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Issue Details</CardTitle>
                  <CardDescription>
                    Provide information about the issue you're reporting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Issue Title</Label>
                      <Input
                        id="title"
                        placeholder="Brief title describing the issue"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="safety">Safety</SelectItem>
                          <SelectItem value="public_services">Public Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Address or description of the location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Issue Details</Label>
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-3 mb-4">
                          <TabsTrigger value="text" className="flex items-center">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Text
                          </TabsTrigger>
                          <TabsTrigger value="image" className="flex items-center">
                            <Image className="mr-2 h-4 w-4" />
                            Image
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="flex items-center">
                            <FileAudio className="mr-2 h-4 w-4" />
                            Audio
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="text" className="space-y-4">
                          <Textarea
                            id="description"
                            placeholder="Describe the issue in detail..."
                            rows={5}
                            value={formData.description}
                            onChange={handleChange}
                            required={activeTab === "text"}
                          />
                        </TabsContent>
                        
                        <TabsContent value="image" className="space-y-4">
                          <FileUpload
                            acceptedFileTypes="image/*"
                            maxFiles={1}
                            maxSize={5 * 1024 * 1024}
                            uploadUrl="/api/upload/image"
                            onUploadComplete={handleImageUpload}
                            userId="temp-user-id" // In a real app, this would be the actual user ID
                            uploadType="image"
                          />
                          <div className="text-sm text-zinc-500">
                            Upload an image of the issue to help us understand the problem better.
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="audio" className="space-y-4">
                          <FileUpload
                            acceptedFileTypes="audio/*"
                            maxFiles={1}
                            maxSize={10 * 1024 * 1024}
                            uploadUrl="/api/upload/audio"
                            onUploadComplete={handleAudioUpload}
                            userId="temp-user-id" // In a real app, this would be the actual user ID
                            uploadType="audio"
                          />
                          <div className="text-sm text-zinc-500">
                            Record and upload an audio description of the issue.
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={isSubmitting || (!formData.description && !formData.imageUrl && !formData.audioUrl)}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Report"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
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
