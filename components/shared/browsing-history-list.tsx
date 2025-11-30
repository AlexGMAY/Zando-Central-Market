'use client'
import useBrowsingHistory from '@/hooks/use-browsing-history'
import React, { useEffect } from 'react'
import ProductSlider from './product/product-slider'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'
import { History, Eye, Clock } from 'lucide-react'

export default function BrowsingHistoryList({
  className,
}: {
  className?: string
}) {
  const { products } = useBrowsingHistory()
  
  if (products.length === 0) return null

  return (
    <div className={cn('bg-transparent space-y-8', className)}>
      <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 h-0.5" />
      
      <ProductList
        title={"Related to items you've viewed"}
        subtitle="Discover more based on your interests"
        type='related'
        icon={<Eye className="h-5 w-5" />}
      />
      
      <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600 h-0.5" />
      
      <ProductList
        title={'Your Browsing History'}
        subtitle="Pick up where you left off"
        hideDetails
        type='history'
        icon={<Clock className="h-5 w-5" />}
      />
    </div>
  )
}

function ProductList({
  title,
  subtitle,
  type = 'history',
  hideDetails = false,
  icon,
}: {
  title: string
  subtitle?: string
  type: 'history' | 'related'
  hideDetails?: boolean
  icon?: React.ReactNode
}) {
  const { products } = useBrowsingHistory()
  const [data, setData] = React.useState([])
  
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&categories=${products
          .map((product) => product.category)
          .join(',')}&ids=${products.map((product) => product.id).join(',')}`
      )
      const data = await res.json()
      setData(data)
    }
    fetchProducts()
  }, [products, type])

  if (data.length === 0) return null

  return (
    <div className="space-y-4">
      {/* Enhanced Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl text-white">
          {icon || <History className="h-6 w-6" />}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <ProductSlider 
        products={data} 
        hideDetails={hideDetails}
        variant={type === 'related' ? 'default' : 'minimal'}
      />
    </div>
  )
}
