'use client'

import { getMonthName } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductPrice from '@/components/shared/product/product-price'
import { TrendingUp, ArrowUpRight } from 'lucide-react'

type TableChartProps = {
  labelType: 'month' | 'product'
  data: {
    label: string
    image?: string
    value: number
    id?: string
  }[]
}

interface ProgressBarProps {
  value: number
  className?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, color = 'blue' }) => {
  const boundedValue = Math.min(100, Math.max(0, value))
  
  const colorClasses = {
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-600'
  }

  return (
    <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ease-out rounded-full ${colorClasses[color]} shadow-sm`}
        style={{ width: `${boundedValue}%` }}
      />
      {/* Animated shimmer effect */}
      <div 
        className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"
        style={{ marginLeft: `${boundedValue}%` }}
      />
    </div>
  )
}

export default function TableChart({
  labelType = 'month',
  data = [],
}: TableChartProps) {
  const max = Math.max(...data.map((item) => item.value))
  const total = data.reduce((sum, item) => sum + item.value, 0)
  
  const dataWithPercentage = data.map((x, index) => ({
    ...x,
    label: labelType === 'month' ? getMonthName(x.label) : x.label,
    percentage: Math.round((x.value / max) * 100),
    contribution: Math.round((x.value / total) * 100),
    color: ['blue', 'green', 'purple', 'orange'][index % 4] as 'blue' | 'green' | 'purple' | 'orange'
  }))

  return (
    <div className="space-y-4">
      {dataWithPercentage.map(({ label, id, value, image, percentage, contribution, color }) => (
        <div
          key={label}
          className="group relative p-4 rounded-xl border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300"
        >
          <div className="flex items-center justify-between gap-4">
            {/* Label Section */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {image ? (
                <Link 
                  href={`/admin/products/${id}`}
                  className="flex items-center gap-3 group/link min-w-0 flex-1"
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      className="rounded-lg border border-slate-200 dark:border-slate-700 aspect-square object-cover w-12 h-12 group-hover/link:scale-105 transition-transform duration-200"
                      src={image}
                      alt={label}
                      width={48}
                      height={48}
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm truncate group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                      {label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {contribution}% of total
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors flex-shrink-0" />
                </Link>
              ) : (
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-slate-600 dark:text-slate-300">
                      {label.slice(0, 3)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      {label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {contribution}% of total revenue
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar Section */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="flex-1 min-w-0">
                <ProgressBar value={percentage} color={color} />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Performance
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Value Section */}
            <div className="text-right min-w-[100px]">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                <ProductPrice price={value} plain />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Revenue
              </div>
            </div>
          </div>

          {/* Background pattern on hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 dark:group-hover:from-blue-900/10 dark:group-hover:to-purple-900/10 transition-all duration-300 -z-10" />
        </div>
      ))}
    </div>
  )
}
