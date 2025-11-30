// import { SearchIcon } from 'lucide-react'
// import { Input } from '@/components/ui/input'

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { APP_NAME } from '@/lib/constants'
// import { getAllCategories } from '@/lib/actions/product.actions'

// export default async function Search() {
//   const categories = await getAllCategories()
//   return (
//     <form action='/search' method='GET' className='flex  items-stretch h-10 '>
//       <Select name='category'>
//         <SelectTrigger className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md'>
//           <SelectValue placeholder='All' />
//         </SelectTrigger>
//         <SelectContent position='popper'>
//           <SelectItem value='all'>All</SelectItem>
//           {categories.map((category) => (
//             <SelectItem key={category} value={category}>
//               {category}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       <Input
//         className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
//         placeholder={`Search Site ${APP_NAME}`}
//         name='q'
//         type='search'
//       />
//       <button
//         type='submit'
//         className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2 '
//       >
//         <SearchIcon className='w-6 h-6' />
//       </button>
//     </form>
//   )
// }

import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { APP_NAME } from '@/lib/constants'
import { getAllCategories } from '@/lib/actions/product.actions'

export default async function Search() {
  const categories = await getAllCategories()
  
  return (
    <form 
      action='/search' 
      method='GET' 
      className='flex items-stretch h-10 group relative'
    >
      {/* Category Filter */}
      <Select name='category'>
        <SelectTrigger className='w-32 h-full bg-white/10 backdrop-blur-sm border-gray-600 text-white rounded-r-none border-r-0 transition-all duration-200 hover:bg-white/15 focus:ring-2 focus:ring-blue-500'>
          <SelectValue placeholder='All' />
        </SelectTrigger>
        <SelectContent position='popper' className='bg-gray-800 border-gray-600 text-white'>
          <SelectItem value='all' className='focus:bg-gray-700'>All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem 
              key={category} 
              value={category}
              className='focus:bg-gray-700 transition-colors'
            >
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Input */}
      <Input
        className='flex-1 rounded-none bg-white/5 backdrop-blur-sm border-gray-600 text-white placeholder-gray-300 text-base h-full border-x-0 focus-visible:ring-2 focus-visible:ring-blue-500 transition-all'
        placeholder={`Search ${APP_NAME}...`}
        name='q'
        type='search'
      />

      {/* Search Button */}
      <button
        type='submit'
        className='bg-primary text-primary-foreground text-white rounded-l-none rounded-r-lg h-full px-4 py-2 transition-all duration-200 hover:bg-blue-700 focus:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none flex items-center justify-center min-w-[44px]'
        aria-label='Search'
      >
        <SearchIcon className='w-5 h-5' />
      </button>
    </form>
  )
}
