'use client'

import { useAuth } from '@/contexts/auth-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, Settings, LogOut, FileText, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export function UserDropdown() {
  const { user, signOut } = useAuth()

  if (!user) return null

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user.full_name) return 'U'
    return user.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden p-0 transition-transform hover:scale-105">
          <div className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity -z-10 rounded-full"></div>
          <Avatar className="h-9 w-9 border-2 border-background">
            <AvatarImage src={user.avatar_url || ''} alt={user.full_name || 'User'} />
            <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/50 text-primary-foreground">{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">{user.full_name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/dashboard">
            <DropdownMenuItem className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <BarChart3 className="mr-2 h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="group-hover:translate-x-1 transition-transform">Dashboard</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile">
            <DropdownMenuItem className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <User className="mr-2 h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="group-hover:translate-x-1 transition-transform">Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <Settings className="mr-2 h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="group-hover:translate-x-1 transition-transform">Settings</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/reports">
            <DropdownMenuItem className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              <FileText className="mr-2 h-4 w-4 text-primary/70 group-hover:text-primary transition-colors" />
              <span className="group-hover:translate-x-1 transition-transform">My Reports</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="group relative overflow-hidden focus:bg-destructive/10 focus:text-destructive"
        >
          <div className="absolute inset-0 bg-destructive/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          <LogOut className="mr-2 h-4 w-4 text-destructive/70 group-hover:text-destructive transition-colors" />
          <span className="group-hover:translate-x-1 transition-transform">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
