import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  User,
  DollarSign,
  CheckCircle2,
  XCircle,
  Truck,
  MoreHorizontal
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
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions'
import { formatDateTime, formatId } from '@/lib/utils'
import { IOrderList } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'Order Management | Admin Dashboard',
}

const StatusBadge = ({ order }: { order: IOrderList }) => {
  if (order.isDelivered) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Delivered
      </Badge>
    )
  }
  if (order.isPaid) {
    return (
      <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300">
        <Truck className="w-3 h-3 mr-1" />
        Shipped
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300">
      <XCircle className="w-3 h-3 mr-1" />
      Processing
    </Badge>
  )
}

const PaymentBadge = ({ order }: { order: IOrderList }) => {
  if (order.isPaid) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300">
        <CheckCircle2 className="w-3 h-3 mr-1" />
        Paid
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300">
      <XCircle className="w-3 h-3 mr-1" />
      Pending
    </Badge>
  )
}

export default async function OrdersPage(props: {
  searchParams: Promise<{ page: string }>
}) {
  const searchParams = await props.searchParams
  const { page = '1' } = searchParams

  const session = await auth()
  if (session?.user.role !== 'Admin')
    throw new Error('Admin permission required')

  const orders = await getAllOrders({
    page: Number(page),
  })

  // Calculate stats
  const totalRevenue = orders.data.reduce((sum, order) => sum + order.totalPrice, 0)
  const pendingOrders = orders.data.filter(order => !order.isPaid).length
  const deliveredOrders = orders.data.filter(order => order.isDelivered).length

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            Order Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage customer orders and track fulfillment status
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{orders.totalPages}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  <ProductPrice price={totalRevenue} plain />
                </p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending Payment</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{pendingOrders}</p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <XCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Delivered</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{deliveredOrders}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-slate-600" />
              Recent Orders
            </CardTitle>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-10 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  placeholder="Search orders..."
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
                      <Package className="w-4 h-4" />
                      Order ID
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <DollarSign className="w-4 h-4" />
                      Amount
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Payment</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Status</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.data.map((order: IOrderList) => (
                  <TableRow 
                    key={order._id} 
                    className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                  >
                    <TableCell className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {formatId(order._id)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDateTime(order.createdAt!).dateOnly}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {order.user ? order.user.name : 'Deleted User'}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {order.user?.email || 'No email'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-green-600">
                        <ProductPrice price={order.totalPrice} plain />
                      </span>
                    </TableCell>
                    <TableCell>
                      <PaymentBadge order={order} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge order={order} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="h-8">
                          <Link href={`/admin/orders/${order._id}`}>
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Link>
                        </Button>
                        <DeleteDialog 
                          id={order._id} 
                          action={deleteOrder}
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
          {orders.totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {orders.data.length} of {orders.totalPages} orders
              </div>
              <Pagination page={page} totalPages={orders.totalPages!} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
