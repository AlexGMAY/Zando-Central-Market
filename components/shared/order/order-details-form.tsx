'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IOrder } from '@/lib/db/models/order.model'
import { cn, formatDateTime } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import ProductPrice from '../product/product-price'
import ActionButton from '../action-button'
import { deliverOrder, updateOrderToPaid } from '@/lib/actions/order.actions'
import { 
  Package, 
  Truck, 
  CreditCard, 
  MapPin, 
  Calendar,
  CheckCircle2, 
  XCircle,
  Clock,
  Download,
  Printer,
  Share2,
  ArrowRight
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
// Add these imports at the top
// import { downloadInvoice, generateInvoice } from '@/lib/actions/invoice.actions'

export default function OrderDetailsForm({
  order,
  isAdmin,
}: {
  order: IOrder
  isAdmin: boolean
}) {
  const [isProcessing, setIsProcessing] = useState(false)
  // Then in your component function, add state:
  // const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false)
  
  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
    expectedDeliveryDate,
    _id: orderId
  } = order

  // Create wrapper functions that return the expected type
  const handleMarkAsPaid = async () => {
    const result = await updateOrderToPaid(orderId)
    return result
  }

  const handleMarkAsDelivered = async () => {
    const result = await deliverOrder(orderId)
    return result
  }

  // Add these handler functions:
  // const handleDownloadInvoice = async () => {
  //   setIsGeneratingInvoice(true)
  //   try {
  //     const invoiceUrl = await generateInvoice(orderId)
  //     // Create a temporary link to download the file
  //     const link = document.createElement('a')
  //     link.href = invoiceUrl
  //     link.download = `invoice-${orderId}.pdf`
  //     document.body.appendChild(link)
  //     link.click()
  //     document.body.removeChild(link)
  //   } catch (error) {
  //     toast({
  //       variant: 'destructive',
  //       description: 'Failed to generate invoice',
  //     })
  //   } finally {
  //     setIsGeneratingInvoice(false)
  //   }
  // }

  // const handlePrint = () => {
  //   // You might want to create a print-specific layout
  //   window.print()
  // }


  return (
    <div className="grid xl:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="xl:col-span-3 space-y-6">
        {/* Shipping Address Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600" />
              Shipping Information
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Contact Details</h3>
                  <p className="text-slate-700 dark:text-slate-300">{shippingAddress.fullName}</p>
                  <p className="text-slate-600 dark:text-slate-400">{shippingAddress.phone}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Shipping Address</h3>
                  <p className="text-slate-700 dark:text-slate-300">{shippingAddress.street}</p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {shippingAddress.city}, {shippingAddress.province}, {shippingAddress.postalCode}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">{shippingAddress.country}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Delivery Status</h3>
                {isDelivered ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-300">Delivered</p>
                      <p className="text-green-700 dark:text-green-400 text-sm">
                        {formatDateTime(deliveredAt!).dateTime}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl">
                      <Truck className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-yellow-800 dark:text-yellow-300">In Transit</p>
                        <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                          Expected {formatDateTime(expectedDeliveryDate!).dateTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>Tracking updates available soon</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Payment Information
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Payment Method</h3>
                  <p className="text-slate-700 dark:text-slate-300">{paymentMethod}</p>
                </div>
                
                {isPaid && paidAt && (
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Payment Date</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {formatDateTime(paidAt!).dateTime}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Payment Status</h3>
                {isPaid ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-300">Payment Confirmed</p>
                      <p className="text-green-700 dark:text-green-400 text-sm">Successfully processed</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-red-800 dark:text-red-300">Payment Pending</p>
                      <p className="text-red-700 dark:text-red-400 text-sm">Awaiting payment confirmation</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Package className="w-6 h-6 text-blue-600" />
              Order Items ({items.length})
            </h2>
          </CardHeader>
          <CardContent className="p-2">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-slate-200/50 dark:border-b-slate-700/50">
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4">Product</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4">Quantity</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4 text-right">Unit Price</TableHead>
                    <TableHead className="text-slate-900 dark:text-white font-semibold py-4 text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow 
                      key={item.slug} 
                      className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors group"
                    >
                      <TableCell className="py-4">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center gap-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        >
                          <div className="relative w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                              {item.name}
                            </p>
                            <div className="flex gap-2 mt-1">
                              {item.color && (
                                <Badge variant="outline" className="text-xs">
                                  {item.color}
                                </Badge>
                              )}
                              {item.size && (
                                <Badge variant="outline" className="text-xs">
                                  {item.size}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {item.quantity}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <span className="font-medium text-slate-900 dark:text-white">
                          <ProductPrice price={item.price} plain />
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right">
                        <span className="font-bold text-slate-900 dark:text-white">
                          <ProductPrice price={item.price * item.quantity} plain />
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar - Order Summary & Actions */}
      <div className="xl:col-span-1 space-y-6">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-6">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Order Summary
            </h2>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  <ProductPrice price={itemsPrice} plain />
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Shipping:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {shippingPrice === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    <ProductPrice price={shippingPrice} plain />
                  )}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Tax:</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  <ProductPrice price={taxPrice} plain />
                </span>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-slate-900 dark:text-white">Total:</span>
                  <span className="font-bold text-green-600">
                    <ProductPrice price={totalPrice} plain />
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              {!isPaid && ['Stripe', 'PayPal'].includes(paymentMethod) && (
                <Link
                  className={cn(
                    buttonVariants(),
                    "w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3"
                  )}
                  href={`/checkout/${orderId}`}
                >
                  Complete Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}

              {isAdmin && !isPaid && paymentMethod === 'Cash On Delivery' && (
                <ActionButton
                  caption="Mark as Paid"
                  action={handleMarkAsPaid}
                  disabled={isProcessing}
                  className="w-full"
                />
              )}
              
              {isAdmin && isPaid && !isDelivered && (
                <ActionButton
                  caption="Mark as Delivered"
                  action={handleMarkAsDelivered}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                />
              )}

              {/* Additional Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => alert('Invoice download would be implemented here')}
                >
                  <Download className="w-4 h-4" />
                  Invoice
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => window.print()}
                >
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
              </div>              
              {/* Additional Actions */}
              {/* <div className="grid grid-cols-2 gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleDownloadInvoice}
                  disabled={isGeneratingInvoice}
                >
                  <Download className="w-4 h-4" />
                  {isGeneratingInvoice ? 'Generating...' : 'Invoice'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handlePrint}
                >
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
              </div> */}
            </div>

            {/* Order Timeline */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Order Timeline</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Order Placed - {formatDateTime(order.createdAt!).dateOnly}</span>
                </div>
                {isPaid && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Payment Confirmed - {formatDateTime(paidAt!).dateOnly}</span>
                  </div>
                )}
                {isDelivered ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Delivered - {formatDateTime(deliveredAt!).dateOnly}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Truck className="w-4 h-4" />
                    <span>Expected Delivery - {formatDateTime(expectedDeliveryDate!).dateOnly}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
