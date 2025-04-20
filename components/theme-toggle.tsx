'use client'

import * as React from 'react'
import { Moon, Sun, Laptop, Palette } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-full overflow-hidden transition-all hover:bg-primary/10 hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-full"></div>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40" sideOffset={8}>
        <DropdownMenuLabel className="font-medium">Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="flex items-center gap-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          <Sun className="h-4 w-4 text-amber-500" />
          <span className="group-hover:translate-x-1 transition-transform">Light</span>
          {theme === 'light' && <span className="absolute right-2 h-2 w-2 rounded-full bg-primary/50"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="flex items-center gap-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          <Moon className="h-4 w-4 text-indigo-400" />
          <span className="group-hover:translate-x-1 transition-transform">Dark</span>
          {theme === 'dark' && <span className="absolute right-2 h-2 w-2 rounded-full bg-primary/50"></span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="flex items-center gap-2 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          <Laptop className="h-4 w-4 text-slate-400" />
          <span className="group-hover:translate-x-1 transition-transform">System</span>
          {theme === 'system' && <span className="absolute right-2 h-2 w-2 rounded-full bg-primary/50"></span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
