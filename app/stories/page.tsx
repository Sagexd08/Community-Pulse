"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Book, PenTool, Clock } from "lucide-react"
import StoryEditor from "@/components/story-editor"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { createClient } from "@supabase/supabase-js"

export default function StoriesPage() {
  const { toast } = useToast()
  const [stories, setStories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentStory, setCurrentStory] = useState<any>(null)

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Fetch stories on component mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session) {
          const { data, error } = await supabase
            .from('stories')
            .select('*')
            .eq('user_id', session.user.id)
            .order('updated_at', { ascending: false })

          if (error) throw error

          setStories(data || [])
        }
      } catch (error) {
        console.error('Error fetching stories:', error)
        toast({
          title: 'Error',
          description: 'Failed to load stories',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStories()
  }, [])

  // Save or update a story
  const handleSaveStory = async (storyId: string, caption: string, content: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to save stories',
          variant: 'destructive',
        })
        return
      }

      if (storyId) {
        // Update existing story
        const { error } = await supabase
          .from('stories')
          .update({
            title: caption.substring(0, 50),
            content,
            caption,
            updated_at: new Date().toISOString(),
          })
          .eq('id', storyId)
          .eq('user_id', session.user.id)

        if (error) throw error

        // Update local state
        setStories(prev =>
          prev.map(story =>
            story.id === storyId
              ? {
                  ...story,
                  title: caption.substring(0, 50),
                  content,
                  caption,
                  updated_at: new Date().toISOString()
                }
              : story
          )
        )
      } else {
        // Create new story
        const { data, error } = await supabase
          .from('stories')
          .insert({
            user_id: session.user.id,
            title: caption.substring(0, 50),
            content,
            caption,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()

        if (error) throw error

        // Update local state
        if (data && data.length > 0) {
          setStories(prev => [data[0], ...prev])
          setCurrentStory(data[0])
        }
      }
    } catch (error) {
      console.error('Error saving story:', error)
      throw error
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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
            <Link href="/stories" className="text-sm font-medium text-emerald-500 border-b-2 border-emerald-500 pb-0.5">
              Stories
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
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">My Stories</h1>
                <p className="text-zinc-600 mt-1">Create and edit stories with AI-powered suggestions</p>
              </div>
              <Button
                onClick={() => setCurrentStory(null)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <PenTool className="mr-2 h-4 w-4" />
                New Story
              </Button>
            </div>

            {/* Story Editor */}
            <div className="mb-12">
              <StoryEditor
                storyId={currentStory?.id}
                initialCaption={currentStory?.caption || ""}
                initialContent={currentStory?.content || ""}
                onSave={handleSaveStory}
              />
            </div>

            {/* Stories List */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-zinc-900 flex items-center">
                <Book className="mr-2 h-5 w-5 text-emerald-500" />
                Your Stories
              </h2>

              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block p-3 bg-emerald-100 rounded-full mb-4">
                    <Clock className="h-6 w-6 text-emerald-600 animate-pulse" />
                  </div>
                  <p className="text-zinc-600">Loading your stories...</p>
                </div>
              ) : stories.length === 0 ? (
                <Card className="border-dashed border-zinc-300 bg-zinc-50">
                  <CardContent className="text-center py-12">
                    <div className="inline-block p-3 bg-zinc-200 rounded-full mb-4">
                      <Book className="h-6 w-6 text-zinc-500" />
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 mb-2">No stories yet</h3>
                    <p className="text-zinc-600 mb-4">
                      Create your first story using the editor above.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {stories.map((story) => (
                    <Card
                      key={story.id}
                      className={`hover:shadow-md transition-shadow cursor-pointer ${
                        currentStory?.id === story.id ? 'border-emerald-300 bg-emerald-50' : ''
                      }`}
                      onClick={() => setCurrentStory(story)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <CardDescription className="flex items-center text-xs">
                          <Clock className="mr-1 h-3 w-3" />
                          Last updated: {formatDate(story.updated_at)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-zinc-600 line-clamp-2">{story.content}</p>
                      </CardContent>
                      <CardFooter className="text-xs text-zinc-500">
                        Caption: {story.caption}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
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
