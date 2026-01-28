import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import { auth } from '@/auth'
import Menu from '@/components/shared/header/menu'
import { AdminNav } from './admin-nav'
import { APP_NAME } from '@/lib/constants'
import { 
  Shield, 
  Building,   
  Activity
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await auth()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-50">
        <div className="flex h-16 items-center px-6">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Image
                src='/icons/logo.svg'
                width={24}
                height={24}
                alt={`${APP_NAME} logo`}
                className="filter brightness-0 invert"
              />
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-lg">
                  {APP_NAME}
                </span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-0 text-xs font-medium">
                  <Shield className="w-3 h-3 mr-1" />
                  Admin
                </Badge>
              </div>
            </div>
          </Link>

          {/* Admin Navigation - Desktop */}
          <div className="hidden lg:flex ml-8">
            <AdminNav />
          </div>

          {/* Right Side Actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* Search Bar */}
            {/* <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search admin panel..."
                className="pl-10 pr-4 w-64 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div> */}

            {/* Quick Actions */}
            {/* <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
              </Button>
              
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <HelpCircle className="w-5 h-5" />
              </Button>
            </div> */}

            {/* User Profile & Menu */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-4">
              {/* <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {session?.user?.name || 'Admin User'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Administrator
                </span>
              </div> */}
              
              <div className="flex items-center gap-2">                
                <Menu forAdmin />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation & Search */}
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-700">
          <div className="px-4 py-3">
            
            {/* Mobile Admin Navigation */}
            <AdminNav />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Admin Status Bar */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Activity className="w-4 h-4" />
                  <span>System Status:</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300">
                    Operational
                  </Badge>
                </div>
                
                <div className="hidden md:flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Building className="w-4 h-4" />
                  <span>Environment:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300">
                    Production
                  </Badge>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Admin Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-4">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-6">
              <span>© 2024 {APP_NAME}. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/admin/terms" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  Terms
                </Link>
                <Link href="/admin/privacy" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  Privacy
                </Link>
                <Link href="/admin/security" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                  Security
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="hidden lg:inline">Admin Panel v2.4.1</span>
              <Badge variant="outline" className="text-xs">
                Secure Connection
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
