import { notFound } from 'next/navigation'
import { 
  ArrowLeft, 
  User, 
  Shield, 
  Mail, 
  Calendar,
  Edit3,
  Eye
} from 'lucide-react'

import { getUserById } from '@/lib/actions/user.actions'
import UserEditForm from './user-edit-form'
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatId, formatDateTime } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Edit User | Admin Dashboard',
}

export default async function UserEditPage(props: {
  params: Promise<{
    id: string
  }>
}) {
  const params = await props.params
  const { id } = params

  const user = await getUserById(id)
  if (!user) notFound()

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      Admin: {
        class: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300',
        icon: Shield
      },
      User: {
        class: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300',
        icon: User
      }
    }

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.User
    const Icon = config.icon

    return (
      <Badge className={`${config.class} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {role}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <Link 
            href="/admin/overview" 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <span>›</span>
          <Link 
            href="/admin/users" 
            className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <User className="w-4 h-4" />
            Users
          </Link>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-medium">
            Edit {user.name}
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Edit3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Edit User
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  Update user information and manage account permissions
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {getRoleBadge(user.role)}
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/admin/users">
                <ArrowLeft className="w-4 h-4" />
                Back to Users
              </Link>
            </Button>
          </div>
        </div>

        {/* User Summary Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">User Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-300">User ID</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-mono">
                    {formatId(user._id)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">Email Address</p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs">
                    {user.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">Account Role</p>
                  <div className="mt-1">
                    {getRoleBadge(user.role)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-300">Member Since</p>
                  <p className="text-purple-700 dark:text-purple-400 text-xs">
                    {formatDateTime(user.createdAt).dateOnly}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href={`/admin/users/${user._id}/activity`}>
                  <Eye className="w-4 h-4" />
                  View Activity
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/admin/users">
                  <User className="w-4 h-4" />
                  View All Users
                </Link>
              </Button>
              {/* <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/admin/users/create">
                  <Edit3 className="w-4 h-4" />
                  Create New User
                </Link>
              </Button> */}
            </div>
          </CardContent>
        </Card>

        {/* User Edit Form */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Edit3 className="w-5 h-5 text-blue-600" />
              Edit User Details
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Update user information, modify permissions, and manage account settings
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <UserEditForm user={user} />
          </CardContent>
        </Card>

        {/* Footer Help Section */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need assistance with user management?{' '}
            <Link href="/admin/help/users" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
              View our user management guide
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}
