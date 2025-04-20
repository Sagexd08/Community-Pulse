"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X, Check, Image, FileAudio, Loader2 } from "lucide-react"

interface FileUploadProps {
  acceptedFileTypes?: string
  maxFiles?: number
  maxSize?: number
  uploadUrl: string
  onUploadComplete?: (fileUrl: string) => void
  userId?: string
  issueId?: string
  uploadType?: "image" | "audio"
}

export default function FileUpload({
  acceptedFileTypes = "image/*",
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB
  uploadUrl,
  onUploadComplete,
  userId,
  issueId,
  uploadType = "image"
}: FileUploadProps) {
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Reset state
    setUploadedFileUrl(null)
    setUploadProgress(0)
    
    // Filter files by type and size
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = file.type.match(acceptedFileTypes)
      const isValidSize = file.size <= maxSize
      
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `File "${file.name}" is not a valid ${uploadType} file.`,
          variant: "destructive",
        })
      }
      
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `File "${file.name}" exceeds the maximum size of ${maxSize / (1024 * 1024)}MB.`,
          variant: "destructive",
        })
      }
      
      return isValidType && isValidSize
    })
    
    if (validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload ${maxFiles} file${maxFiles > 1 ? 's' : ''} at a time.`,
        variant: "destructive",
      })
      setFiles(validFiles.slice(0, maxFiles))
    } else {
      setFiles(validFiles)
    }
  }, [acceptedFileTypes, maxFiles, maxSize, toast, uploadType])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? { [acceptedFileTypes]: [] } : undefined,
    maxFiles,
    maxSize,
  })

  const uploadFiles = async () => {
    if (files.length === 0) return
    
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload files.",
        variant: "destructive",
      })
      return
    }
    
    setUploading(true)
    setUploadProgress(0)
    
    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", files[0])
      formData.append("userId", userId)
      
      if (issueId) {
        formData.append("issueId", issueId)
      }
      
      // Simulate progress (in a real app, you'd use XMLHttpRequest with progress events)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + Math.random() * 15
          return newProgress > 90 ? 90 : newProgress
        })
      }, 300)
      
      // Upload file
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      })
      
      clearInterval(progressInterval)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }
      
      const data = await response.json()
      setUploadProgress(100)
      setUploadedFileUrl(data.fileUrl)
      
      if (onUploadComplete) {
        onUploadComplete(data.fileUrl)
      }
      
      toast({
        title: "Upload complete",
        description: `Your ${uploadType} has been uploaded successfully.`,
      })
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const clearFiles = () => {
    setFiles([])
    setUploadProgress(0)
    setUploadedFileUrl(null)
  }

  return (
    <div className="space-y-4">
      {!uploadedFileUrl && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-emerald-400 bg-emerald-50"
              : "border-zinc-300 hover:border-emerald-300 hover:bg-emerald-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2">
            {uploadType === "image" ? (
              <Image className="h-10 w-10 text-zinc-400" />
            ) : (
              <FileAudio className="h-10 w-10 text-zinc-400" />
            )}
            {isDragActive ? (
              <p className="text-emerald-600 font-medium">Drop the files here...</p>
            ) : (
              <div className="space-y-1">
                <p className="text-zinc-600">
                  Drag & drop your {uploadType} here, or click to select
                </p>
                <p className="text-xs text-zinc-400">
                  {uploadType === "image" ? "PNG, JPG, GIF" : "MP3, WAV, M4A"} up to {maxSize / (1024 * 1024)}MB
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {files.length > 0 && !uploadedFileUrl && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {uploadType === "image" ? (
                      <Image className="h-5 w-5 text-zinc-500" />
                    ) : (
                      <FileAudio className="h-5 w-5 text-zinc-500" />
                    )}
                    <div className="text-sm">
                      <p className="font-medium text-zinc-700 truncate max-w-[200px]">{file.name}</p>
                      <p className="text-zinc-500 text-xs">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFiles()
                    }}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {uploadProgress > 0 && (
                  <div className="mt-3 space-y-2">
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-zinc-500 text-right">
                      {uploadProgress < 100
                        ? `Uploading: ${Math.round(uploadProgress)}%`
                        : "Processing..."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={clearFiles} disabled={uploading}>
              Cancel
            </Button>
            <Button onClick={uploadFiles} disabled={uploading || files.length === 0}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {uploadedFileUrl && (
        <Card className="overflow-hidden border-emerald-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-100 p-1.5 rounded-full">
                  <Check className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-zinc-700">Upload complete</p>
                  {uploadType === "image" && (
                    <div className="mt-2 rounded-md overflow-hidden border border-zinc-200 w-32 h-32">
                      <img
                        src={uploadedFileUrl}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {uploadType === "audio" && (
                    <div className="mt-2">
                      <audio controls className="w-full">
                        <source src={uploadedFileUrl} />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFiles}
              >
                Upload Another
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
