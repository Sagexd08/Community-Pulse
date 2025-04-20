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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Community Pulse</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/report" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Report Issue
          </Link>
          <Link href="/resources" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            Resources
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">
            About
          </Link>
        </nav>
        
        {/* Desktop Auth/User Section */}
        <div className="hidden md:flex items-center gap-4">
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
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "max-h-screen border-b" : "max-h-0"
      )}>
        <div className="container py-4 space-y-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/report" 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Report Issue
            </Link>
            <Link 
              href="/resources" 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
          
          {/* Mobile Auth Buttons */}
          {!isLoading && !user && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link href="/signin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
          
          {/* Mobile User Menu */}
          {!isLoading && user && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user.full_name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">Profile</Button>
                </Link>
                <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">Settings</Button>
                </Link>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={() => {
                    const { signOut } = useAuth()
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                >
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
