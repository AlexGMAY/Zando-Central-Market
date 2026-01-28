import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Shield, 
  User,
  Edit3,  
  UserPlus
} from 'lucide-react'

import { auth } from '@/auth'
import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteUser, getAllUsers } from '@/lib/actions/user.actions'
import { IUser } from '@/lib/db/models/user.model'
import { formatId } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'User Management | Admin Dashboard',
}

const RoleBadge = ({ role }: { role: string }) => {
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

export default async function AdminUser(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const session = await auth()
  
  if (session?.user.role !== 'Admin')
    throw new Error('Admin permission required')
  
  const page = Number(searchParams.page) || 1
  const users = await getAllUsers({ page })

  // Calculate stats
  const totalUsers = users.totalPages
  const adminUsers = users.data.filter(user => user.role === 'Admin').length
  const regularUsers = users.data.filter(user => user.role === 'User').length

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            User Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Users</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Admin Users</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{adminUsers}</p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Regular Users</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{regularUsers}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <User className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Sessions</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{users.data.length}</p>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-600" />
              User Accounts
            </CardTitle>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-10 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  placeholder="Search users..."
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-slate-200/50 dark:border-b-slate-700/50">
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      User ID
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Name</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Role
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.data.map((user: IUser) => (
                  <TableRow 
                    key={user._id.toString()} 
                    className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                  >
                    <TableCell className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {formatId(user._id.toString())}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="h-8">
                          <Link href={`/admin/users/${user._id}`}>
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <DeleteDialog 
                          id={user._id.toString()} 
                          action={deleteUser}
                          // trigger={
                          //   <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          //     <MoreHorizontal className="w-3 h-3" />
                          //   </Button>
                          // }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {users?.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {users.data.length} of {users.data.length} users
              </div>
              <Pagination page={page.toString()} totalPages={users.totalPages} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
