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
        <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2 h-9">
          {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
          {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
          {(theme === 'system' || !theme) && <Laptop className="h-[1.2rem] w-[1.2rem]" />}
          <span className="hidden md:inline-block">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="flex items-center gap-2"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="flex items-center gap-2"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="flex items-center gap-2"
        >
          <Laptop className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">More options coming soon</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
