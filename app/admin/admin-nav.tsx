'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FileText, 
  Settings,
  ChevronRight,
  Home,
  BarChart3  
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Remove 'Shield' import since it's not used

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }> // Fix: Replace 'any' with specific type
  badge?: string | number
  description?: string
  isActive?: (pathname: string, href: string) => boolean
}

const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/admin/overview',
    icon: LayoutDashboard,
    description: 'Dashboard and analytics',
    isActive: (pathname: string) => pathname === '/admin/overview' || pathname === '/admin' // Fix: Remove unused 'href' parameter
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,    
    description: 'Manage inventory and listings',
    isActive: (pathname: string) => pathname.includes('/admin/products') // Fix: Remove unused 'href' parameter
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,    
    description: 'Process and track orders',
    isActive: (pathname: string) => pathname.includes('/admin/orders') // Fix: Remove unused 'href' parameter
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,    
    description: 'Customer and user management',
    isActive: (pathname: string) => pathname.includes('/admin/users') // Fix: Remove unused 'href' parameter
  },
  {
    title: 'Content',
    href: '/admin/web-pages',
    icon: FileText,
    description: 'Manage website content',
    isActive: (pathname: string) => pathname.includes('/admin/web-pages') // Fix: Remove unused 'href' parameter
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'System configuration',
    isActive: (pathname: string) => pathname.includes('/admin/settings') // Fix: Remove unused 'href' parameter
  },
]

export function AdminNav({
  className,
  orientation = 'horizontal',
  showIcons = true,
  compact = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  orientation?: 'horizontal' | 'vertical'
  showIcons?: boolean
  compact?: boolean
}) {
  const pathname = usePathname()

  const isActive = (item: NavItem) => {
    if (item.isActive) {
      return item.isActive(pathname, item.href)
    }
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = isActive(item)
    const Icon = item.icon

    const linkContent = (
      <Link
        href={item.href}
        className={cn(
          'group relative flex items-center gap-3 rounded-lg transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          orientation === 'horizontal' 
            ? 'px-4 py-2 text-sm font-medium'
            : 'w-full px-3 py-2 text-sm font-medium',
          active
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 shadow-sm'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
          compact && 'px-3 py-2'
        )}
      >
        {/* Active Indicator */}
        {active && orientation === 'vertical' && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
        )}

        {active && orientation === 'horizontal' && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-t-full" />
        )}

        {/* Icon */}
        {showIcons && (
          <Icon className={cn(
            "w-4 h-4 flex-shrink-0 transition-colors",
            active 
              ? "text-blue-600 dark:text-blue-400" 
              : "text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300"
          )} />
        )}

        {/* Text */}
        <span className={cn(
          "whitespace-nowrap transition-all",
          compact && "sr-only"
        )}>
          {item.title}
        </span>

        {/* Badge */}
        {item.badge && (
          <Badge 
            variant={active ? "default" : "secondary"}
            className={cn(
              "ml-auto text-xs font-medium px-1.5 py-0.5 min-w-[20px] justify-center",
              active 
                ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
                : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
            )}
          >
            {item.badge}
          </Badge>
        )}

        {/* Hover Chevron */}
        {orientation === 'vertical' && !compact && (
          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
        )}
      </Link>
    )

    if (compact) {
      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              {linkContent}
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {item.badge}
                </Badge>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return linkContent
  }

  // Breadcrumb navigation for mobile
  const BreadcrumbNav = () => {
    const currentItem = navItems.find(item => isActive(item))
    if (!currentItem) return null

    const Icon = currentItem.icon

    return (
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 md:hidden">
        <Link 
          href="/admin/overview" 
          className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Administration</span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-medium">
          <Icon className="w-4 h-4" />
          <span>{currentItem.title}</span>
        </div>
      </div>
    )
  }

  if (orientation === 'vertical') {
    return (
      <nav
        className={cn(
          'flex flex-col space-y-1',
          compact ? 'p-2' : 'p-4',
          className
        )}
        {...props}
      >
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
    )
  }

  return (
    <>
      {/* Desktop Horizontal Navigation */}
      <nav
        className={cn(
          'hidden md:flex items-center space-x-1',
          compact ? 'p-2' : 'px-1 py-2',
          className
        )}
        {...props}
      >
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Mobile Breadcrumb */}
      <BreadcrumbNav />
    </>
  )
}

// Additional component for sidebar usage
export function AdminSidebarNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn("space-y-6", className)} {...props}>
      <div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Administration
          </h2>
          <p className="px-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            Manage your store and content
          </p>
          <AdminNav 
            orientation="vertical" 
            showIcons={true}
            className="flex-col space-y-1"
          />
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="px-3 py-2">
        <div className="px-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-medium text-slate-900 dark:text-white">
              Quick Stats
            </h3>
          </div>
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Pending Orders</span>
              <Badge variant="outline" className="text-xs">6</Badge>
            </div>
            <div className="flex justify-between">
              <span>Low Stock</span>
              <Badge variant="outline" className="text-xs">3</Badge>
            </div>
            <div className="flex justify-between">
              <span>New Users</span>
              <Badge variant="outline" className="text-xs">12</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
