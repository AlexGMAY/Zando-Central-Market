import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Store, 
  TrendingUp, 
  Users, 
  Shield, 
  Truck, 
  CreditCard, 
  BarChart3,
  Rocket,
  CheckCircle2,
  Star,
  Award
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sell on Zando-Kin - Grow Your Business | Marketplace',
  description: 'Start selling on Zando-Kin and reach millions of customers. Low fees, powerful tools, and dedicated support for sellers.',
  keywords: 'sell online, marketplace, ecommerce, become seller, Zando-Kin seller',
}

const benefits = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Millions of Customers',
    description: 'Access our vast customer base and increase your sales potential'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Growth Tools',
    description: 'Advanced analytics and marketing tools to grow your business'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure Payments',
    description: 'Get paid securely with our trusted payment protection system'
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'Fulfillment Options',
    description: 'Flexible shipping and fulfillment solutions for all business sizes'
  }
]

const steps = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up as a seller in minutes with basic business information'
  },
  {
    number: '02',
    title: 'List Products',
    description: 'Add your products with our easy-to-use listing tools'
  },
  {
    number: '03',
    title: 'Start Selling',
    description: 'Go live and reach customers immediately'
  },
  {
    number: '04',
    title: 'Grow Business',
    description: 'Use our tools to optimize and scale your operations'
  }
]

const pricingTiers = [
  {
    name: 'Starter',
    price: '0%',
    period: 'monthly platform fee',
    description: 'Perfect for new sellers testing the marketplace',
    features: [
      'Up to 50 product listings',
      'Basic analytics',
      'Standard support',
      '5% transaction fee'
    ]
  },
  {
    name: 'Professional',
    price: '$29',
    period: 'per month',
    description: 'For growing businesses with higher volume',
    features: [
      'Unlimited product listings',
      'Advanced analytics',
      'Priority support',
      '3% transaction fee',
      'Marketing credits'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored pricing',
    description: 'For high-volume sellers and brands',
    features: [
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      '1-2% transaction fee',
      'Premium placement'
    ]
  }
]

export default function SellOnZandoKin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Rocket className="h-4 w-4 mr-2" />
              Join Our Marketplace
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Sell on <span className="text-yellow-300">Zando-Kin</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Grow your business with Africa&apos;s fastest-growing e-commerce marketplace. 
              Reach millions of customers and scale your sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Store className="h-5 w-5 mr-2" />
                Start Selling Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                View Seller Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10M+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Customers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Successful Sellers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">$500M+</div>
              <div className="text-gray-600 dark:text-gray-400">Annual Sales</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">African Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Sell With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to start, run, and grow your online business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Selling in 4 Easy Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple process to get your business online quickly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the plan that works for your business. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative ${
                tier.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-gray-600 dark:text-gray-400 block text-sm mt-1">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {tier.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful sellers already growing with Zando-Kin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register-seller">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Store className="h-5 w-5 mr-2" />
                Start Selling Now
              </Button>              
            </Link>
            <Link href="/seller-guide">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                  Contact Sales
                </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
