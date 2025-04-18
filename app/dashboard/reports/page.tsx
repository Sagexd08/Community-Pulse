"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Search, Filter, MoreHorizontal, Download, Calendar } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ReportsPage() {
  const [isHovering, setIsHovering] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Sample reports data (in a real app, this would come from an API)
  const sampleReports = [
    { id: 1, title: "Q1 Performance Report", date: "April 10, 2025", status: "Complete" },
    { id: 2, title: "Customer Satisfaction Survey", date: "April 5, 2025", status: "In Review" },
    { id: 3, title: "Monthly Analytics", date: "March 28, 2025", status: "Complete" }
  ];

  return (
    <div className="container py-12 max-w-6xl mx-auto">
      {/* Enhanced navigation */}
      <nav className="flex gap-1 md:gap-4 mb-8 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm overflow-x-auto">
        <Link href="/" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-teal-600 transition-colors">
          Home
        </Link>
        <Link href="/dashboard" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors">
          Dashboard
        </Link>
        <Link href="/dashboard/reports" className="text-sm font-medium px-3 py-2 rounded-md bg-violet-600 text-white transition-colors">
          My Reports
        </Link>
        <Link href="/dashboard/community" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors">
          Community
        </Link>
        <Link href="/dashboard/analytics" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors">
          Analytics
        </Link>
      </nav>
      
      {/* Header and action button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">My Reports</h1>
          <p className="text-gray-500 mt-2">View and manage your submitted reports</p>
        </div>
        
        <Button 
          className="bg-violet-600 hover:bg-violet-700 shadow-lg transition-all duration-300 ease-in-out"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            transform: isHovering ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          <Plus className={`mr-2 h-4 w-4 transition-all duration-300 ${isHovering ? 'rotate-90' : 'rotate-0'}`} /> 
          New Report
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search reports..." 
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border border-gray-200 text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="border border-gray-200 text-gray-700 hover:bg-gray-50">
            <Calendar className="mr-2 h-4 w-4" />
            Date
          </Button>
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {["all", "complete", "in review", "draft"].map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              activeFilter === filter 
                ? "bg-violet-100 text-violet-700" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Reports card */}
      <Card className="border-0 shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b flex flex-row items-center justify-between">
          <CardTitle className="flex items-center text-xl">
            <FileText className="mr-2 h-5 w-5 text-violet-600" />
            Your Submitted Reports
          </CardTitle>
          <div className="text-sm text-gray-500">
            Showing {sampleReports.length} reports
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {sampleReports.length > 0 ? (
            <div className="space-y-4">
              {sampleReports.map((report) => (
                <div 
                  key={report.id} 
                  className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex justify-between items-center cursor-pointer"
                >
                  <div className="flex gap-3 items-center">
                    <div className={`p-2 rounded-lg ${
                      report.status === 'Complete' ? 'bg-green-50' : 'bg-yellow-50'
                    }`}>
                      <FileText className={`h-5 w-5 ${
                        report.status === 'Complete' ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{report.title}</h3>
                      <p className="text-gray-500 text-sm">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <Download className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You haven't created any reports yet</p>
              <Button className="mt-4 bg-violet-100 text-violet-700 hover:bg-violet-200">
                Create your first report
              </Button>
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Showing 1-3 of 3 reports
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="text-sm px-3 py-1 h-8" disabled>Previous</Button>
              <Button variant="outline" className="text-sm px-3 py-1 h-8" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}