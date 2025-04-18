"use client"

import { useEffect, useRef } from "react"

export default function MapVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight

      drawMap()
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Draw the map visualization
    function drawMap() {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = "#f0fdfa" // teal-50
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "#99f6e4" // teal-200
      ctx.lineWidth = 1

      const gridSize = 30
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw roads
      ctx.strokeStyle = "#94a3b8"
      ctx.lineWidth = 3

      // Horizontal roads
      for (let y = gridSize * 3; y < canvas.height; y += gridSize * 5) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical roads
      for (let x = gridSize * 4; x < canvas.width; x += gridSize * 6) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw issue markers
      const issues = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, type: "flood", severity: 0.8 },
        { x: canvas.width * 0.7, y: canvas.height * 0.2, type: "trash", severity: 0.5 },
        { x: canvas.width * 0.5, y: canvas.height * 0.6, type: "infrastructure", severity: 0.9 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, type: "flood", severity: 0.4 },
        { x: canvas.width * 0.3, y: canvas.height * 0.8, type: "trash", severity: 0.6 },
      ]

      issues.forEach((issue) => {
        const radius = 10 + issue.severity * 15

        // Draw pulse animation
        ctx.beginPath()
        ctx.arc(issue.x, issue.y, radius * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(13, 148, 136, ${issue.severity * 0.2})` // teal-600 with opacity
        ctx.fill()

        // Draw marker
        ctx.beginPath()
        ctx.arc(issue.x, issue.y, radius, 0, Math.PI * 2)

        switch (issue.type) {
          case "flood":
            ctx.fillStyle = "rgba(6, 182, 212, 0.8)" // cyan-500
            break
          case "trash":
            ctx.fillStyle = "rgba(245, 158, 11, 0.8)" // amber
            break
          case "infrastructure":
            ctx.fillStyle = "rgba(239, 68, 68, 0.8)" // red
            break
          default:
            ctx.fillStyle = "rgba(13, 148, 136, 0.8)" // teal-600
        }

        ctx.fill()

        // Draw border
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw community areas
      const communities = [
        { x: canvas.width * 0.25, y: canvas.height * 0.35, radius: canvas.width * 0.15 },
        { x: canvas.width * 0.7, y: canvas.height * 0.25, radius: canvas.width * 0.1 },
        { x: canvas.width * 0.6, y: canvas.height * 0.65, radius: canvas.width * 0.2 },
      ]

      communities.forEach((community) => {
        ctx.beginPath()
        ctx.arc(community.x, community.y, community.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(13, 148, 136, 0.1)" // teal-600 with opacity
        ctx.fill()
        ctx.strokeStyle = "rgba(13, 148, 136, 0.3)" // teal-600 with opacity
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      drawMap()
      animationFrameId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
}
