import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import data from '@/lib/data'
import Search from './search'
import Sidebar from './sidebar'
import { getAllCategories } from '@/lib/actions/product.actions'

export default async function Header() {
  const categories = await getAllCategories()
  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg shadow-gray-900/20 border-b border-gray-700">
      {/* Top Bar - for logo, search, and user menu */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Mobile Sidebar */}
          <div className="flex items-center gap-4 lg:gap-8">
            <Sidebar categories={categories} />
            <Link
              href="/"
              className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
            >
              <Image
                src="/icons/logo.svg"
                width={36}
                height={36}
                alt={`${APP_NAME} logo`}
                className="h-9 w-9"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Search Bar - Centered on Desktop */}
          <div className="hidden flex-1 max-w-2xl lg:block">
            <Search />
          </div>

          {/* User Menu */}
          <div className="flex items-center justify-end">
            <Menu />
          </div>
        </div>

        {/* Search Bar - for Mobile */}
        <div className="pb-3 lg:hidden">
          <Search />
        </div>
      </div>

      {/* Main Navigation Bar */}      
      <div className="bg-gray-800/80 backdrop-blur-md">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center">
            {/* Desktop Category Navigation */}
            <div className="hidden h-full lg:flex items-center space-x-1">
              {data.headerMenus.map((menu) => {
                const IconComponent = menu.icon
                return (
                  <Link
                    href={menu.href}
                    key={menu.href}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 rounded-md transition-all duration-200 hover:bg-gray-700 hover:text-white whitespace-nowrap group"
                  >
                    <IconComponent className="h-4 w-4 transition-transform group-hover:scale-110" />
                    {menu.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
