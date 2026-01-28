'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getFilterUrl } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ArrowUpDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProductSortSelector({
  sortOrders,
  sort,
  params,
}: {
  sortOrders: { value: string; name: string }[]
  sort: string
  params: {
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }
}) {
  const router = useRouter()
  const currentSort = sortOrders.find((s) => s.value === sort)

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
        <ArrowUpDown className="h-4 w-4" />
        Sort by:
      </div>
      
      <Select
        onValueChange={(v) => {
          router.push(getFilterUrl({ params, sort: v }))
        }}
        value={sort}
      >
        <SelectTrigger className="min-w-[150px] border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md">
          <div className="flex items-center gap-2">
            <SelectValue>
              <span className="font-semibold text-gray-900 dark:text-white">
                {currentSort?.name}
              </span>
            </SelectValue>
          </div>
          {/* <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" /> */}
        </SelectTrigger>

        <SelectContent 
          className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl rounded-xl min-w-[200px]"
          position="popper"
          align="end"
        >
          {sortOrders.map((s) => (
            <SelectItem 
              key={s.value} 
              value={s.value}
              className={cn(
                "flex items-center justify-between py-3 px-4 text-gray-900 dark:text-gray-100 cursor-pointer transition-all duration-150",
                "hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300",
                "focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-700 dark:focus:text-blue-300",
                sort === s.value && "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold"
              )}
            >
              <span>{s.name}</span>
              {sort === s.value && (
                <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
