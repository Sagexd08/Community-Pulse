"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bell, Lock, Globe, Map, Moon, Sun, Laptop, User, Shield, Database, Palette } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      {/* Top navigation */}
      <nav className="hidden md:flex items-center justify-between mb-8 pb-4 border-b">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-violet-600 transition-colors">
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
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/profile">
            <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
              <User size={20} />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Configure your account preferences and notifications</p>
      </div>

      {/* Settings content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center gap-3 p-4 text-left transition-colors ${
                    activeTab === "notifications" ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600" : "hover:bg-gray-50"
                  }`}
                >
                  <Bell size={18} />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`flex items-center gap-3 p-4 text-left transition-colors ${
                    activeTab === "privacy" ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600" : "hover:bg-gray-50"
                  }`}
                >
                  <Lock size={18} />
                  <span>Privacy</span>
                </button>
                <button
                  onClick={() => setActiveTab("appearance")}
                  className={`flex items-center gap-3 p-4 text-left transition-colors ${
                    activeTab === "appearance" ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600" : "hover:bg-gray-50"
                  }`}
                >
                  <Palette size={18} />
                  <span>Appearance</span>
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`flex items-center gap-3 p-4 text-left transition-colors ${
                    activeTab === "security" ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600" : "hover:bg-gray-50"
                  }`}
                >
                  <Shield size={18} />
                  <span>Security</span>
                </button>
                <button
                  onClick={() => setActiveTab("data")}
                  className={`flex items-center gap-3 p-4 text-left transition-colors ${
                    activeTab === "data" ? "bg-violet-50 text-violet-700 border-r-2 border-violet-600" : "hover:bg-gray-50"
                  }`}
                >
                  <Database size={18} />
                  <span>Data</span>
                </button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Right content area */}
        <div className="md:col-span-3">
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} className="text-violet-600" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure how you receive notifications from our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">Activity Updates</Label>
                        <p className="text-sm text-gray-500">Get notified about activity on your reports and comments</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-marketing" className="font-medium">Marketing Emails</Label>
                        <p className="text-sm text-gray-500">Receive emails about new features and special offers</p>
                      </div>
                      <Switch id="email-marketing" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-security" className="font-medium">Security Alerts</Label>
                        <p className="text-sm text-gray-500">Get important security updates about your account</p>
                      </div>
                      <Switch id="email-security" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-all" className="font-medium">All Push Notifications</Label>
                        <p className="text-sm text-gray-500">Enable or disable all push notifications</p>
                      </div>
                      <Switch id="push-all" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-mentions" className="font-medium">Mentions</Label>
                        <p className="text-sm text-gray-500">Get notified when someone mentions you</p>
                      </div>
                      <Switch id="push-mentions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-comments" className="font-medium">Comments</Label>
                        <p className="text-sm text-gray-500">Get notified when someone comments on your reports</p>
                      </div>
                      <Switch id="push-comments" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button className="bg-violet-600 hover:bg-violet-700">Save Notification Settings</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock size={20} className="text-violet-600" />
                  Privacy
                </CardTitle>
                <CardDescription>Manage your privacy settings and control who can see your data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Profile Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profile-visible" className="font-medium">Public Profile</Label>
                        <p className="text-sm text-gray-500">Make your profile visible to everyone</p>
                      </div>
                      <Switch id="profile-visible" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-email" className="font-medium">Show Email Address</Label>
                        <p className="text-sm text-gray-500">Allow other users to see your email address</p>
                      </div>
                      <Switch id="show-email" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Location Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="location-sharing" className="font-medium">Location Sharing</Label>
                        <p className="text-sm text-gray-500">Allow the app to access your location</p>
                      </div>
                      <Switch id="location-sharing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="precise-location" className="font-medium">Precise Location</Label>
                        <p className="text-sm text-gray-500">Use precise location instead of approximate area</p>
                      </div>
                      <Switch id="precise-location" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Data Collection</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analytics" className="font-medium">Usage Analytics</Label>
                        <p className="text-sm text-gray-500">Allow us to collect anonymous usage data</p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="personalized-content" className="font-medium">Personalized Content</Label>
                        <p className="text-sm text-gray-500">Receive content tailored to your interests</p>
                      </div>
                      <Switch id="personalized-content" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button className="bg-violet-600 hover:bg-violet-700">Save Privacy Settings</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette size={20} className="text-violet-600" />
                  Appearance
                </CardTitle>
                <CardDescription>Customize how the interface looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-violet-500 transition-colors">
                      <Sun size={24} />
                      <span className="font-medium">Light</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer bg-gray-900 text-white hover:border-violet-500 transition-colors">
                      <Moon size={24} />
                      <span className="font-medium">Dark</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-violet-500 transition-colors">
                      <Laptop size={24} />
                      <span className="font-medium">System</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Accent Color</h3>
                  <div className="grid grid-cols-6 gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-500 cursor-pointer ring-2 ring-violet-200 ring-offset-2"></div>
                    <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-green-500 cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-yellow-500 cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-red-500 cursor-pointer"></div>
                    <div className="w-10 h-10 rounded-full bg-pink-500 cursor-pointer"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Font Size</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">A</span>
                      <span className="text-xl">A</span>
                    </div>
                    <input type="range" className="w-full" min="1" max="5" defaultValue="3" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button className="bg-violet-600 hover:bg-violet-700">Save Appearance Settings</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield size={20} className="text-violet-600" />
                  Security
                </CardTitle>
                <CardDescription>Protect your account with additional security measures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Account Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Password</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Login History</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-sm text-gray-500">Current session</p>
                        </div>
                        <div className="text-sm text-right">
                          <p className="text-green-600 font-medium">Active now</p>
                          <p className="text-gray-500">New York, USA</p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Safari on iPhone</p>
                          <p className="text-sm text-gray-500">2 days ago</p>
                        </div>
                        <div className="text-sm text-right">
                          <p className="text-gray-600">Apr 16, 2025</p>
                          <p className="text-gray-500">San Francisco, USA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View All Devices</Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-6">
                <Button className="bg-violet-600 hover:bg-violet-700">Save Security Settings</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "data" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database size={20} className="text-violet-600" />
                  Data Management
                </CardTitle>
                <CardDescription>Manage your data and account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Data Export</h3>
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Download a copy of your data, including your profile information, reports, and activity history</p>
                    <Button variant="outline" size="sm">Export All Data</Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">Account Deletion</h3>
                  <div>
                    <p className="text-sm text-gray-500 mb-3">Permanently delete your account and all associated data</p>
                    <Button variant="destructive" size="sm">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}