import { notFound } from 'next/navigation'
import React from 'react'

import { auth } from '@/auth'
import { getOrderById } from '@/lib/actions/order.actions'
import OrderDetailsForm from '@/components/shared/order/order-details-form'
import Link from 'next/link'
import { formatId } from '@/lib/utils'
import { ChevronRight, Home, Package, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export async function generateMetadata(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params

  return {
    title: `Order ${formatId(params.id)}`,
  }
}

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string
  }>
}) => {
  const params = await props.params

  const { id } = params

  const order = await getOrderById(id)
  if (!order) notFound()

  const session = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 dark:from-slate-900 dark:via-blue-950/10 dark:to-purple-950/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/30 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/30 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <Link 
            href="/account" 
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            Your Account
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href="/account/orders" 
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Your Orders
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">
            Order {formatId(order._id)}
          </span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
              <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
                Order {formatId(order._id)}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Order placed on {new Date(order.createdAt!).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <Link href="/account/orders">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Button>
          </Link>
        </div>

        {/* Order Status Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Order Status</div>
                <div className={`text-lg font-semibold ${
                  order.isDelivered ? 'text-green-600' : 
                  order.isPaid ? 'text-blue-600' : 
                  'text-yellow-600'
                }`}>
                  {order.isDelivered ? 'Delivered' : 
                   order.isPaid ? 'Shipped' : 
                   'Processing'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Payment Status</div>
                <div className={`text-lg font-semibold ${
                  order.isPaid ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Amount</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  ${order.totalPrice?.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Items</div>
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Form */}
        <OrderDetailsForm
          order={order}
          isAdmin={session?.user?.role === 'Admin' || false}
        />
      </div>
    </div>
  )
}

export default OrderDetailsPage
