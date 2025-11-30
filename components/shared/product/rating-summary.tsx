// 'use client'

// import { Progress } from '@/components/ui/progress'
// import Rating from './rating'
// import { Separator } from '@/components/ui/separator'
// import Link from 'next/link'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover'
// import { Button } from '@/components/ui/button'
// import { ChevronDownIcon } from 'lucide-react'

// type RatingSummaryProps = {
//   asPopover?: boolean
//   avgRating: number
//   numReviews: number
//   ratingDistribution: {
//     rating: number
//     count: number
//   }[]
// }

// export default function RatingSummary({
//   asPopover,
//   avgRating = 0,
//   numReviews = 0,
//   ratingDistribution = [],
// }: RatingSummaryProps) {
//   const RatingDistribution = () => {
//     const ratingPercentageDistribution = ratingDistribution.map((x) => ({
//       ...x,
//       percentage: Math.round((x.count / numReviews) * 100),
//     }))

//     return (
//       <>
//         <div className='flex flex-wrap items-center gap-1 cursor-help'>
//           <Rating rating={avgRating} />
//           <span className='text-lg font-semibold'>
//             {avgRating.toFixed(1)} out of 5
//           </span>
//         </div>
//         <div className='text-lg '>{numReviews} ratings</div>

//         <div className='space-y-3'>
//           {ratingPercentageDistribution
//             .sort((a, b) => b.rating - a.rating)
//             .map(({ rating, percentage }) => (
//               <div
//                 key={rating}
//                 className='grid grid-cols-[50px_1fr_30px] gap-2 items-center'
//               >
//                 <div className='text-sm'> {rating} star</div>
//                 <Progress value={percentage} className='h-4' />
//                 <div className='text-sm text-right'>{percentage}%</div>
//               </div>
//             ))}
//         </div>
//       </>
//     )
//   }

//   return asPopover ? (
//     <div className='flex items-center gap-1'>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button variant='ghost' className='px-2 [&_svg]:size-6 text-base'>
//             <span>{avgRating.toFixed(1)}</span>
//             <Rating rating={avgRating} />
//             <ChevronDownIcon className='w-5 h-5 text-muted-foreground' />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className='w-auto p-4' align='end'>
//           <div className='flex flex-col gap-2'>
//             <RatingDistribution />
//             <Separator />

//             <Link className='highlight-link text-center' href='#reviews'>
//               See customer reviews
//             </Link>
//           </div>
//         </PopoverContent>
//       </Popover>
//       <div className=' '>
//         <Link href='#reviews' className='highlight-link'>
//           {numReviews} ratings
//         </Link>
//       </div>
//     </div>
//   ) : (
//     <RatingDistribution />
//   )
// }


'use client'

import { Progress } from '@/components/ui/progress'
import Rating from './rating'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon, Star, Users, BarChart3 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type RatingSummaryProps = {
  asPopover?: boolean
  avgRating: number
  numReviews: number
  ratingDistribution: {
    rating: number
    count: number
  }[]
}

export default function RatingSummary({
  asPopover,
  avgRating = 0,
  numReviews = 0,
  ratingDistribution = [],
}: RatingSummaryProps) {
  const RatingDistribution = () => {
    const ratingPercentageDistribution = ratingDistribution.map((x) => ({
      ...x,
      percentage: Math.round((x.count / numReviews) * 100),
    }))

    return (
      <div className="space-y-6">
        {/* Header with Overall Rating */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl p-4">
              <span className="text-3xl font-bold">{avgRating.toFixed(1)}</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <Rating rating={avgRating} size="lg" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {avgRating.toFixed(1)} out of 5
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">{numReviews.toLocaleString()} customer ratings</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Rating Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Rating Breakdown</h3>
          </div>
          
          <div className="space-y-3">
            {ratingPercentageDistribution
              .sort((a, b) => b.rating - a.rating)
              .map(({ rating, percentage, count }) => (
                <div
                  key={rating}
                  className="grid grid-cols-[80px_1fr_60px_40px] gap-3 items-center group hover:bg-gray-50 dark:hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-6">
                      {rating}
                    </span>
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                  </div>
                  
                  <Progress 
                    value={percentage} 
                    className="h-3 bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors"
                  />
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                    {percentage}%
                  </div>
                  
                  <div className="text-xs text-gray-500 dark:text-gray-500 text-right">
                    ({count})
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* Call to Action */}
        <div className="text-center">
          <Link 
            href='#reviews' 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
          >
            <span>Read all customer reviews</span>
            <ChevronDownIcon className="h-4 w-4 transform group-hover:translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    )
  }

  return asPopover ? (
    <div className="flex items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="px-4 py-2 border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-500 fill-current" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {avgRating.toFixed(1)}
                </span>
              </div>
              <Rating rating={avgRating} size="sm" />
              <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-6 border-0 shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl" 
          align="start"
        >
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <RatingDistribution />
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
      
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <Link 
          href='#reviews' 
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
        >
          {numReviews.toLocaleString()} ratings
        </Link>
      </div>
    </div>
  ) : (
    <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <RatingDistribution />
      </CardContent>
    </Card>
  )
}
