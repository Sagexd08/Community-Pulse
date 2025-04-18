"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { User, Mail, MapPin, Calendar, Edit, Camera, Bell, Settings } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");

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
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell size={20} />
          </button>
          <Link 
            href="/dashboard/settings" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings size={20} />
          </Link>
        </div>
      </nav>

      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500">Manage your profile information and preferences</p>
        </div>
        <button className="mt-4 md:mt-0 px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors flex items-center gap-2">
          <Edit size={16} />
          Edit Profile
        </button>
      </div>

      {/* Profile content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - profile overview */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-violet-100 flex items-center justify-center overflow-hidden">
                  <img src="/api/placeholder/150/150" alt="Profile" className="object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 bg-violet-600 text-white p-2 rounded-full hover:bg-violet-700 transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-xl font-semibold">Alex Johnson</h2>
              <p className="text-gray-500 mb-4">Product Designer</p>
              
              <div className="w-full space-y-4 mt-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail size={18} />
                  <span>alex.johnson@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={18} />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} />
                  <span>Joined January 2023</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column - profile details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium ${activeTab === "personal" ? "text-violet-600 border-b-2 border-violet-600" : "text-gray-500 hover:text-violet-600"}`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Information
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "settings" ? "text-violet-600 border-b-2 border-violet-600" : "text-gray-500 hover:text-violet-600"}`}
                onClick={() => setActiveTab("settings")}
              >
                Account Settings
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "preferences" ? "text-violet-600 border-b-2 border-violet-600" : "text-gray-500 hover:text-violet-600"}`}
                onClick={() => setActiveTab("preferences")}
              >
                Preferences
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {activeTab === "personal" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md" 
                      defaultValue="Alex Johnson"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border rounded-md" 
                      defaultValue="alex.johnson@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md" 
                      defaultValue="Product Designer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border rounded-md" 
                      defaultValue="San Francisco, CA"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea 
                    className="w-full px-3 py-2 border rounded-md h-24" 
                    defaultValue="Product designer with over 5 years of experience in creating user-centered designs for web and mobile applications."
                  />
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="pb-4 border-b">
                  <h3 className="font-medium mb-2">Password Settings</h3>
                  <p className="text-sm text-gray-500 mb-4">Update your password to maintain account security</p>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                    Change Password
                  </button>
                </div>
                <div className="pb-4 border-b">
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                    Enable 2FA
                  </button>
                </div>
                <div>
                  <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data</p>
                  <button className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="pb-4 border-b">
                  <h3 className="font-medium mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive emails about activity</p>
                      </div>
                      <div className="bg-violet-100 w-12 h-6 rounded-full p-1 cursor-pointer flex items-center">
                        <div className="bg-violet-600 w-4 h-4 rounded-full transform translate-x-6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive alerts on your device</p>
                      </div>
                      <div className="bg-violet-100 w-12 h-6 rounded-full p-1 cursor-pointer flex items-center">
                        <div className="bg-violet-600 w-4 h-4 rounded-full transform translate-x-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Theme Preferences</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border p-4 rounded-md cursor-pointer bg-white flex items-center justify-center">
                      <span className="font-medium">Light</span>
                    </div>
                    <div className="border p-4 rounded-md cursor-pointer bg-gray-900 text-white flex items-center justify-center">
                      <span className="font-medium">Dark</span>
                    </div>
                    <div className="border p-4 rounded-md cursor-pointer bg-gradient-to-r from-white to-gray-900 text-gray-700 flex items-center justify-center">
                      <span className="font-medium">System</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-2">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors">
              Save Changes
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}