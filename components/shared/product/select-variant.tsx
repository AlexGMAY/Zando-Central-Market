import { Button } from '@/components/ui/button'
import { IProduct } from '@/lib/db/models/product.model'
import Link from 'next/link'
import { Palette, Ruler, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function SelectVariant({
  product,
  size,
  color,
}: {
  product: IProduct
  color: string
  size: string
}) {
  const selectedColor = color || product.colors[0]
  const selectedSize = size || product.sizes[0]

  return (
    <div className="space-y-6">
      {/* Colors Section */}
      {product.colors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-blue-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Color</h3>
            <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              {selectedColor}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {product.colors.map((x: string) => (
              <Button
                asChild
                variant="outline"
                className={cn(
                  "relative border-2 transition-all duration-200 hover:scale-105 hover:shadow-md",
                  selectedColor === x 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
                key={x}
                size="sm"
              >
                <Link
                  replace
                  scroll={false}
                  href={`?${new URLSearchParams({
                    color: x,
                    size: selectedSize,
                  })}`}
                  className="flex items-center gap-2 px-3 py-2"
                >
                  {/* Color Swatch */}
                  <div className="relative">
                    <div
                      style={{ backgroundColor: x.toLowerCase() }}
                      className={cn(
                        "h-6 w-6 rounded-full border-2 transition-all",
                        selectedColor === x 
                          ? 'border-white dark:border-gray-800 shadow-md' 
                          : 'border-gray-300 dark:border-gray-600'
                      )}
                    />
                    {selectedColor === x && (
                      <Check className="absolute -top-1 -right-1 h-3 w-3 text-white bg-blue-500 rounded-full p-0.5" />
                    )}
                  </div>
                  
                  <span className={cn(
                    "text-sm font-medium transition-colors",
                    selectedColor === x 
                      ? 'text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300'
                  )}>
                    {x}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes Section */}
      {product.sizes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-green-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Size</h3>
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              {selectedSize}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((x: string) => (
              <Button
                asChild
                variant="outline"
                className={cn(
                  "relative border-2 transition-all duration-200 hover:scale-105 hover:shadow-md min-w-12",
                  selectedSize === x 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 shadow-sm font-semibold' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                )}
                key={x}
                size="sm"
              >
                <Link
                  replace
                  scroll={false}
                  href={`?${new URLSearchParams({
                    color: selectedColor,
                    size: x,
                  })}`}
                  className="px-3 py-2"
                >
                  {selectedSize === x && (
                    <Check className="absolute -top-1 -right-1 h-3 w-3 text-white bg-green-500 rounded-full p-0.5" />
                  )}
                  {x}
                </Link>
              </Button>
            ))}
          </div>
          
          {/* Size Guide Link */}
          <div className="pt-2">
            <Link 
              href="/size-guide" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              View size guide →
            </Link>
          </div>
        </div>
      )}

      {/* Selected Variant Summary */}
      {(product.colors.length > 0 || product.sizes.length > 0) && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Selected Variant</p>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                {product.colors.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span>Color:</span>
                    <div className="flex items-center gap-1">
                      <div 
                        style={{ backgroundColor: selectedColor.toLowerCase() }}
                        className="h-3 w-3 rounded-full border border-gray-300 dark:border-gray-600"
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300">{selectedColor}</span>
                    </div>
                  </div>
                )}
                {product.sizes.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span>Size:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{selectedSize}</span>
                  </div>
                )}
              </div>
            </div>            
          </div>
        </div>
      )}
    </div>
  )
}
