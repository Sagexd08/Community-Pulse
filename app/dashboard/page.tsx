import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Bell, User, Settings, LogOut, Plus, Filter, BarChart3, MapIcon, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import DashboardMap from "@/components/dashboard-map"
import RecentIssues from "@/components/recent-issues"
import CommunityStats from "@/components/community-stats"

export const metadata: Metadata = {
  title: "Dashboard | Community Pulse",
  description: "Community Pulse user dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-violet-600" />
            <span className="text-xl font-bold">Community Pulse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Home
              </Link>
            <Link href="/dashboard" className="text-sm font-medium text-violet-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/reports" className="text-sm font-medium hover:text-violet-600 transition-colors">
              My Reports
            </Link>
            <Link href="/dashboard/community" className="text-sm font-medium hover:text-violet-600 transition-colors">
              Community
            </Link>
            <Link href="/dashboard/analytics" className="text-sm font-medium hover:text-violet-600 transition-colors">
              Analytics
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <Link href="/dashboard/profile" className="w-full">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/settings" className="w-full">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John! Here's what's happening in your community.</p>
            </div>
            <div className="flex gap-4">
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="mr-2 h-4 w-4" /> Report Issue
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                <MapIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+14% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">70% resolution rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Engagement</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">243</div>
                <p className="text-xs text-muted-foreground">+32% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="map" className="space-y-4">
            <TabsList>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="stats">Community Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Community Map</CardTitle>
                  <CardDescription>View and interact with reported issues in your area.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px] rounded-md overflow-hidden">
                    <DashboardMap />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Issues</CardTitle>
                  <CardDescription>A list of recently reported issues in your community.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentIssues />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="stats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Community Statistics</CardTitle>
                  <CardDescription>Analytics and trends from your community.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CommunityStats />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-6 bg-white">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-violet-600" />
            <span className="text-lg font-semibold">Community Pulse</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Community Pulse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
