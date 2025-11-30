// import useCartStore from '@/hooks/use-cart-store'
// import { cn } from '@/lib/utils'
// import Link from 'next/link'
// import React from 'react'
// import { Button, buttonVariants } from '../ui/button'
// import { Separator } from '../ui/separator'
// import { ScrollArea } from '../ui/scroll-area'
// import Image from 'next/image'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select'
// import { TrashIcon } from 'lucide-react'
// import ProductPrice from './product/product-price'
// import { FREE_SHIPPING_MIN_PRICE } from '@/lib/constants'

// export default function CartSidebar() {
//   const {
//     cart: { items, itemsPrice },
//     updateItem,
//     removeItem,
//   } = useCartStore()

//   return (
//     <div className='w-36 overflow-y-auto'>
//       <div className={`fixed border-l h-full`}>
//         <div className='p-2 h-full flex flex-col gap-2 justify-start items-center'>
//           <div className='text-center space-y-2'>
//             <div> Subtotal</div>
//             <div className='font-bold'>
//               <ProductPrice price={itemsPrice} plain />
//             </div>
//             {itemsPrice > FREE_SHIPPING_MIN_PRICE && (
//               <div className=' text-center text-xs'>
//                 Your order qualifies for FREE Shipping
//               </div>
//             )}

//             <Link
//               className={cn(
//                 buttonVariants({ variant: 'outline' }),
//                 'rounded-full hover:no-underline w-full'
//               )}
//               href='/cart'
//             >
//               Go to Cart
//             </Link>
//             <Separator className='mt-3' />
//           </div>

//           <ScrollArea className='flex-1  w-full'>
//             {items.map((item) => (
//               <div key={item.clientId}>
//                 <div className='my-3'>
//                   <Link href={`/product/${item.slug}`}>
//                     <div className='relative h-24'>
//                       <Image
//                         src={item.image}
//                         alt={item.name}
//                         fill
//                         sizes='20vw'
//                         className='object-contain'
//                       />
//                     </div>
//                   </Link>
//                   <div className='text-sm text-center font-bold'>
//                     <ProductPrice price={item.price} plain />
//                   </div>
//                   <div className='flex gap-2 mt-2'>
//                     <Select
//                       value={item.quantity.toString()}
//                       onValueChange={(value) => {
//                         updateItem(item, Number(value))
//                       }}
//                     >
//                       <SelectTrigger className='text-xs w-12 ml-1 h-auto py-0'>
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {Array.from({ length: item.countInStock }).map(
//                           (_, i) => (
//                             <SelectItem value={(i + 1).toString()} key={i + 1}>
//                               {i + 1}
//                             </SelectItem>
//                           )
//                         )}
//                       </SelectContent>
//                     </Select>
//                     <Button
//                       variant={'outline'}
//                       size={'sm'}
//                       onClick={() => {
//                         removeItem(item)
//                       }}
//                     >
//                       <TrashIcon className='w-4 h-4' />
//                     </Button>
//                   </div>
//                 </div>
//                 <Separator />
//               </div>
//             ))}
//           </ScrollArea>
//         </div>
//       </div>
//     </div>
//   )
// }

// components/shared/cart-sidebar.tsx
'use client'
import useCartStore from '@/hooks/use-cart-store'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { TrashIcon, ShoppingCart, Truck, ChevronRight, X } from 'lucide-react'
import ProductPrice from './product/product-price'
import { FREE_SHIPPING_MIN_PRICE } from '@/lib/constants'
import { Badge } from '../ui/badge'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const {
    cart: { items, itemsPrice },
    updateItem,
    removeItem,
  } = useCartStore()

  const itemCount = items.reduce((total: number, item: any) => total + item.quantity, 0)
  const qualifiesForFreeShipping = itemsPrice > FREE_SHIPPING_MIN_PRICE
  const shippingProgress = Math.min((itemsPrice / FREE_SHIPPING_MIN_PRICE) * 100, 100)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Close sidebar when clicking outside (on backdrop)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-80 sm:w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header with Close Button */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 rounded-xl p-2">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Cart</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Free Shipping Progress */}
            {!qualifiesForFreeShipping && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    Add ${(FREE_SHIPPING_MIN_PRICE - itemsPrice).toFixed(2)} for free shipping
                  </span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {shippingProgress.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {qualifiesForFreeShipping && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <Truck className="h-4 w-4" />
                <span>🎉 You qualify for FREE Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-1 p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  Add some items to get started
                </p>
                <Button 
                  onClick={onClose}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item: any) => (
                  <div 
                    key={item.clientId} 
                    className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <Link 
                        href={`/product/${item.slug || '#'}`}
                        className="flex-shrink-0"
                        onClick={onClose}
                      >
                        <div className="relative h-16 w-16 bg-white dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                              <ShoppingCart className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/product/${item.slug || '#'}`}
                          onClick={onClose}
                        >
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {item.name}
                          </h4>
                        </Link>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-lg font-bold text-gray-900 dark:text-white">
                            <ProductPrice price={item.price * item.quantity} plain />
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1">
                            <Select
                              value={item.quantity.toString()}
                              onValueChange={(value) => {
                                updateItem(item, Number(value))
                              }}
                            >
                              <SelectTrigger className="w-20 h-8 text-xs border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                                {Array.from({ length: Math.min(item.countInStock || 10, 10) }).map(
                                  (_, i) => (
                                    <SelectItem 
                                      value={(i + 1).toString()} 
                                      key={i + 1}
                                      className="text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                      Qty: {i + 1}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => removeItem(item)}
                              className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
                            >
                              <TrashIcon className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-900 dark:text-white">Subtotal:</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  ${itemsPrice.toFixed(2)}
                </span>
              </div>
              
              <Link
                className={cn(
                  buttonVariants(),
                  "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                )}
                href='/cart'
                onClick={onClose}
              >
                View Full Cart
                <ChevronRight className="h-4 w-4" />
              </Link>
              
              <Link
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  "w-full border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 font-medium py-3 rounded-xl transition-all duration-200 hover:scale-105"
                )}
                href='/checkout'
                onClick={onClose}
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}