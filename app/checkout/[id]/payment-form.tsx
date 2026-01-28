'use client'

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import {
  approvePayPalOrder,
  createPayPalOrder,
} from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import { formatDateTime } from '@/lib/utils'

import CheckoutFooter from '../checkout-footer'
import { redirect, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeForm from './stripe-form'
import { 
  Shield, 
  Lock, 
  Truck, 
  CreditCard, 
  MapPin, 
  Package, 
  Clock  
} from 'lucide-react'
import Image from 'next/image'


export default function OrderPaymentForm({
  order,
  paypalClientId,
  clientSecret,
}: {
  order: IOrder
  paypalClientId: string
  isAdmin: boolean
  clientSecret: string | null
}) {
  const router = useRouter()
  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    expectedDeliveryDate,
    isPaid,
    _id: orderId
  } = order
  const { toast } = useToast()

  if (isPaid) {
    redirect(`/account/orders/${orderId}`)
  }

  function PrintLoadingState() {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    
    if (isPending) {
      return (
        <div className="flex items-center justify-center gap-2 py-4">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-600">Loading PayPal...</span>
        </div>
      )
    } else if (isRejected) {
      return (
        <div className="text-center py-4 text-red-600 text-sm">
          Error loading PayPal. Please try another payment method.
        </div>
      )
    }
    return null
  }

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(orderId)
    if (!res.success) {
      toast({
        title: "Payment Error",
        description: res.message,
        variant: 'destructive',
      })
    }
    return res.data
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(orderId, data)
    toast({
      title: res.success ? "Payment Successful" : "Payment Failed",
      description: res.message,
      variant: res.success ? 'default' : 'destructive',
    })
    
    if (res.success) {
      setTimeout(() => {
        router.push(`/account/orders/${orderId}`)
      }, 2000)
    }
  }

  const CheckoutSummary = () => (
    <Card className="sticky top-24 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          Order Summary
        </h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Items ({items.length}):</span>
            <span className="font-medium"><ProductPrice price={itemsPrice} plain /></span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Shipping:</span>
            <span className="font-medium">
              {shippingPrice === undefined ? (
                '--'
              ) : shippingPrice === 0 ? (
                <span className="text-green-600 font-semibold">FREE</span>
              ) : (
                <ProductPrice price={shippingPrice} plain />
              )}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Tax:</span>
            <span className="font-medium">
              {taxPrice === undefined ? '--' : <ProductPrice price={taxPrice} plain />}
            </span>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Order Total:</span>
              <span className="text-green-600"><ProductPrice price={totalPrice} plain /></span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          {!isPaid && paymentMethod === 'PayPal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Pay with PayPal</span>
                </div>
                <div className="w-12 h-8 relative">
                  <Image
                    src="/icons/paypal.svg"
                    alt="PayPal"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <PayPalScriptProvider options={{ 
                clientId: paypalClientId,
                components: "buttons",
                currency: "USD"
              }}>
                <PrintLoadingState />
                <PayPalButtons
                  createOrder={handleCreatePayPalOrder}
                  onApprove={handleApprovePayPalOrder}
                  style={{ 
                    layout: "vertical",
                    shape: "rect",
                    color: "gold",
                    height: 45
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}

          {!isPaid && paymentMethod === 'Stripe' && clientSecret && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Pay with Card</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-8 h-5 relative">
                    <Image src="/icons/visa.svg" alt="Visa" fill className="object-contain" />
                  </div>
                  <div className="w-8 h-5 relative">
                    <Image src="/icons/mastercard.svg" alt="Mastercard" fill className="object-contain" />
                  </div>
                  <div className="w-8 h-5 relative">
                    <Image src="/icons/amex.svg" alt="Amex" fill className="object-contain" />
                  </div>
                </div>
              </div>
              <Elements
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#2563eb',
                    }
                  }
                }}
                stripe={stripePromise}
              >
                <StripeForm
                  priceInCents={Math.round(order.totalPrice * 100)}
                  orderId={orderId}
                />
              </Elements>
            </div>
          )}

          {!isPaid && paymentMethod === 'Cash On Delivery' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <Truck className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-semibold text-orange-800 dark:text-orange-300">Cash on Delivery</p>
                  <p className="text-sm text-orange-700 dark:text-orange-400">Pay when you receive your order</p>
                </div>
              </div>
              <Button
                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                onClick={() => router.push(`/account/orders/${orderId}`)}
              >
                Confirm Order
              </Button>
            </div>
          )}
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Secure SSL Encryption</span>
        </div>
      </CardContent>
    </Card>
  )

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  )

  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      {/* Order Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-2">
          Complete Your Order
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Order #<span className="font-mono font-semibold">{orderId.slice(-8)}</span> • Please complete payment to confirm your order
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Shipping Address Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Shipping Information
              </h2>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{shippingAddress.fullName}</p>
                    <p className="text-slate-700 dark:text-slate-300">{shippingAddress.street}</p>
                    <p className="text-slate-600 dark:text-slate-400">
                      {shippingAddress.city}, {shippingAddress.province}, {shippingAddress.postalCode}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">{shippingAddress.country}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-green-500 mt-1" />
                    <div>
                      <p className="font-semibold text-green-700 dark:text-green-400">
                        Arrives {formatDateTime(expectedDeliveryDate).dateOnly}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Expected delivery date</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                Payment Method
              </h2>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{paymentMethod}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {paymentMethod === 'Cash On Delivery' 
                          ? 'Pay when you receive your order' 
                          : 'Complete payment to confirm order'
                        }
                      </p>
                    </div>
                  </div>
                  <Lock className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Order Items ({items.length})
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {item.color && `${item.color}`}{item.color && item.size && ', '}{item.size && `${item.size}`}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="font-bold text-sm">
                          <ProductPrice price={item.price} plain />
                        </p>
                        <span className="text-slate-600 dark:text-slate-400 text-sm">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mobile Order Summary */}
          <div className="block lg:hidden">
            <CheckoutSummary />
          </div>          
        </div>

        {/* Desktop Order Summary */}
        <div className="hidden lg:block lg:col-span-2">
          <CheckoutSummary />
        </div>
      </div>

      <CheckoutFooter />
    </main>
  )
}
