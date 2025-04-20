'use client'

import Link from 'next/link'
import { MapPin, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserDropdown } from '@/components/user-dropdown'
import { useAuth } from '@/contexts/auth-context'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const { user, isLoading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md dark:shadow-primary/5">
      <div className="container flex h-16 items-center justify-between relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:to-transparent before:opacity-20 before:rounded-md before:-z-10 before:blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-md -z-10 shadow-inner"></div>
        <Link href="/" className="flex items-center gap-2 relative z-10 transition-transform hover:scale-105">
          <div className="relative">
            <MapPin className="h-6 w-6 text-primary relative z-10" />
            <div className="absolute -inset-1 bg-primary/20 blur-sm rounded-full -z-10"></div>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-primary/80">Community Pulse</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 relative z-10">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
            Dashboard
          </Link>
          <Link href="/report" className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
            Report Issue
          </Link>
          <Link href="/resources" className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
            Resources
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all">
            About
          </Link>
        </nav>

        {/* Desktop Auth/User Section */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <ThemeToggle />

          {isLoading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <UserDropdown />
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden relative z-10">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="relative overflow-hidden transition-all hover:bg-primary/10 active:scale-95"
          >
            <div className="absolute inset-0 bg-primary/5 -z-10 opacity-0 hover:opacity-100 transition-opacity"></div>
            {mobileMenuOpen ? <X className="h-5 w-5 relative z-10" /> : <Menu className="h-5 w-5 relative z-10" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out relative",
        mobileMenuOpen ? "max-h-screen border-b shadow-md" : "max-h-0"
      )}>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background/70 backdrop-blur-sm -z-10"></div>
        <div className="container py-4 space-y-4 relative z-10">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2 relative overflow-hidden rounded-md p-2 hover:bg-primary/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity -z-10"></div>
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2 relative overflow-hidden rounded-md p-2 hover:bg-primary/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity -z-10"></div>
              Dashboard
            </Link>
            <Link
              href="/report"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2 relative overflow-hidden rounded-md p-2 hover:bg-primary/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity -z-10"></div>
              Report Issue
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2 relative overflow-hidden rounded-md p-2 hover:bg-primary/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity -z-10"></div>
              Resources
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2 relative overflow-hidden rounded-md p-2 hover:bg-primary/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity -z-10"></div>
              About
            </Link>
          </nav>

          {/* Mobile Auth Buttons */}
          {!isLoading && !user && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  <span className="relative z-10 group-hover:translate-y-px transition-transform">Sign In</span>
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  className="w-full relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  <span className="relative z-10 group-hover:translate-y-px transition-transform">Sign Up</span>
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile User Menu */}
          {!isLoading && user && (
            <div className="border rounded-lg p-4 space-y-3 bg-background/80 backdrop-blur-sm shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium relative">
                  <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse -z-10"></div>
                  {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user.full_name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform">Profile</span>
                  </Button>
                </Link>
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform">Settings</span>
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  className="w-full justify-start relative overflow-hidden group"
                  onClick={() => {
                    const { signOut } = useAuth()
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                >
                  <div className="absolute inset-0 bg-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform">Log out</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
