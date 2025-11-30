import { auth } from '@/auth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOut } from '@/lib/actions/user.actions'
import { User, ChevronDown, Settings, Package, Shield } from 'lucide-react'
import Link from 'next/link'

export default async function UserButton({ mobile = false }: { mobile?: boolean }) {
  const session = await auth()

  if (mobile) {
    return (
      <div className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-blue-400" />
          <div className="flex flex-col text-left">
            <span className="font-medium">
              {session ? session.user.name : 'Hello, sign in'}
            </span>
            <span className="text-sm text-gray-300">
              {session ? 'Manage your account' : 'Access your account'}
            </span>
          </div>
        </div>
        <Link 
          href={session ? '/account' : '/sign-in'}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {session ? 'Account' : 'Sign In'}
        </Link>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700/50 hover:text-white focus:bg-gray-700/50 focus:ring-2 focus:ring-blue-500">
        <User className="h-4 w-4" />
        <div className="flex flex-col text-left leading-tight">
          <span className="text-xs">Hello, {session ? session.user.name?.split(' ')[0] : 'sign in'}</span>
          <span className="text-xs font-semibold">Account & Lists</span>
        </div>
        <ChevronDown className="h-3 w-3 opacity-70" />
      </DropdownMenuTrigger>
      
      {session ? (
        <DropdownMenuContent className="w-64 bg-gray-800 border-gray-600 text-white" align="end">
          <DropdownMenuLabel className="flex items-center gap-3 p-4 border-b border-gray-600">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
              <User className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold leading-none">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-300 mt-1">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuGroup className="p-2">
            <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer focus:bg-gray-700 focus:text-white">
              <Settings className="h-4 w-4" />
              <Link href="/account" className="flex-1">Your Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer focus:bg-gray-700 focus:text-white">
              <Package className="h-4 w-4" />
              <Link href="/account/orders" className="flex-1">Your Orders</Link>
            </DropdownMenuItem>

            {session.user.role === 'Admin' && (
              <DropdownMenuItem className="flex items-center gap-3 p-2 rounded-lg cursor-pointer focus:bg-gray-700 focus:text-white">
                <Shield className="h-4 w-4 text-green-400" />
                <Link href="/admin/overview" className="flex-1">Admin Dashboard</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="bg-gray-600" />
          
          <div className="p-2">
            <form action={SignOut} className="w-full">
              <Button
                className="w-full justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                variant="ghost"
                size="sm"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-64 bg-gray-800 border-gray-600 text-white" align="end">
          <DropdownMenuLabel className="p-4 border-b border-gray-600">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Welcome</p>
                <p className="text-xs text-gray-300">Sign in to your account</p>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuGroup className="p-4">
            <Link 
              href="/sign-in" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors block text-center"
            >
              Sign In
            </Link>
            <p className="text-xs text-gray-300 text-center mt-3">
              New Customer?{' '}
              <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
              </Link>
            </p>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}

