'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import ProductCard from './product-card'
import { IProduct } from '@/lib/db/models/product.model'
import { Sparkles, Zap, TrendingUp } from 'lucide-react'

export default function ProductSlider({
  title,
  products,
  hideDetails = false,
  variant = 'default',
}: {
  title?: string
  products: IProduct[]
  hideDetails?: boolean
  variant?: 'default' | 'featured' | 'minimal'
}) {
  const getVariantConfig = () => {
    switch (variant) {
      case 'featured':
        return {
          itemClass: 'md:basis-1/3 lg:basis-1/4',
          icon: <Zap className="h-5 w-5" />,
          gradient: 'from-red-500 to-orange-500'
        }
      case 'minimal':
        return {
          itemClass: 'md:basis-1/4 lg:basis-1/5',
          icon: <TrendingUp className="h-5 w-5" />,
          gradient: 'from-green-500 to-emerald-500'
        }
      default:
        return {
          itemClass: hideDetails ? 'md:basis-1/4 lg:basis-1/6' : 'md:basis-1/3 lg:basis-1/4',
          icon: <Sparkles className="h-5 w-5" />,
          gradient: 'from-blue-500 to-purple-500'
        }
    }
  }

  const config = getVariantConfig()

  return (
    <div className="w-full relative">
      {/* Enhanced Header */}
      {title && (
        <div className="flex items-center gap-3 mb-8">
          <div className={`w-1 h-8 bg-gradient-to-b ${config.gradient} rounded-full`} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {config.icon && (
            <div className={`p-2 rounded-lg bg-gradient-to-r ${config.gradient} text-white`}>
              {config.icon}
            </div>
          )}
        </div>
      )}

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full relative group"
      >
        <CarouselContent className="py-8 -ml-2 md:-ml-4">
          {products.map((product, index) => (
            <CarouselItem
              key={product.slug}
              className={`pl-2 md:pl-4 ${config.itemClass}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="h-full transform hover:scale-105 transition-transform duration-300">
                <ProductCard
                  hideDetails={hideDetails}
                  hideAddToCart={variant === 'minimal'}
                  hideBorder={variant === 'minimal'}
                  product={product}
                  variant={variant}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Navigation */}
        <CarouselPrevious className="left-0 md:-left-12 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800" />
        <CarouselNext className="right-0 md:-right-12 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800" />
      </Carousel>

      {/* Progress Indicator */}
      <div className="flex justify-center gap-1 mt-6">
        {products.slice(0, 6).map((_, index) => (
          <div
            key={index}
            className="w-2 h-1 bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 hover:bg-gray-400"
          />
        ))}
      </div>
    </div>
  )
}
