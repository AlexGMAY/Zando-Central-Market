import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import ProductSlider from '@/components/shared/product/product-slider'
import { Card, CardContent } from '@/components/ui/card'
import {
  getAllCategories,
  getProductsByTag,
  getProductsForCard,
} from '@/lib/actions/product.actions'
import data from '@/lib/data'
import { toSlug } from '@/lib/utils'

export default async function Page() {
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
    limit: 4,
  })
  const featureds = await getProductsForCard({
    tag: 'featured',
    limit: 4,
  })
  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
    limit: 4,
  })
  
  const cards = [
    {
      title: 'Categories to Explore',
      subtitle: 'Shop by your interests',
      link: {
        text: 'Browse All Categories',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'New Arrivals',
      subtitle: 'Fresh picks just for you',
      items: newArrivals,
      link: {
        text: 'View All New Arrivals',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Best Sellers',
      subtitle: 'Most loved by our customers',
      items: bestSellers,
      link: {
        text: 'See All Best Sellers',
        href: '/search?tag=best-seller',
      },
    },
    {
      title: 'Featured Products',
      subtitle: 'Curated excellence',
      items: featureds,
      link: {
        text: 'Explore Featured',
        href: '/search?tag=featured',
      },
    },
  ]

  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Carousel */}
      <section className="relative">
        <HomeCarousel items={data.carousels} />
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Feature Cards Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div 
              key={card.title}
              className="relative group"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <HomeCard card={card} index={index} />
            </div>
          ))}
        </section>

        {/* Today's Deals - Enhanced */}
        <section className="relative">
          <Card className="w-full border-0 shadow-2xl bg-gradient-to-r from-blue-900/10 to-purple-900/10 dark:from-blue-500/5 dark:to-purple-500/5 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-red-600/5 pointer-events-none" />
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    Today&apos;s Deals
                  </h2>
                  <span className="ml-2 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full animate-pulse">
                    Limited Time
                  </span>
                </div>
                <ProductSlider 
                  title={""} 
                  products={todaysDeals} 
                  variant="featured"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Best Selling Products */}
        <section className="relative">
          <Card className="w-full border-0 shadow-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Best Selling Products
                  </h2>
                  <span className="ml-2 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    Popular
                  </span>
                </div>
                <ProductSlider
                  title={""}
                  products={bestSellingProducts}
                  hideDetails={false}
                  variant="minimal"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Browsing History */}
        <section className="relative">
          <Card className="w-full border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Recently Viewed
                </h2>
              </div>
              <BrowsingHistoryList />
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Floating CTA Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-blue-600 shadow-2xl text-white py-16 mt-12 dark:from-blue-800 dark:to-red-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Discover More?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for quality products and exceptional service.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Start Shopping
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
