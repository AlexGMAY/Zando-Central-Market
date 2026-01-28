import { Card, CardContent } from '@/components/ui/card'
import {
  getProductBySlug,
  getRelatedProductsByCategory,
} from '@/lib/actions/product.actions'

import SelectVariant from '@/components/shared/product/select-variant'
import ProductPrice from '@/components/shared/product/product-price'
import ProductGallery from '@/components/shared/product/product-gallery'
import { Separator } from '@/components/ui/separator'
import ProductSlider from '@/components/shared/product/product-slider'
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import AddToBrowsingHistory from '@/components/shared/product/add-to-browsing-history'
import AddToCart from '@/components/shared/product/add-to-cart'
import { generateId, round2 } from '@/lib/utils'
import RatingSummary from '@/components/shared/product/rating-summary'
import ReviewList from './review-list'
import { auth } from '@/auth'
import { Badge } from '@/components/ui/badge'
import { Truck, Shield, RotateCcw, Zap, CheckCircle } from 'lucide-react'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const product = await getProductBySlug(params.slug)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetails(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page: string; color: string; size: string }>
}) {
  const searchParams = await props.searchParams

  const { page, color, size } = searchParams

  const params = await props.params

  const { slug } = params

  const product = await getProductBySlug(slug)

  const relatedProducts = await getRelatedProductsByCategory({
    category: product.category,
    productId: product._id,
    page: Number(page || '1'),
  })

  const session = await auth()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl">
      <AddToBrowsingHistory id={product._id} category={product.category} />
      
      {/* Main Product Section */}
      <section className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Gallery */}
          <div className="lg:col-span-5">
            <ProductGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="space-y-4">
              {/* Brand & Category */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  {product.brand}
                </Badge>
                <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                  {product.category}
                </Badge>
                {product.tags.includes('todays-deal') && (
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    Hot Deal
                  </Badge>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <RatingSummary
                  avgRating={product.avgRating}
                  numReviews={product.numReviews}
                  asPopover
                  ratingDistribution={product.ratingDistribution}
                />
                <Separator orientation="vertical" className="h-6" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.numReviews} reviews
                </span>
              </div>

              {/* Price */}
              <div className="py-4">
                <ProductPrice
                  price={product.price}
                  listPrice={product.listPrice}
                  isDeal={product.tags.includes('todays-deal')}
                  forListing={false}
                />
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 py-2">                
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Truck className="h-4 w-4" />
                  Free Shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                  <Shield className="h-4 w-4" />
                  2-Year Warranty
                </div>
                <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                  <RotateCcw className="h-4 w-4" />
                  30-Day Returns
                </div>
              </div>
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Variant Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Options
              </h3>
              <SelectVariant
                product={product}
                size={size || product.sizes[0]}
                color={color || product.colors[0]}
              />
            </div>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Product Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-3">
            <Card className="sticky top-24 border-0 shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-6">
                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Price</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                  </div>
                  {product.listPrice > product.price && (
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">List Price</span>
                      <span className="text-gray-500 line-through">
                        ${product.listPrice}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock Status */}
                <div className="space-y-3">
                  {product.countInStock > 0 ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">In Stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <span className="font-semibold">Out of Stock</span>
                    </div>
                  )}
                  
                  {product.countInStock > 0 && product.countInStock <= 3 && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <p className="text-amber-800 dark:text-amber-200 text-sm font-medium text-center">
                        ⚡ Only {product.countInStock} left in stock
                      </p>
                    </div>
                  )}
                </div>

                {/* Add to Cart */}
                {product.countInStock > 0 && (
                  <div className="space-y-4">
                    <AddToCart
                      item={{
                        clientId: generateId(),
                        product: product._id,
                        countInStock: product.countInStock,
                        name: product.name,
                        slug: product.slug,
                        category: product.category,
                        price: round2(product.price),
                        quantity: 1,
                        image: product.images[0],
                        size: size || product.sizes[0],
                        color: color || product.colors[0],
                      }}
                      variant="default"
                      compact={false}
                    />
                    
                    {/* Security Badge */}
                    <div className="text-center pt-2">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Shield className="h-3 w-3" />
                        Secure checkout • SSL encrypted
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">          
          <ReviewList product={product} userId={session?.user.id} />
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
          <ProductSlider
            products={relatedProducts.data}
            title={`Best Sellers in ${product.category}`}
            variant="featured"
          />
        </div>
      </section>

      {/* Browsing History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BrowsingHistoryList />
      </section>
    </div>
  )
}
