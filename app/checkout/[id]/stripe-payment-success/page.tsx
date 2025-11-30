// import Link from 'next/link'
// import { notFound, redirect } from 'next/navigation'
// import Stripe from 'stripe'

// import { Button } from '@/components/ui/button'
// import { getOrderById } from '@/lib/actions/order.actions'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

// export default async function SuccessPage(props: {
//   params: Promise<{
//     id: string
//   }>
//   searchParams: Promise<{ payment_intent: string }>
// }) {
//   const params = await props.params

//   const { id } = params

//   const searchParams = await props.searchParams
//   const order = await getOrderById(id)
//   if (!order) notFound()

//   const paymentIntent = await stripe.paymentIntents.retrieve(
//     searchParams.payment_intent
//   )
//   if (
//     paymentIntent.metadata.orderId == null ||
//     paymentIntent.metadata.orderId !== order._id.toString()
//   )
//     return notFound()

//   const isSuccess = paymentIntent.status === 'succeeded'
//   if (!isSuccess) return redirect(`/checkout/${id}`)
//   return (
//     <div className='max-w-4xl w-full mx-auto space-y-8'>
//       <div className='flex flex-col gap-6 items-center '>
//         <h1 className='font-bold text-2xl lg:text-3xl'>
//           Thanks for your purchase
//         </h1>
//         <div>We are now processing your order.</div>
//         <Button asChild>
//           <Link href={`/account/orders/${id}`}>View order</Link>
//         </Button>
//       </div>
//     </div>
//   )
// }

import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import Stripe from 'stripe'

import { Button } from '@/components/ui/button'
import { getOrderById } from '@/lib/actions/order.actions'
import { Card, CardContent } from '@/components/ui/card'
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Mail, 
  Clock,
  Shield,
  ArrowRight,
  Download
} from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import { APP_NAME } from '@/lib/constants'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function SuccessPage(props: {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{ payment_intent: string }>
}) {
  const params = await props.params
  const { id } = params

  const searchParams = await props.searchParams
  const order = await getOrderById(id)
  if (!order) notFound()

  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent
  )
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order._id.toString()
  )
    return notFound()

  const isSuccess = paymentIntent.status === 'succeeded'
  if (!isSuccess) return redirect(`/checkout/${id}`)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-950/10 dark:to-purple-950/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/30 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/30 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -inset-4 bg-green-200 rounded-full animate-ping opacity-20" />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Thank you for your purchase. Your order is now being processed and you'll receive a confirmation email shortly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Order Summary */}
          <Card className="lg:col-span-2 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-6">
                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Order Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Order Number:</span>
                        <span className="font-mono font-semibold">{order._id.slice(-8).toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Order Date:</span>
                        <span>{formatDateTime(order.createdAt).dateOnly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Payment Method:</span>
                        <span className="font-semibold">{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Delivery Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Expected Delivery:</span>
                        <span className="font-semibold text-green-600">
                          {formatDateTime(order.expectedDeliveryDate).dateOnly}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Shipping To:</span>
                        <span className="text-right">
                          {order.shippingAddress.city}, {order.shippingAddress.province}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Items Ordered ({order.items.length})
                  </h3>
                  <div className="space-y-3">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Qty: {item.quantity} • {item.color && `${item.color}`}{item.color && item.size && ', '}{item.size && `${item.size}`}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
                        +{order.items.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="space-y-6">
            {/* Order Actions */}
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Order Actions
                </h3>
                <div className="space-y-3">
                  <Button asChild className="w-full h-12 justify-start gap-3">
                    <Link href={`/account/orders/${id}`}>
                      <Package className="w-4 h-4" />
                      View Order Details
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full h-12 justify-start gap-3">
                    <Link href="/">
                      <Package className="w-4 h-4" />
                      Continue Shopping
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full h-12 justify-start gap-3">
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="border-green-200/50 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/10 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  What's Next?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300 text-sm">
                        Order Confirmation
                      </p>
                      <p className="text-green-700 dark:text-green-400 text-xs">
                        Check your email for order details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Package className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300 text-sm">
                        Order Processing
                      </p>
                      <p className="text-green-700 dark:text-green-400 text-xs">
                        We're preparing your items for shipment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300 text-sm">
                        Shipping Updates
                      </p>
                      <p className="text-green-700 dark:text-green-400 text-xs">
                        Track your order from your account
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="border-blue-200/50 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Need Help?
                </h3>
                <p className="text-blue-800 dark:text-blue-400 text-sm mb-3">
                  Our support team is here to help with your order.
                </p>
                <div className="space-y-2">
                  <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Link href="/page/help">
                      <Mail className="w-3 h-3" />
                      Contact Support
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Link href="/page/returns-policy">
                      <Package className="w-3 h-3" />
                      Returns Policy
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="text-center border-t border-slate-200 dark:border-slate-700 pt-8">
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Package className="w-4 h-4 text-blue-500" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Truck className="w-4 h-4 text-purple-500" />
              <span>Fast Shipping</span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Thank you for choosing {APP_NAME}. We appreciate your business!
          </p>
        </div>
      </div>
    </div>
  )
}
