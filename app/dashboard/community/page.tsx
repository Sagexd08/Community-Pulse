"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Users, MessageCircle, Search, Bell, UserPlus } from "lucide-react"
import { useState } from "react"

export default function CommunityPage() {
  // Sample data for community members and discussions
  const members = [
    { id: 1, name: "Alex Johnson", role: "Developer", online: true, avatar: "/api/placeholder/40/40" },
    { id: 2, name: "Sarah Williams", role: "Designer", online: true, avatar: "/api/placeholder/40/40" },
    { id: 3, name: "Marcus Chen", role: "Product Manager", online: false, avatar: "/api/placeholder/40/40" }
  ];
  
  const discussions = [
    { id: 1, title: "New feature suggestions", replies: 24, lastActivity: "2 hours ago" },
    { id: 2, title: "Upcoming community event", replies: 18, lastActivity: "5 hours ago" },
    { id: 3, title: "Best practices for reporting", replies: 32, lastActivity: "1 day ago" }
  ];

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      {/* Enhanced Navigation */}
      <nav className="flex gap-4 mb-8 p-3 bg-white rounded-lg shadow-sm overflow-x-auto">
      <Link href="/" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-teal-600 transition-colors">
          Home
        </Link>
        <Link href="/dashboard" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors">
          Dashboard
        </Link>
        <Link href="/dashboard/reports" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors">
          My Reports
        </Link>
        <Link href="/dashboard/community" className="text-sm font-medium px-3 py-2 rounded-md bg-violet-600 text-white transition-colors">
          Community
        </Link>
        <Link href="/dashboard/analytics" className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 hover:text-violet-600 transition-colors">
          Analytics
        </Link>
      </nav>
      
      {/* Page Header with Search and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">Community</h1>
          <p className="text-gray-500 mt-1">Connect with other members and join discussions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search community..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Community Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Members Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-violet-600 mr-2" />
              <CardTitle>Community Members</CardTitle>
            </div>
            <button className="flex items-center text-sm text-violet-600 hover:text-violet-800 transition-colors">
              <UserPlus className="h-4 w-4 mr-1" />
              Invite
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            {members.length > 0 ? (
              <div className="space-y-4">
                {members.map(member => (
                  <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="relative">
                        <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                        {member.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <button className="text-xs text-violet-600 px-2 py-1 rounded-full bg-violet-50 hover:bg-violet-100 transition-colors">
                      Message
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No community members found</p>
            )}
            <div className="mt-4 pt-4 border-t text-center">
              <button className="text-sm text-violet-600 hover:text-violet-800 font-medium">
                View all members
              </button>
            </div>
          </CardContent>
        </Card>
        
        {/* Discussions Card */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-teal-500"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
              <CardTitle>Active Discussions</CardTitle>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              New Topic
            </button>
          </CardHeader>
          <CardContent className="pt-4">
            {discussions.length > 0 ? (
              <div className="space-y-4">
                {discussions.map(discussion => (
                  <div key={discussion.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-md transition-all cursor-pointer">
                    <h3 className="font-medium text-lg">{discussion.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {discussion.replies} replies
                      </span>
                      <span className="text-xs text-gray-500">
                        Last activity: {discussion.lastActivity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No active discussions</p>
            )}
            <div className="mt-4 pt-4 border-t text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all discussions
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Community Activity Feed */}
      <Card className="mt-6 border-0 shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-violet-600" />
              </div>
              <div>
                <p><span className="font-medium">Sarah Williams</span> joined the team</p>
                <p className="text-xs text-gray-500 mt-1">Today at 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p><span className="font-medium">Alex Johnson</span> commented on "New feature suggestions"</p>
                <p className="text-xs text-gray-500 mt-1">Yesterday at 4:23 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}