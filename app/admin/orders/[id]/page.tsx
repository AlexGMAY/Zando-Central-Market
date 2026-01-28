import { notFound } from 'next/navigation'
import React from 'react'
import { 
  ArrowLeft, 
  Package, 
  Download, 
  Printer, 
  Share2,
  Calendar,
  User
} from 'lucide-react'

import { auth } from '@/auth'
import { getOrderById } from '@/lib/actions/order.actions'
import OrderDetailsForm from '@/components/shared/order/order-details-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatId } from '@/lib/utils'

export const metadata = {
  title: 'Order Details | Admin Dashboard',
}

interface Order {
  isDelivered: boolean;
  isPaid: boolean;  
}

const AdminOrderDetailsPage = async (props: {
  params: Promise<{
    id: string
  }>
}) => {
  const params = await props.params
  const { id } = params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  const getOrderStatusColor = (order: Order) => {
    if (order.isDelivered) return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300'
    if (order.isPaid) return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300'
    return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300'
  }

  const getOrderStatusText = (order: Order) => {
    if (order.isDelivered) return 'Delivered'
    if (order.isPaid) return 'Processing'
    return 'Pending Payment'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 py-8">
      <div className="max-w-7xl mx-auto px-4">
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
            href="/admin/orders" 
            className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <Package className="w-4 h-4" />
            Orders
          </Link>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-medium">
            Order {formatId(order._id.toString())}
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Order Details
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  Manage order fulfillment and customer communication
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={getOrderStatusColor(order)}>
              {getOrderStatusText(order)}
            </Badge>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/admin/orders">
                <ArrowLeft className="w-4 h-4" />
                Back to Orders
              </Link>
            </Button>
          </div>
        </div>

        {/* Order Summary Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <Package className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-300">Order ID</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-mono">
                    {formatId(order._id.toString())}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">Order Date</p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                  <User className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">Customer</p>
                  <p className="text-green-700 dark:text-green-400 text-xs">
                    {order.user && typeof order.user === 'object' ? order.user.name : 'Guest Customer'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                  <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-300">Quick Actions</p>
                  <div className="flex gap-2 mt-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Printer className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  order.isPaid ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div className="font-semibold text-slate-900 dark:text-white">
                  {order.isPaid ? 'Payment Received' : 'Awaiting Payment'}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {order.isPaid ? new Date(order.paidAt!).toLocaleDateString() : 'Not paid'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                  order.isDelivered ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="font-semibold text-slate-900 dark:text-white">
                  {order.isDelivered ? 'Delivered' : 'In Transit'}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {order.isDelivered ? new Date(order.deliveredAt!).toLocaleDateString() : 'Processing'}
                </div>
              </div>
              
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2" />
                <div className="font-semibold text-slate-900 dark:text-white">
                  {order.items.length} Items
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {order.items.reduce((sum, item) => sum + item.quantity, 0)} total units
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Form */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Package className="w-5 h-5 text-blue-600" />
              Order Management
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Review order details, update status, and manage fulfillment
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <OrderDetailsForm
              order={order}
              isAdmin={session?.user?.role === 'Admin' || false}
            />
          </CardContent>
        </Card>

        {/* Footer Help Section */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need assistance with order management?{' '}
            <Link href="/admin/help/orders" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
              View our order processing guide
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default AdminOrderDetailsPage
