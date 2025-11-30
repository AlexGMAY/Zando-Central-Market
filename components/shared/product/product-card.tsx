import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { IProduct } from '@/lib/db/models/product.model'
import Rating from './rating'
import { formatNumber, generateId, round2 } from '@/lib/utils'
import ProductPrice from './product-price'
import AddToCart from './add-to-cart'
import { Heart, Eye, Zap, Star, TrendingUp, Shield, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ProductCard = ({
  product,
  hideBorder = false,
  hideDetails = false,
  hideAddToCart = false,
  variant = 'default',
}: {
  product: IProduct
  hideDetails?: boolean
  hideBorder?: boolean
  hideAddToCart?: boolean
  variant?: 'default' | 'featured' | 'minimal'
}) => {
  const getVariantConfig = () => {
    switch (variant) {
      case 'featured':
        return {
          card: 'bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-800 dark:to-orange-950/10 border-2 border-orange-200/50 dark:border-orange-800/50 shadow-2xl hover:shadow-3xl',
          imageContainer: 'h-80',
          badge: (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold flex items-center gap-2 z-10 shadow-2xl">
              <Zap className="h-4 w-4" fill="currentColor" />
              HOT DEAL
            </div>
          ),
          premium: true
        }
      case 'minimal':
        return {
          card: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg',
          imageContainer: 'h-60',
          badge: product.tags.includes('new-arrival') ? (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
              NEW
            </div>
          ) : null,
          premium: false
        }
      default:
        return {
          card: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl',
          imageContainer: 'h-72',
          badge: product.tags.includes('todays-deal') ? (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl">
              DEAL
            </div>
          ) : product.tags.includes('best-seller') ? (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-2xl flex items-center gap-2">
              <Star className="h-4 w-4" fill="currentColor" />
              BEST SELLER
            </div>
          ) : null,
          premium: true
        }
    }
  }

  const config = getVariantConfig()

  const ProductImage = () => (
    <div className="relative group">
      <Link href={`/product/${product.slug}`}>
        <div className={`relative ${config.imageContainer} w-full flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl`}>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain w-auto h-auto max-w-full max-h-full transition-all duration-700 group-hover:scale-110"
              priority={variant === 'featured'}
            />
          </div>
          
          {/* Premium Overlay Effects */}
          {config.premium && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium">
                  <Eye className="h-4 w-4" />
                  Quick View
                </div>
              </div>
            </>
          )}
          
          {/* Badge */}
          {config.badge}
          
          {/* Wishlist Button */}
          <Button 
            variant="secondary" 
            size="icon"
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </Link>
      
      {/* Stock & Shipping Info */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        {product.countInStock < 10 && product.countInStock > 0 && (
          <div className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg">
            🔥 Only {product.countInStock} left
          </div>
        )}
        {product.countInStock > 50 && (
          <div className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
            <Truck className="h-3 w-3" />
            Fast Shipping
          </div>
        )}
      </div>
    </div>
  )

  const ProductDetails = () => (
    <div className="space-y-4 p-2">
      {/* Brand & Trust Badges */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
            {product.brand}
          </span>
          {variant === 'featured' && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800">
              <Shield className="h-3 w-3 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                Premium
              </span>
            </div>
          )}
        </div>
        
        {/* Rating Display */}
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          <Star className="h-3 w-3 text-amber-500 fill-current" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
            {product.avgRating}
          </span>
        </div>
      </div>

      {/* Product Name */}
      <Link href={`/product/${product.slug}`}>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>
      </Link>

      {/* Review Count */}
      <div className="flex items-center gap-2">
        <Rating rating={product.avgRating} />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          ({formatNumber(product.numReviews)} reviews)
        </span>
      </div>

      {/* Price Section */}
      <div className="space-y-2">
        <ProductPrice
          isDeal={product.tags.includes('todays-deal')}
          price={product.price}
          listPrice={product.listPrice}
          forListing
          variant={variant}
        />
        
        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>⭐ 30-day returns</span>
          <span>🚚 Free shipping</span>
        </div>
      </div>
    </div>
  )

  const AddToCartButton = () => (
    <div className="px-2 pb-2">
      <AddToCart
        minimal
        item={{
          clientId: generateId(),
          product: product._id,
          size: product.sizes[0],
          color: product.colors[0],
          countInStock: product.countInStock,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: round2(product.price),
          quantity: 1,
          image: product.images[0],
        }}
        variant={variant}
      />
    </div>
  )

  // For minimal variant (clean, no card wrapper)
  if (hideBorder || variant === 'minimal') {
    return (
      <div className="group flex flex-col bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-4 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-500">
        <ProductImage />
        {!hideDetails && <ProductDetails />}
        {!hideAddToCart && <AddToCartButton />}
      </div>
    )
  }

  // Main premium card
  return (
    <Card className={`group flex flex-col overflow-visible transition-all duration-700 hover:scale-105 ${config.card} rounded-3xl`}>
      <CardContent className="p-6 flex flex-col flex-1 space-y-4">
        <ProductImage />
        <div className="flex-1 flex flex-col justify-between space-y-4">
          {!hideDetails && <ProductDetails />}
          {!hideAddToCart && <AddToCartButton />}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
