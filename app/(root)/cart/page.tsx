'use client'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import ProductPrice from '@/components/shared/product/product-price'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCart } from '@/hooks/use-cart-store' // Updated import
import { APP_NAME, FREE_SHIPPING_MIN_PRICE } from '@/lib/constants'
import { ShoppingCart, Trash2, ArrowRight, Truck, Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CartPage() {
  const { 
    items, 
    itemsPrice, 
    updateItem, 
    removeItem, 
    totalItems 
  } = useCart() // Use the new hook
  
  const router = useRouter()

  const qualifiesForFreeShipping = itemsPrice >= FREE_SHIPPING_MIN_PRICE
  const shippingProgress = Math.min((itemsPrice / FREE_SHIPPING_MIN_PRICE) * 100, 100)
  const amountNeededForFreeShipping = Math.max(FREE_SHIPPING_MIN_PRICE - itemsPrice, 0)

  if (items.length === 0) {
    return (
      <div className="min-h-screen rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Your Cart is Empty
              </h1>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any items to your cart yet. Start shopping to discover amazing products!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push('/')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Start Shopping
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => router.push('/products')}
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300 px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Browse Products
                </Button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                Continue shopping on{' '}
                <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  {APP_NAME}
                </Link>
              </p>
            </CardContent>
          </Card> 
        </div>
        
        <BrowsingHistoryList className="mt-12" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20 py-8 sm:px-4">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.clientId}
                      className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-slate-700/50 rounded-2xl border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <Link 
                        href={`/product/${item.slug || '#'}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-slate-600 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-500">
                          <Image
                            src={item.image || '/images/placeholder-product.jpg'}
                            alt={item.name}
                            fill
                            sizes="(max-width: 768px) 128px, 160px"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="space-y-3">
                          <Link 
                            href={`/product/${item.slug || '#'}`}
                            className="group"
                          >
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {item.name}
                            </h3>
                          </Link>

                          {(item.color || item.size) && (
                            <div className="flex flex-wrap gap-4 text-sm">
                              {item.color && (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 dark:text-gray-400">Color:</span>
                                  <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {item.color}
                                  </span>
                                </div>
                              )}
                              {item.size && (
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 dark:text-gray-400">Size:</span>
                                  <span className="font-medium text-gray-700 dark:text-gray-300">
                                    {item.size}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            <ProductPrice price={item.price} />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                Qty:
                              </span>
                              <Select
                                value={item.quantity.toString()}
                                onValueChange={(value) => updateItem(item, Number(value))}
                              >
                                <SelectTrigger className="w-20 bg-white dark:bg-slate-600 border-2 border-gray-200 dark:border-slate-500">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-500">
                                  {Array.from({ length: Math.min(item.countInStock, 10) }, (_, i) => (
                                    <SelectItem 
                                      key={i + 1} 
                                      value={(i + 1).toString()}
                                      className="hover:bg-gray-100 dark:hover:bg-slate-600"
                                    >
                                      {i + 1}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(item)}
                              className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              <ProductPrice price={item.price * item.quantity} />
                            </div>
                            {item.quantity > 1 && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {item.quantity} × <ProductPrice price={item.price} plain />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-200 dark:border-slate-600">
                  <span className="text-xl text-gray-600 dark:text-gray-400">
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
                  </span>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    <ProductPrice price={itemsPrice} />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-6">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {qualifiesForFreeShipping ? (
                        <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                          <Truck className="h-4 w-4" />
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

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      <ProductPrice price={itemsPrice} plain />
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {qualifiesForFreeShipping ? 'FREE' : 'Calculated at checkout'}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between items-center text-xl">
                      <span className="font-semibold text-gray-900 dark:text-white">Total:</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        <ProductPrice price={itemsPrice} plain />
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push('/products')}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                  size="lg"
                >
                  <Package className="h-5 w-5 mr-2" />
                  Continue Shopping
                </Button>

                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    🔒 Secure checkout · SSL encrypted
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <BrowsingHistoryList className="mt-12" />
      </div>
    </div>
  )
}

