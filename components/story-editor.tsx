"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Loader2, Save, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface StoryEditorProps {
  storyId?: string
  initialCaption?: string
  initialContent?: string
  onSave?: (storyId: string, caption: string, content: string) => void
}

export default function StoryEditor({ storyId, initialCaption = "", initialContent = "", onSave }: StoryEditorProps) {
  const { toast } = useToast()
  const [caption, setCaption] = useState(initialCaption)
  const [content, setContent] = useState(initialContent)
  const [suggestion, setSuggestion] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Generate a suggestion using the AI
  const generateSuggestion = async () => {
    if (!caption) {
      toast({
        title: "Caption required",
        description: "Please enter a caption to generate suggestions.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setSuggestion("")

    try {
      const response = await fetch("/api/ai/story-continuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caption,
          currentText: content,
          storyId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuggestion(data.continuation)
      } else {
        throw new Error(data.error || "Failed to generate suggestion")
      }
    } catch (error) {
      console.error("Error generating suggestion:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate suggestion",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Apply the suggestion to the content
  const applySuggestion = () => {
    if (!suggestion) return
    
    setContent((prev) => {
      // Add a space if the content doesn't end with one
      const spacer = prev.endsWith(" ") ? "" : " "
      return prev + spacer + suggestion
    })
    
    setSuggestion("")
    
    // Focus the textarea and move cursor to the end
    if (textareaRef.current) {
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
  }

  // Save the story
  const saveStory = async () => {
    if (!caption) {
      toast({
        title: "Caption required",
        description: "Please enter a caption for your story.",
        variant: "destructive",
      })
      return
    }

    if (!content) {
      toast({
        title: "Content required",
        description: "Please write some content for your story.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      if (onSave) {
        await onSave(storyId || "", caption, content)
      }

      toast({
        title: "Story saved",
        description: "Your story has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving story:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save story",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Story Editor</CardTitle>
          <CardDescription>
            Write a story based on a caption. Get AI-powered suggestions to help you continue your story.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="caption" className="text-sm font-medium">
              Caption / Prompt
            </label>
            <Input
              id="caption"
              placeholder="Enter a caption or prompt for your story..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Story Content
            </label>
            <Textarea
              ref={textareaRef}
              id="content"
              placeholder="Start writing your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={generateSuggestion} disabled={isGenerating || !caption}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Get Suggestion
              </>
            )}
          </Button>
          <Button onClick={saveStory} disabled={isSaving || !caption || !content}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Story
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {suggestion && (
        <Card className="border-dashed border-emerald-300 bg-emerald-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-emerald-600" />
              AI Suggestion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-700">{suggestion}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" onClick={() => setSuggestion("")}>
              Dismiss
            </Button>
            <Button size="sm" onClick={applySuggestion} className="bg-emerald-600 hover:bg-emerald-700">
              <RefreshCw className="mr-2 h-4 w-4" />
              Apply Suggestion
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
