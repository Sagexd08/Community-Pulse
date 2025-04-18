"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

export default function CommunityStats() {
  const issuesByCategory = [
    { name: "Infrastructure", value: 42 },
    { name: "Sanitation", value: 28 },
    { name: "Safety", value: 15 },
    { name: "Environment", value: 10 },
    { name: "Vandalism", value: 5 },
  ]

  const issuesByMonth = [
    { name: "Jan", issues: 12 },
    { name: "Feb", issues: 19 },
    { name: "Mar", issues: 15 },
    { name: "Apr", issues: 22 },
    { name: "May", issues: 28 },
    { name: "Jun", issues: 35 },
  ]

  const resolutionRate = [
    { name: "Jan", rate: 65 },
    { name: "Feb", rate: 68 },
    { name: "Mar", rate: 72 },
    { name: "Apr", rate: 75 },
    { name: "May", rate: 82 },
    { name: "Jun", rate: 88 },
  ]

  const COLORS = ["#7c3aed", "#ec4899", "#14b8a6", "#f59e0b", "#ef4444"]

  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="demographics">Demographics</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Issues by Category</CardTitle>
              <CardDescription>Distribution of reported issues by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={issuesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {issuesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Issues</CardTitle>
              <CardDescription>Number of issues reported per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={issuesByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="issues" fill="#7c3aed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resolution Rate</CardTitle>
            <CardDescription>Percentage of issues resolved over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={resolutionRate}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="#7c3aed" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trends" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Trending Issues</CardTitle>
            <CardDescription>Analysis of issue trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Trend analysis data would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="demographics" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Demographic Impact</CardTitle>
            <CardDescription>Analysis of issues by community demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Demographic data would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
