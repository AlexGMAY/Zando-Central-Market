'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useCartStore from '@/hooks/use-cart-store'
import { useToast } from '@/hooks/use-toast'
import { OrderItem } from '@/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ShoppingCart, Zap, TrendingUp, ArrowRight } from 'lucide-react'

export default function AddToCart({
  item,
  minimal = false,
  variant = 'default',
  compact = false,
}: {
  item: OrderItem
  minimal?: boolean
  variant?: 'default' | 'featured' | 'minimal'
  compact?: boolean
}) {
  const router = useRouter()
  const { toast } = useToast()

  const { addItem } = useCartStore()

  const [quantity, setQuantity] = useState(1)

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'featured':
        return {
          button: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl',
          secondaryButton: 'bg-orange-100 hover:bg-orange-200 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
          icon: <Zap className="h-4 w-4 mr-2" />
        }
      case 'minimal':
        return {
          button: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white',
          secondaryButton: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
          icon: <TrendingUp className="h-4 w-4 mr-2" />
        }
      default:
        return {
          button: 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg',
          secondaryButton: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
          icon: <ShoppingCart className="h-4 w-4 mr-2" />
        }
    }
  }

  const styles = getVariantStyles()

  const handleAddToCart = () => {
    try {
      addItem(item, 1)
      toast({
        description: '🎉 Added to Cart',
        action: (
          <Button
            onClick={() => {
              router.push('/cart')
            }}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            View Cart
          </Button>
        ),
      })
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message,
      })
    }
  }

  const handleBuyNow = () => {
    try {
      addItem(item, quantity)
      router.push(`/checkout`)
    } catch (error: any) {
      toast({
        variant: 'destructive',
        description: error.message,
      })
    }
  }

  // Compact version for product cards
  if (minimal || compact) {
    return (
      <Button
        className={`w-full transition-all duration-200 hover:scale-105 ${styles.button}`}
        onClick={handleAddToCart}
        size={compact ? "sm" : "default"}
      >
        {styles.icon}
        Add to Cart
      </Button>
    )
  }

  // Full version for product page
  return (
    <div className='w-full space-y-3'>
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Quantity
        </label>
        <Select
          value={quantity.toString()}
          onValueChange={(i) => setQuantity(Number(i))}
        >
          <SelectTrigger className='w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500'>
            <SelectValue>Qty: {quantity}</SelectValue>
          </SelectTrigger>
          <SelectContent 
            position='popper' 
            className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 max-h-60"
          >
            {Array.from({ length: Math.min(item.countInStock, 10) }).map((_, i) => (
              <SelectItem 
                key={i + 1} 
                value={`${i + 1}`}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700"
              >
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-2 ${compact ? 'flex-col' : 'flex-col sm:flex-row lg:flex-col'}`}>
        <Button
          className={`flex-1 transition-all duration-200 hover:scale-105 ${styles.button}`}
          onClick={handleAddToCart}
          size="lg"
        >
          {styles.icon}
          Add to Cart
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleBuyNow}
          className={`flex-1 transition-all duration-200 hover:scale-105 border-2 ${styles.secondaryButton}`}
          size="lg"
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </div>
  )
}

// components/cart/AddToCartButton.tsx
// components/cart/AddToCartButton.tsx
// 'use client'

// import React from 'react'
// import useCartStore from '@/hooks/use-cart-store'

// interface AddToCartButtonProps {
//   product: {
//     _id: string
//     name: string
//     price: number
//     images: string[]
//     countInStock: number
//     sizes: string[]
//     colors: string[]
//   }
//   selectedSize?: string
//   selectedColor?: string
//   className?: string
// }

// export default function AddToCartButton({ 
//   product, 
//   selectedSize, 
//   selectedColor,
//   className = "w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors" 
// }: AddToCartButtonProps) {
//   const addItem = useCartStore(state => state.addItem)

//   const handleAddToCart = async () => {
//     try {
//       // Validate variant selection
//       if ((product.sizes.length > 0 && !selectedSize) || (product.colors.length > 0 && !selectedColor)) {
//         alert('Please select size and color')
//         return
//       }

//       // Create unique ID for this variant combination
//       const variantId = `${product._id}-${selectedSize || ''}-${selectedColor || ''}`

//       addItem({
//         id: variantId,
//         name: product.name,
//         price: product.price,
//         image: product.images[0],
//         size: selectedSize,
//         color: selectedColor,
//         countInStock: product.countInStock,
//       })

//     } catch (error: any) {
//       alert(error.message) // Show stock error
//     }
//   }

//   // Check if button should be disabled
//   const isOutOfStock = product.countInStock <= 0
//   const isVariantRequired = (product.sizes.length > 0 || product.colors.length > 0) 
//   const hasSelectedVariant = (!product.sizes.length || selectedSize) && (!product.colors.length || selectedColor)
//   const isDisabled = isOutOfStock || (isVariantRequired && !hasSelectedVariant)

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={isDisabled}
//       className={`${className} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
//     >
//       {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
//     </button>
//   )
// }
