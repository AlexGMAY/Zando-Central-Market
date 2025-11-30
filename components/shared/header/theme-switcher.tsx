'use client'

import { ChevronDownIcon, Moon, Sun, Palette } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import useColorStore from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'

export default function ThemeSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme()
  const { availableColors, color, setColor } = useColorStore(theme)
  const isMounted = useIsMounted()

  const changeTheme = (value: string) => {
    setTheme(value)
  }

  if (mobile) {
    return (
      <div className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center gap-3">
          {theme === 'dark' && isMounted ? (
            <Moon className="h-5 w-5 text-blue-400" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-500" />
          )}
          <span className="font-medium">Theme: {(theme || 'light')?.charAt(0).toUpperCase() + (theme || 'light')?.slice(1)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('light')}
            className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            <Sun className="h-4 w-4" />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            <Moon className="h-4 w-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700/50 hover:text-white focus:bg-gray-700/50 focus:ring-2 focus:ring-blue-500">
        {theme === 'dark' && isMounted ? (
          <Moon className="h-4 w-4 text-blue-400" />
        ) : (
          <Sun className="h-4 w-4 text-yellow-500" />
        )}
        <span className="hidden sm:block">{(theme || 'light')?.charAt(0).toUpperCase() + (theme || 'light')?.slice(1)}</span>
        <ChevronDownIcon className="h-3 w-3 opacity-70" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-gray-800 border-gray-600 text-white" 
        align="end"
      >
        <DropdownMenuLabel className="text-gray-300 flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Theme Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-600" />

        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value="light" className="flex items-center gap-2 focus:bg-gray-700 focus:text-white">
            <Sun className="h-4 w-4 text-yellow-500" />
            Light Mode
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className="flex items-center gap-2 focus:bg-gray-700 focus:text-white">
            <Moon className="h-4 w-4 text-blue-400" />
            Dark Mode
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuLabel className="text-gray-300">
          Accent Color
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
        >
          <div className="grid grid-cols-4 gap-2 p-2">
            {availableColors.map((c) => (
              <DropdownMenuRadioItem 
                key={c.name} 
                value={c.name}
                className="flex flex-col items-center gap-1 p-2 h-auto focus:bg-gray-700"
              >
                <div
                  style={{ backgroundColor: c.name }}
                  className="h-6 w-6 rounded-full border-2 border-gray-400 transition-transform hover:scale-110"
                />
                <span className="text-xs">{c.name}</span>
              </DropdownMenuRadioItem>
            ))}
          </div>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
