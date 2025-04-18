"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, ArrowUpRight, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AnalyticsPage() {
  // For interactive nav highlighting
  const [hoveredNav, setHoveredNav] = useState(null);
  
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      {/* Glass-effect navigation */}
      <nav className="flex flex-wrap gap-2 md:gap-4 mb-8 p-3 bg-white/80 backdrop-blur-md rounded-lg shadow-sm">
        <Link 
          href="/" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-teal-600 transition-all"
          onMouseEnter={() => setHoveredNav('home')}
          onMouseLeave={() => setHoveredNav(null)}
        >
          Home
        </Link>
        <Link 
          href="/dashboard" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors"
          onMouseEnter={() => setHoveredNav('dashboard')}
          onMouseLeave={() => setHoveredNav(null)}
        >
          Dashboard
        </Link>
        <Link 
          href="/dashboard/reports" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors"
          onMouseEnter={() => setHoveredNav('reports')}
          onMouseLeave={() => setHoveredNav(null)}
        >
          My Reports
        </Link>
        <Link 
          href="/dashboard/community" 
          className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-all"
          onMouseEnter={() => setHoveredNav('community')}
          onMouseLeave={() => setHoveredNav(null)}
        >
          Community
        </Link>
        <Link 
          href="/dashboard/analytics" 
          className="text-sm font-medium px-3 py-2 rounded-md bg-violet-600 text-white transition-colors"
          onMouseEnter={() => setHoveredNav('analytics')}
          onMouseLeave={() => setHoveredNav(null)}
        >
          Analytics
        </Link>
      </nav>
      
      {/* Header with gradient text */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">Analytics</h1>
        <p className="text-gray-500 mt-1">Performance metrics for your dashboard</p>
      </div>
      
      {/* Stats Cards with improved styling */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="h-1 bg-blue-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <div className="p-2 rounded-full bg-blue-100">
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
              <p className="text-xs font-medium text-emerald-600">+20% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="h-1 bg-teal-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Growth</CardTitle>
            <div className="p-2 rounded-full bg-teal-100">
              <Users className="h-4 w-4 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
              <p className="text-xs font-medium text-emerald-600">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          <div className="h-1 bg-violet-500"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <div className="p-2 rounded-full bg-violet-100">
              <TrendingUp className="h-4 w-4 text-violet-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-emerald-600 mr-1" />
              <p className="text-xs font-medium text-emerald-600">+5% from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart placeholder - would be replaced with actual chart component */}
      <div className="mt-8">
        <Card className="border-0 shadow-md p-4 bg-gradient-to-br from-gray-50 to-white">
          <CardHeader>
            <CardTitle>Monthly Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full flex items-center justify-center text-gray-400">
              Chart visualization will appear here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}