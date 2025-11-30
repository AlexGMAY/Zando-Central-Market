import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building, 
  Truck, 
  Shield, 
  TrendingUp, 
  Users, 
  BarChart3,
  CheckCircle2,
  Star,
  Award,
  Package,
  Globe,
  HeadphonesIcon,
  Zap,
  CreditCard
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vendor Program - Partner with Zando-Kin | Wholesale Marketplace',
  description: 'Join Zando-Kin as a vendor partner. Access wholesale opportunities, bulk orders, and enterprise-level e-commerce solutions.',
  keywords: 'vendor program, wholesale, B2B marketplace, bulk orders, supplier partnership, Zando-Kin vendor',
}

const vendorBenefits = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'B2B & B2C Reach',
    description: 'Access both retail customers and business buyers through our dual marketplace'
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Volume Growth',
    description: 'Scale your business with bulk orders and wholesale opportunities'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Payment Security',
    description: 'Guaranteed payments and financial protection for all transactions'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Enterprise Analytics',
    description: 'Advanced reporting and insights for business decision-making'
  }
]

const vendorTiers = [
  {
    name: 'Standard Vendor',
    description: 'Perfect for small to medium businesses',
    requirements: [
      'Business registration',
      'Product catalog (50+ SKUs)',
      'Quality certifications',
      '6-month business history'
    ],
    features: [
      'Up to 500 product listings',
      'Basic vendor dashboard',
      'Standard payment terms',
      'Email support',
      'Bulk order capabilities'
    ],
    commission: '8-12%'
  },
  {
    name: 'Premium Vendor',
    description: 'For established brands and manufacturers',
    requirements: [
      '2+ years in business',
      '500+ SKU catalog',
      'Quality management system',
      'Warehouse capacity'
    ],
    features: [
      'Unlimited product listings',
      'Advanced vendor portal',
      'Priority payment processing',
      'Dedicated account manager',
      'Custom reporting',
      'API integration'
    ],
    commission: '5-8%',
    popular: true
  },
  {
    name: 'Enterprise Partner',
    description: 'For large manufacturers and distributors',
    requirements: [
      '5+ years in business',
      '1000+ SKU catalog',
      'Multiple warehouse locations',
      'International shipping capability'
    ],
    features: [
      'White-label solutions',
      'Custom commission rates',
      '24/7 dedicated support',
      'Advanced analytics suite',
      'Co-marketing opportunities',
      'Exclusive placement'
    ],
    commission: 'Custom'
  }
]

const vendorSupport = [
  {
    icon: <HeadphonesIcon className="h-5 w-5" />,
    title: 'Dedicated Support',
    description: 'Priority customer service and technical assistance'
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: 'Fulfillment Options',
    description: 'Flexible shipping and inventory management solutions'
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Global Reach',
    description: 'Access to customers across multiple African markets'
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Fast Onboarding',
    description: 'Quick setup process with guided implementation'
  }
]

const successStories = [
  {
    company: 'Premium Electronics Ltd.',
    industry: 'Consumer Electronics',
    partnership: '2 years',
    growth: '320%',
    testimonial: 'The vendor program transformed our wholesale business. We now serve both retail customers and bulk buyers through a single platform.',
    achievements: ['Expanded to 5 new countries', '450% wholesale growth', 'Top vendor award 2024']
  },
  {
    company: 'Fashion Manufacturers Co.',
    industry: 'Apparel & Textiles',
    partnership: '18 months',
    growth: '185%',
    testimonial: 'As a manufacturer, the vendor portal gives us direct access to both B2B and B2C markets without additional sales teams.',
    achievements: ['50+ retail partners', 'Streamlined inventory', 'Real-time sales data']
  },
  {
    company: 'Home Goods Distributors',
    industry: 'Home & Living',
    partnership: '3 years',
    growth: '420%',
    testimonial: 'The enterprise partnership allowed us to scale operations across Africa with dedicated support and custom solutions.',
    achievements: ['Pan-African distribution', 'Custom logistics', 'Co-branded marketing']
  }
]

const vendorRequirements = [
  {
    category: 'Business Documentation',
    items: ['Business registration certificate', 'Tax compliance documents', 'Bank account verification', 'Quality certifications']
  },
  {
    category: 'Product Standards',
    items: ['Quality assurance processes', 'Product compliance certificates', 'Packaging standards', 'Warranty policies']
  },
  {
    category: 'Operational Capacity',
    items: ['Inventory management system', 'Shipping capabilities', 'Customer service team', 'Return processing']
  }
]

export default function BecomeAVendor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-indigo-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Building className="h-4 w-4 mr-2" />
              Enterprise Partnership
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Become a <span className="text-yellow-300">Zando-Kin</span> Vendor
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
              Partner with Africa&apos;s leading e-commerce platform. Access wholesale markets, bulk orders, and enterprise-level growth opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Building className="h-5 w-5 mr-2" />
                Apply as Vendor
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                Download Vendor Kit
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Stats */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">5,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Vendor Partners</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">$2B+</div>
              <div className="text-gray-600 dark:text-gray-400">Annual Vendor Sales</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">45%</div>
              <div className="text-gray-600 dark:text-gray-400">Average Growth</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">African Markets</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Enterprise-level benefits for serious business partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vendorBenefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
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

      {/* Vendor Tiers */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Vendor Partnership Tiers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the partnership level that matches your business scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {vendorTiers.map((tier, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative ${
                tier.popular ? 'ring-2 ring-indigo-500 scale-105' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-indigo-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tier.name}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    {tier.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {tier.commission}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 block text-sm mt-1">
                      Commission Rate
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {tier.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Features</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-3 w-3 text-blue-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className={`w-full ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                  }`}>
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Vendor Support
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to succeed as a vendor partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {vendorSupport.map((support, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {support.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {support.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {support.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Vendor Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hear from our successful vendor partners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{story.company}</h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{story.industry}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      <span>Partnership: {story.partnership}</span>
                      <span>Growth: {story.growth}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 italic text-sm">
                    "{story.testimonial}"
                  </p>

                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Achievements</p>
                    <ul className="space-y-1">
                      {story.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Vendor Requirements
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              What you need to become a Zando-Kin vendor partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vendorRequirements.map((requirement, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    {requirement.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-3 w-3 text-indigo-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple Application Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get approved and start selling in 4 easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Submit Application</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complete our vendor application form with business details
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Document Review</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our team reviews your business documentation and products
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Onboarding</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Set up your vendor account and product catalog
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Go Live</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Start receiving orders and growing your business
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful vendors growing their business across Africa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Start Vendor Application
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Contact Partnership Team
            </Button>
          </div>
          <p className="text-indigo-200 mt-6 text-sm">
            Average approval time: 3-5 business days • Dedicated support throughout process
          </p>
        </div>
      </section>
    </div>
  )
}
