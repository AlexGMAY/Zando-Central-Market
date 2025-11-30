// import React from 'react'
// import { Star } from 'lucide-react'

// export default function Rating({
//   rating = 0,
//   size = 6,
// }: {
//   rating: number
//   size?: number
// }) {
//   const fullStars = Math.floor(rating)
//   const partialStar = rating % 1
//   const emptyStars = 5 - Math.ceil(rating)

//   return (
//     <div
//       className='flex items-center'
//       aria-label={`Rating: ${rating} out of 5 stars`}
//     >
//       {[...Array(fullStars)].map((_, i) => (
//         <Star
//           key={`full-${i}`}
//           className={`w-${size} h-${size} fill-primary text-primary`}
//         />
//       ))}
//       {partialStar > 0 && (
//         <div className='relative'>
//           <Star className={`w-${size} h-${size} text-primary`} />
//           <div
//             className='absolute top-0 left-0 overflow-hidden'
//             style={{ width: `${partialStar * 100}%` }}
//           >
//             <Star className='w-6 h-6 fill-primary text-primary' />
//           </div>
//         </div>
//       )}
//       {[...Array(emptyStars)].map((_, i) => (
//         <Star
//           key={`empty-${i}`}
//           className={`w-${size} h-${size}  text-primary`}
//         />
//       ))}
//     </div>
//   )
// }

import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Rating({
  rating = 0,
  size = 'md',
  showNumber = false,
  className,
}: {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}) {
  const fullStars = Math.floor(rating)
  const partialStar = rating % 1
  const emptyStars = 5 - Math.ceil(rating)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        className
      )}
      aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
    >
      {/* Stars */}
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(
              sizeClasses[size],
              'fill-amber-400 text-amber-400 transition-all duration-200'
            )}
          />
        ))}
        
        {partialStar > 0 && (
          <div className='relative'>
            {/* Empty star background */}
            <Star className={cn(sizeClasses[size], 'text-gray-300 dark:text-gray-600')} />
            {/* Partial fill */}
            <div
              className='absolute top-0 left-0 overflow-hidden'
              style={{ width: `${partialStar * 100}%` }}
            >
              <Star className={cn(
                sizeClasses[size],
                'fill-amber-400 text-amber-400'
              )} />
            </div>
          </div>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(
              sizeClasses[size],
              'text-gray-300 dark:text-gray-600 transition-all duration-200'
            )}
          />
        ))}
      </div>

      {/* Rating Number */}
      {showNumber && (
        <span className={cn(
          'font-semibold text-gray-700 dark:text-gray-300 ml-1',
          textSizes[size]
        )}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

