import { Metadata } from 'next'
import Link from 'next/link'

import Pagination from '@/components/shared/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMyOrders } from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import { formatDateTime, formatId } from '@/lib/utils'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import ProductPrice from '@/components/shared/product/product-price'
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Eye, 
  ArrowRight,
  ChevronRight,
  Download,
  Repeat,
  CreditCard
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const PAGE_TITLE = 'Your Orders'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>
}) => {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const orders = await getMyOrders({
    page,
  })

  const getStatusBadge = (order: IOrder) => {
    if (order.isDelivered) {
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Delivered</Badge>
    } else if (order.isPaid) {
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Shipped</Badge>
    } else if (order.isPaid) {
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Processing</Badge>
    } else {
      return <Badge variant="outline">Pending Payment</Badge>
    }
  }

  const getStatusIcon = (order: IOrder) => {
    if (order.isDelivered) {
      return <CheckCircle2 className="w-4 h-4 text-green-600" />
    } else if (order.isPaid) {
      return <Truck className="w-4 h-4 text-blue-600" />
    } else {
      return <Clock className="w-4 h-4 text-yellow-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 dark:from-slate-900 dark:via-blue-950/10 dark:to-purple-950/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/30 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/30 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <Link href="/account" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Your Account
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">{PAGE_TITLE}</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
              {PAGE_TITLE}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Track and manage all your orders in one place
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="text-center p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 min-w-[120px]">
              {/* <div className="text-2xl font-bold text-slate-900 dark:text-white">{orders.totalDocuments || 0}</div> */}
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Orders</div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-slate-200/50 dark:border-b-slate-700/50">
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4">Order Details</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4">Date</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4">Total</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4">Status</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4">Payment</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <Package className="w-16 h-16 text-slate-400" />
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                              No Orders Yet
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                              Start shopping to see your orders here
                            </p>
                            <Link href="/products">
                              <Button className="bg-blue-600 hover:bg-blue-700">
                                Start Shopping
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  {orders.data.map((order: IOrder) => (
                    <TableRow 
                      key={order._id} 
                      className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors group"
                    >
                      <TableCell className="py-6">
                        <div className="space-y-2">
                          <Link 
                            href={`/account/orders/${order._id}`}
                            className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                          >
                            <div className="font-semibold text-slate-900 dark:text-white">
                              {formatId(order._id)}
                            </div>
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Package className="w-4 h-4" />
                            <span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="space-y-1">
                          <div className="font-medium text-slate-900 dark:text-white">
                            {formatDateTime(order.createdAt!).dateOnly}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">
                            {formatDateTime(order.createdAt!).timeOnly}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">
                          <ProductPrice price={order.totalPrice} />
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order)}
                          {getStatusBadge(order)}
                        </div>
                        {order.expectedDeliveryDate && (
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Est. {formatDateTime(order.expectedDeliveryDate).dateOnly}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-2">
                          {order.isPaid ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Paid
                              </Badge>
                              {order.paidAt && (
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {formatDateTime(order.paidAt).dateOnly}
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-yellow-600" />
                              <Badge variant="outline">Pending</Badge>
                            </>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {order.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell className="py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/account/orders/${order._id}`}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                          </Link>
                          
                          {/* Additional Actions */}
                          {order.isPaid && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" />
                              Invoice
                            </Button>
                          )}
                          
                          {order.isDelivered && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="flex items-center gap-2"
                            >
                              <Repeat className="w-4 h-4" />
                              Reorder
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {orders.totalPages > 1 && (
              <div className="border-t border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
                <Pagination page={page} totalPages={orders.totalPages} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="border-blue-200/50 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-300">Track Your Order</h3>
              </div>
              <p className="text-blue-800 dark:text-blue-400 text-sm mb-4">
                Get real-time updates on your package delivery status.
              </p>
              <Link href="/track-order">
                <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20">
                  Track Package
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-green-200/50 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Repeat className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-900 dark:text-green-300">Need to Return?</h3>
              </div>
              <p className="text-green-800 dark:text-green-400 text-sm mb-4">
                Start a return or exchange for eligible items within 30 days.
              </p>
              <Link href="/returns">
                <Button variant="outline" size="sm" className="w-full border-green-200 text-green-700 hover:bg-green-100 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/20">
                  Start Return
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-purple-200/50 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-900/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <CreditCard className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-purple-900 dark:text-purple-300">Payment Issues?</h3>
              </div>
              <p className="text-purple-800 dark:text-purple-400 text-sm mb-4">
                Having trouble with payment? We're here to help 24/7.
              </p>
              <Link href="/support">
                <Button variant="outline" size="sm" className="w-full border-purple-200 text-purple-700 hover:bg-purple-100 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20">
                  Get Help
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Browsing History */}
        <div className="mt-16">
          <BrowsingHistoryList />
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
