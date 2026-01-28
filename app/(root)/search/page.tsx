// import Link from 'next/link'

// import Pagination from '@/components/shared/pagination'
// import ProductCard from '@/components/shared/product/product-card'
// import { Button } from '@/components/ui/button'
// import {
//   getAllCategories,
//   getAllProducts,
//   getAllTags,
// } from '@/lib/actions/product.actions'
// import { IProduct } from '@/lib/db/models/product.model'
// import ProductSortSelector from '@/components/shared/product/product-sort-selector'
// import { getFilterUrl, toSlug } from '@/lib/utils'
// import Rating from '@/components/shared/product/rating'

// import CollapsibleOnMobile from '@/components/shared/collapsible-on-mobile'

// const sortOrders = [
//   { value: 'price-low-to-high', name: 'Price: Low to high' },
//   { value: 'price-high-to-low', name: 'Price: High to low' },
//   { value: 'newest-arrivals', name: 'Newest arrivals' },
//   { value: 'avg-customer-review', name: 'Avg. customer review' },
//   { value: 'best-selling', name: 'Best selling' },
// ]

// const prices = [
//   {
//     name: '$1 to $20',
//     value: '1-20',
//   },
//   {
//     name: '$21 to $50',
//     value: '21-50',
//   },
//   {
//     name: '$51 to $1000',
//     value: '51-1000',
//   },
// ]

// export async function generateMetadata(props: {
//   searchParams: Promise<{
//     q: string
//     category: string
//     tag: string
//     price: string
//     rating: string
//     sort: string
//     page: string
//   }>
// }) {
//   const searchParams = await props.searchParams
//   const {
//     q = 'all',
//     category = 'all',
//     tag = 'all',
//     price = 'all',
//     rating = 'all',
//   } = searchParams

//   if (
//     (q !== 'all' && q !== '') ||
//     category !== 'all' ||
//     tag !== 'all' ||
//     rating !== 'all' ||
//     price !== 'all'
//   ) {
//     return {
//       title: `Search ${q !== 'all' ? q : ''}
//           ${category !== 'all' ? ` : Category ${category}` : ''}
//           ${tag !== 'all' ? ` : Tag ${tag}` : ''}
//           ${price !== 'all' ? ` : Price ${price}` : ''}
//           ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
//     }
//   } else {
//     return {
//       title: 'Search Products',
//     }
//   }
// }

// export default async function SearchPage(props: {
//   searchParams: Promise<{
//     q: string
//     category: string
//     tag: string
//     price: string
//     rating: string
//     sort: string
//     page: string
//   }>
// }) {
//   const searchParams = await props.searchParams

//   const {
//     q = 'all',
//     category = 'all',
//     tag = 'all',
//     price = 'all',
//     rating = 'all',
//     sort = 'best-selling',
//     page = '1',
//   } = searchParams

//   const params = { q, category, tag, price, rating, sort, page }

//   const categories = await getAllCategories()
//   const tags = await getAllTags()
//   const data = await getAllProducts({
//     category,
//     tag,
//     query: q,
//     price,
//     rating,
//     page: Number(page),
//     sort,
//   })
//   return (
//     <div>
//       <div className='mb-2 py-2 md:border-b flex-between flex-col md:flex-row '>
//         <div className='flex items-center'>
//           {data.totalProducts === 0
//             ? 'No'
//             : `${data.from}-${data.to} of ${data.totalProducts}`}{' '}
//           results
//           {(q !== 'all' && q !== '') ||
//           (category !== 'all' && category !== '') ||
//           (tag !== 'all' && tag !== '') ||
//           rating !== 'all' ||
//           price !== 'all'
//             ? ` for `
//             : null}
//           {q !== 'all' && q !== '' && '"' + q + '"'}
//           {category !== 'all' && category !== '' && `  Category: ` + category}
//           {tag !== 'all' && tag !== '' && `   Tag: ` + tag}
//           {price !== 'all' && `    Price: ` + price}
//           {rating !== 'all' && `   Rating: ` + rating + ` & up`}
//           &nbsp;
//           {(q !== 'all' && q !== '') ||
//           (category !== 'all' && category !== '') ||
//           (tag !== 'all' && tag !== '') ||
//           rating !== 'all' ||
//           price !== 'all' ? (
//             <Button variant={'link'} asChild>
//               <Link href='/search'>Clear</Link>
//             </Button>
//           ) : null}
//         </div>
//         <div>
//           <ProductSortSelector
//             sortOrders={sortOrders}
//             sort={sort}
//             params={params}
//           />
//         </div>
//       </div>
//       <div className='bg-card grid md:grid-cols-5 md:gap-4'>
//         <CollapsibleOnMobile title='Filters'>
//           <div className='space-y-4'>
//             <div>
//               <div className='font-bold'>Department</div>
//               <ul>
//                 <li>
//                   <Link
//                     className={`${
//                       ('all' === category || '' === category) && 'text-primary'
//                     }`}
//                     href={getFilterUrl({ category: 'all', params })}
//                   >
//                     All
//                   </Link>
//                 </li>
//                 {categories.map((c: string) => (
//                   <li key={c}>
//                     <Link
//                       className={`${c === category && 'text-primary'}`}
//                       href={getFilterUrl({ category: c, params })}
//                     >
//                       {c}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <div className='font-bold'>Price</div>
//               <ul>
//                 <li>
//                   <Link
//                     className={`${'all' === price && 'text-primary'}`}
//                     href={getFilterUrl({ price: 'all', params })}
//                   >
//                     All
//                   </Link>
//                 </li>
//                 {prices.map((p) => (
//                   <li key={p.value}>
//                     <Link
//                       href={getFilterUrl({ price: p.value, params })}
//                       className={`${p.value === price && 'text-primary'}`}
//                     >
//                       {p.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <div className='font-bold'>Customer Review</div>
//               <ul>
//                 <li>
//                   <Link
//                     href={getFilterUrl({ rating: 'all', params })}
//                     className={`${'all' === rating && 'text-primary'}`}
//                   >
//                     All
//                   </Link>
//                 </li>

//                 <li>
//                   <Link
//                     href={getFilterUrl({ rating: '4', params })}
//                     className={`${'4' === rating && 'text-primary'}`}
//                   >
//                     <div className='flex'>
//                       <Rating size={4} rating={4} /> & Up
//                     </div>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <div className='font-bold'>Tag</div>
//               <ul>
//                 <li>
//                   <Link
//                     className={`${
//                       ('all' === tag || '' === tag) && 'text-primary'
//                     }`}
//                     href={getFilterUrl({ tag: 'all', params })}
//                   >
//                     All
//                   </Link>
//                 </li>
//                 {tags.map((t: string) => (
//                   <li key={t}>
//                     <Link
//                       className={`${toSlug(t) === tag && 'text-primary'}`}
//                       href={getFilterUrl({ tag: t, params })}
//                     >
//                       {t}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </CollapsibleOnMobile>

//         <div className='md:col-span-4 space-y-4'>
//           <div>
//             <div className='font-bold text-xl'>Results</div>
//             <div>Check each product page for other buying options</div>
//           </div>

//           <div className='grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3  '>
//             {data.products.length === 0 && <div>No product found</div>}
//             {data.products.map((product: IProduct) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//           {data!.totalPages! > 1 && (
//             <Pagination page={page} totalPages={data.totalPages} />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from 'next/link'
import Pagination from '@/components/shared/pagination'
import ProductCard from '@/components/shared/product/product-card'
import { Button } from '@/components/ui/button'
import {
  getAllCategories,
  getAllProducts,
  getAllTags,
} from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import ProductSortSelector from '@/components/shared/product/product-sort-selector'
import { getFilterUrl, toSlug } from '@/lib/utils'
import Rating from '@/components/shared/product/rating'
import CollapsibleOnMobile from '@/components/shared/collapsible-on-mobile'
import { Filter, X, Tag, DollarSign, Star, Grid3X3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'

const sortOrders = [
  { value: 'price-low-to-high', name: 'Price: Low to high' },
  { value: 'price-high-to-low', name: 'Price: High to low' },
  { value: 'newest-arrivals', name: 'Newest arrivals' },
  { value: 'avg-customer-review', name: 'Avg. customer review' },
  { value: 'best-selling', name: 'Best selling' },
]

const prices = [
  {
    name: '$1 to $20',
    value: '1-20',
  },
  {
    name: '$21 to $50',
    value: '21-50',
  },
  {
    name: '$51 to $100',
    value: '51-100',
  },
  {
    name: '$101 to $500',
    value: '101-500',
  },
]

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    category: string
    tag: string
    price: string
    rating: string
    sort: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams
  const {
    q = 'all',
    category = 'all',
    tag = 'all',
    price = 'all',
    rating = 'all',
  } = searchParams

  if (
    (q !== 'all' && q !== '') ||
    category !== 'all' ||
    tag !== 'all' ||
    rating !== 'all' ||
    price !== 'all'
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''}
          ${category !== 'all' ? ` : Category ${category}` : ''}
          ${tag !== 'all' ? ` : Tag ${tag}` : ''}
          ${price !== 'all' ? ` : Price ${price}` : ''}
          ${rating !== 'all' ? ` : Rating ${rating}` : ''}`,
    }
  } else {
    return {
      title: 'Search Products',
    }
  }
}

export default async function SearchPage(props: {
  searchParams: Promise<{
    q: string
    category: string
    tag: string
    price: string
    rating: string
    sort: string
    page: string
  }>
}) {
  const searchParams = await props.searchParams

  const {
    q = 'all',
    category = 'all',
    tag = 'all',
    price = 'all',
    rating = 'all',
    sort = 'best-selling',
    page = '1',
  } = searchParams

  const params = { q, category, tag, price, rating, sort, page }

  const categories = await getAllCategories()
  const tags = await getAllTags()
  const data = await getAllProducts({
    category,
    tag,
    query: q,
    price,
    rating,
    page: Number(page),
    sort,
  })

  const hasActiveFilters = (q !== 'all' && q !== '') ||
    (category !== 'all' && category !== '') ||
    (tag !== 'all' && tag !== '') ||
    rating !== 'all' ||
    price !== 'all'

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Search Results
              </h1>
              
              {/* Results Count & Active Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                  {data.totalProducts === 0
                    ? 'No results found'
                    : `Showing ${data.from}-${data.to} of ${data.totalProducts} products`}
                </div>

                {hasActiveFilters && (
                  <>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex flex-wrap gap-2">
                      {q !== 'all' && q !== '' && (
                        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          Search: &quot;{q}&quot;
                        </Badge>
                      )}
                      {category !== 'all' && category !== '' && (
                        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                          Category: {category}
                        </Badge>
                      )}
                      {tag !== 'all' && tag !== '' && (
                        <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          Tag: {tag}
                        </Badge>
                      )}
                      {price !== 'all' && (
                        <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">
                          Price: {price}
                        </Badge>
                      )}
                      {rating !== 'all' && (
                        <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                          Rating: {rating} & up
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" asChild className="text-gray-500 hover:text-gray-700">
                      <Link href='/search'>
                        <X className="h-4 w-4 mr-2" />
                        Clear All
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Sort Selector */}
            <ProductSortSelector
              sortOrders={sortOrders}
              sort={sort}
              params={params}
            />
          </div>

          <Separator className="bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CollapsibleOnMobile title="Filters">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5" />
                <span className="font-semibold">Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                    Active
                  </Badge>
                )}
              </div>
              <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 space-y-8">
                  {/* Categories Filter */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Grid3X3 className="h-4 w-4 text-blue-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Categories</h3>
                    </div>
                    <div className="space-y-2">
                      <Link
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                          ('all' === category || '' === category) 
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                        href={getFilterUrl({ category: 'all', params })}
                      >
                        All Categories
                      </Link>
                      {categories.map((c: string) => (
                        <Link
                          key={c}
                          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                            c === category 
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                          }`}
                          href={getFilterUrl({ category: c, params })}
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  {/* Price Filter */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Price Range</h3>
                    </div>
                    <div className="space-y-2">
                      <Link
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                          'all' === price 
                            ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                        href={getFilterUrl({ price: 'all', params })}
                      >
                        All Prices
                      </Link>
                      {prices.map((p) => (
                        <Link
                          key={p.value}
                          href={getFilterUrl({ price: p.value, params })}
                          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                            p.value === price 
                              ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                          }`}
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  {/* Rating Filter */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Customer Rating</h3>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href={getFilterUrl({ rating: 'all', params })}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                          'all' === rating 
                            ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        All Ratings
                      </Link>
                      <Link
                        href={getFilterUrl({ rating: '4', params })}
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                          '4' === rating 
                            ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Rating size="md" rating={4} />
                          <span>& Up</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-gray-700" />

                  {/* Tags Filter */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-purple-500" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">Product Tags</h3>
                    </div>
                    <div className="space-y-2">
                      <Link
                        className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                          ('all' === tag || '' === tag) 
                            ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                        }`}
                        href={getFilterUrl({ tag: 'all', params })}
                      >
                        All Tags
                      </Link>
                      {tags.map((t: string) => (
                        <Link
                          key={t}
                          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
                            toSlug(t) === tag 
                              ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                          }`}
                          href={getFilterUrl({ tag: t, params })}
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleOnMobile>
          </div>

          {/* Products Grid */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Results Header */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Products
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Discover amazing products that match your criteria
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {data.products.length === 0 ? (
              <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 dark:text-gray-500 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link href='/search'>Clear All Filters</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                  {data.products.map((product: IProduct) => (
                    <ProductCard 
                      key={product._id.toString()} 
                      product={product} 
                      variant="minimal"
                    />
                  ))}
                </div>

                {/* Pagination */}
                {data!.totalPages! > 1 && (
                  <div className="flex justify-center pt-8">
                    <Pagination page={page} totalPages={data.totalPages} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
