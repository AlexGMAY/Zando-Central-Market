// 'use client'
// import { cn, formatCurrency } from '@/lib/utils'

// const ProductPrice = ({
//   price,
//   className,
//   listPrice = 0,
//   isDeal = false,
//   forListing = true,
//   plain = false,
// }: {
//   price: number
//   isDeal?: boolean
//   listPrice?: number
//   className?: string
//   forListing?: boolean
//   plain?: boolean
// }) => {
//   const discountPercent = Math.round(100 - (price / listPrice) * 100)
//   const stringValue = price.toString()
//   const [intValue, floatValue] = stringValue.includes('.')
//     ? stringValue.split('.')
//     : [stringValue, '']

//   return plain ? (
//     formatCurrency(price)
//   ) : listPrice == 0 ? (
//     <div className={cn('text-3xl', className)}>
//       <span className='text-xs align-super'>$</span>
//       {intValue}
//       <span className='text-xs align-super'>{floatValue}</span>
//     </div>
//   ) : isDeal ? (
//     <div className='space-y-2'>
//       <div className='flex justify-center items-center gap-2'>
//         <span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
//           {discountPercent}% Off
//         </span>
//         <span className='text-red-700 text-xs font-bold'>
//           Limited time deal
//         </span>
//       </div>
//       <div
//         className={`flex ${forListing && 'justify-center'} items-center gap-2`}
//       >
//         <div className={cn('text-3xl', className)}>
//           <span className='text-xs align-super'>$</span>
//           {intValue}
//           <span className='text-xs align-super'>{floatValue}</span>
//         </div>
//         <div className='text-muted-foreground text-xs py-2'>
//           Was: <span className='line-through'>{formatCurrency(listPrice)}</span>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className=''>
//       <div className='flex justify-center gap-3'>
//         <div className='text-3xl text-orange-700'>-{discountPercent}%</div>
//         <div className={cn('text-3xl', className)}>
//           <span className='text-xs align-super'>$</span>
//           {intValue}
//           <span className='text-xs align-super'>{floatValue}</span>
//         </div>
//       </div>
//       <div className='text-muted-foreground text-xs py-2'>
//         List price:{' '}
//         <span className='line-through'>{formatCurrency(listPrice)}</span>
//       </div>
//     </div>
//   )
// }

// export default ProductPrice

'use client'
import { cn, formatCurrency } from '@/lib/utils'

const ProductPrice = ({
  price,
  className,
  listPrice = 0,
  isDeal = false,
  forListing = true,
  plain = false,
  variant = 'default',
}: {
  price: number
  isDeal?: boolean
  listPrice?: number
  className?: string
  forListing?: boolean
  plain?: boolean
  variant?: 'default' | 'featured' | 'minimal'
}) => {
  const discountPercent = Math.round(100 - (price / listPrice) * 100)
  const stringValue = price.toString()
  const [intValue, floatValue] = stringValue.includes('.')
    ? stringValue.split('.')
    : [stringValue, '']

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'featured':
        return {
          priceColor: 'text-red-600 dark:text-red-400',
          discountBg: 'bg-gradient-to-r from-red-500 to-orange-500',
          dealText: 'text-red-600 dark:text-red-300',
          discountText: 'text-orange-600 dark:text-orange-400'
        }
      case 'minimal':
        return {
          priceColor: 'text-green-600 dark:text-green-400',
          discountBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
          dealText: 'text-green-600 dark:text-green-300',
          discountText: 'text-emerald-600 dark:text-emerald-400'
        }
      default:
        return {
          priceColor: isDeal ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white',
          discountBg: 'bg-red-600',
          dealText: 'text-red-700 dark:text-red-300',
          discountText: 'text-orange-700 dark:text-orange-400'
        }
    }
  }

  const styles = getVariantStyles()

  return plain ? (
    formatCurrency(price)
  ) : listPrice == 0 ? (
    <div className={cn('text-3xl font-bold', styles.priceColor, className)}>
      <span className='text-xs align-super'>$</span>
      {intValue}
      <span className='text-xs align-super'>{floatValue}</span>
    </div>
  ) : isDeal ? (
    <div className='space-y-2'>
      <div className='flex justify-center items-center gap-2'>
        <span className={cn('rounded-sm p-1 text-white text-sm font-semibold', styles.discountBg)}>
          {discountPercent}% Off
        </span>
        <span className={cn('text-xs font-bold', styles.dealText)}>
          Limited time deal
        </span>
      </div>
      <div
        className={`flex ${forListing && 'justify-center'} items-center gap-2`}
      >
        <div className={cn('text-3xl font-bold', styles.priceColor, className)}>
          <span className='text-xs align-super'>$</span>
          {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
        <div className='text-muted-foreground text-xs py-2'>
          Was: <span className='line-through'>{formatCurrency(listPrice)}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className=''>
      <div className='flex justify-center gap-3'>
        <div className={cn('text-3xl font-bold', styles.discountText)}>-{discountPercent}%</div>
        <div className={cn('text-3xl font-bold', styles.priceColor, className)}>
          <span className='text-xs align-super'>$</span>
          {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
      </div>
      <div className='text-muted-foreground text-xs py-2'>
        List price:{' '}
        <span className='line-through'>{formatCurrency(listPrice)}</span>
      </div>
    </div>
  )
}

export default ProductPrice
