'use client'
import ProductPrice from '@/components/shared/product/product-price'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CheckCircle2, ShoppingCart, ArrowRight, Truck, Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useCart } from '@/hooks/use-cart-store' // Updated import
import { FREE_SHIPPING_MIN_PRICE } from '@/lib/constants'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'

interface CartAddItemProps {
  itemId: string
}

export default function CartAddItem({ itemId }: CartAddItemProps) {
  const {
    items,
    itemsPrice,
    totalItems
  } = useCart()
  
  const item = items.find((x) => x.clientId === itemId)

  if (!item) {
    notFound()
  }

  const qualifiesForFreeShipping = itemsPrice >= FREE_SHIPPING_MIN_PRICE
  const amountNeededForFreeShipping = Math.max(FREE_SHIPPING_MIN_PRICE - itemsPrice, 0)
  const shippingProgress = Math.min((itemsPrice / FREE_SHIPPING_MIN_PRICE) * 100, 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-green-900/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Link 
                  href={`/product/${item.slug || '#'}`}
                  className="group flex-shrink-0"
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-700 rounded-2xl overflow-hidden border-2 border-green-200 dark:border-green-800 shadow-lg">
                    <Image
                      src={item.image || '/images/placeholder-product.jpg'}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 96px, 128px"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                  </div>
                </Link>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Added to Cart!
                    </h1>
                  </div>

                  <Link 
                    href={`/product/${item.slug || '#'}`}
                    className="group block mb-4"
                  >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h2>
                  </Link>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {(item.color || item.size) && (
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        {item.color && (
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                            <span className="font-medium">Color:</span>
                            <span className="text-gray-800 dark:text-gray-200">{item.color}</span>
                          </div>
                        )}
                        {item.size && (
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                            <span className="font-medium">Size:</span>
                            <span className="text-gray-800 dark:text-gray-200">{item.size}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-center md:justify-start gap-4 text-lg font-semibold text-gray-900 dark:text-white">
                      <span>
                        <ProductPrice price={item.price} />
                      </span>
                      <span className="text-gray-400">×</span>
                      <span>{item.quantity}</span>
                      <span className="text-gray-400">=</span>
                      <span className="text-green-600 dark:text-green-400">
                        <ProductPrice price={item.price * item.quantity} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    {qualifiesForFreeShipping ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">
                        FREE Shipping Qualified
                      </span>
                    ) : (
                      `Add $${amountNeededForFreeShipping.toFixed(2)} for free shipping`
                    )}
                  </span>
                  {!qualifiesForFreeShipping && (
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {shippingProgress.toFixed(0)}%
                    </span>
                  )}
                </div>
                
                {!qualifiesForFreeShipping && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600 dark:text-gray-400">Items in Cart:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600 dark:text-gray-400">Cart Subtotal:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    <ProductPrice price={itemsPrice} plain />
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-bold text-gray-900 dark:text-white">Total:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      <ProductPrice price={itemsPrice} plain />
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-auto">
                <Link
                  href="/checkout"
                  className={cn(
                    buttonVariants(),
                    "w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  )}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/cart"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    "w-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  )}
                >
                  <ShoppingCart className="h-5 w-5" />
                  View Full Cart
                </Link>

                <Link
                  href="/products"
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    "w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  )}
                >
                  <Package className="h-5 w-5" />
                  Continue Shopping
                </Link>
              </div>

              <div className="text-center pt-4 mt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  🔒 Secure checkout · SSL encrypted
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <BrowsingHistoryList />
      </div>
    </div>
  )
}
