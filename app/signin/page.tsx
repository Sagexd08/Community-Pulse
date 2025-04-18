import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign In | Community Pulse",
  description: "Sign in to your Community Pulse account",
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">Community Pulse</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Dashboard
            </Link>
            <Link href="/projects" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Projects
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Resources
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Contact
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-teal-600 transition-colors">
              About
            </Link>
            <Link href="/faq" className="text-sm font-medium hover:text-teal-600 transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signup">
              <Button variant="outline" className="hidden md:flex">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-md w-full">
          <Card className="shadow-lg border-teal-100">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700">Sign in</Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">Google</Button>
                <Button variant="outline">Facebook</Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-teal-600 hover:text-teal-700 font-medium">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 bg-gray-50">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-teal-600" />
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
