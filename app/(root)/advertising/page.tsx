import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Megaphone, 
  Target, 
  BarChart3, 
  Users, 
  Zap, 
  Shield,
  TrendingUp,
  CheckCircle2, 
  Award,
  Eye,
  MousePointer,
  Smartphone,
  Globe
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advertising Solutions - Promote Your Products | Zando-Kin',
  description: 'Reach millions of active shoppers with Zando-Kin advertising solutions. Targeted campaigns, real-time analytics, and maximum ROI.',
  keywords: 'product advertising, digital marketing, sponsored products, banner ads, Zando-Kin ads',
}

const advertisingTypes = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Sponsored Products',
    description: 'Promote individual products across search results and category pages',
    features: ['Pay-per-click', 'Keyword targeting', 'Real-time bidding', 'Performance analytics'],
    price: 'Starting at $0.50/click'
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: 'Display Advertising',
    description: 'Eye-catching banner ads across our platform and partner networks',
    features: ['Multiple ad sizes', 'Retargeting options', 'Brand awareness', 'Rich media support'],
    price: 'CPM from $2.50'
  },
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: 'Brand Campaigns',
    description: 'Comprehensive brand awareness and product launch campaigns',
    features: ['Homepage takeovers', 'Newsletter features', 'Social media integration', 'Dedicated support'],
    price: 'Custom packages'
  }
]

const benefits = [
  {
    icon: <Users className="h-6 w-6" />,
    title: '10M+ Active Shoppers',
    description: 'Reach our vast audience of verified, purchasing-ready customers'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Advanced Analytics',
    description: 'Real-time performance tracking with detailed conversion metrics'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'AI-Powered Optimization',
    description: 'Automated bidding and targeting for maximum return on ad spend'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Brand Safety',
    description: 'Premium ad placements with full control over where your ads appear'
  }
]

const successMetrics = [
  {
    metric: '45%',
    description: 'Average increase in product visibility'
  },
  {
    metric: '3.2x',
    description: 'Higher conversion rates vs. organic traffic'
  },
  {
    metric: '28%',
    description: 'Lower customer acquisition costs'
  },
  {
    metric: '92%',
    description: 'Advertiser retention rate'
  }
]

const caseStudies = [
  {
    company: 'TechGadgets Inc.',
    industry: 'Electronics',
    challenge: 'Low visibility for new product launch',
    solution: 'Sponsored Products + Display Campaign',
    results: [
      '215% increase in product page views',
      '89% higher conversion rate',
      '42% lower CPA than industry average'
    ]
  },
  {
    company: 'FashionForward',
    industry: 'Apparel',
    challenge: 'Seasonal inventory clearance',
    solution: 'Retargeting Display Ads',
    results: [
      '3.8x return on ad spend',
      '67% of sales from returning visitors',
      'Cleared 95% of seasonal inventory'
    ]
  },
  {
    company: 'HomeEssentials',
    industry: 'Home & Kitchen',
    challenge: 'Building brand awareness',
    solution: 'Brand Campaign + Sponsored Products',
    results: [
      '4.2x brand recall increase',
      '156% growth in organic traffic',
      'Top 3 search position for key terms'
    ]
  }
]

const targetingOptions = [
  {
    icon: <MousePointer className="h-5 w-5" />,
    title: 'Behavioral Targeting',
    features: ['Purchase history', 'Browsing behavior', 'Wishlist items', 'Cart abandoners']
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Demographic Targeting',
    features: ['Location-based', 'Age groups', 'Income levels', 'Shopping preferences']
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: 'Device & Platform',
    features: ['Mobile-first optimization', 'Cross-device tracking', 'App vs. web targeting', 'OS-specific campaigns']
  }
]

export default function AdvertiseYourProducts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 dark:from-slate-900 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-orange-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Megaphone className="h-4 w-4 mr-2" />
              Premium Advertising
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Advertise Your <span className="text-yellow-300">Products</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Reach millions of active shoppers with Africa&pos;s most effective e-commerce advertising platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <TrendingUp className="h-5 w-5 mr-2" />
                Start Advertising
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">10M+</div>
              <div className="text-gray-600 dark:text-gray-400">Monthly Active Shoppers</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">3.2x</div>
              <div className="text-gray-600 dark:text-gray-400">Higher Conversion Rates</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">45%</div>
              <div className="text-gray-600 dark:text-gray-400">Average ROI Increase</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Campaign Management</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Advertising Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the advertising format that matches your marketing goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advertisingTypes.map((type, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                    {type.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {type.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {type.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 text-center">
                      {type.price}
                    </p>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Advertise With Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unlock the full potential of your marketing campaigns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Success Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
            {successMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {metric.metric}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Targeting Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Targeting Options
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Reach the right audience with precision targeting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {targetingOptions.map((option, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {option.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See how brands are achieving remarkable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{study.company}</h3>
                    <p className="text-sm text-orange-600 dark:text-orange-400">{study.industry}</p>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Challenge</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Solution</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{study.solution}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Results</p>
                    <ul className="space-y-1">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {result}
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

      {/* Getting Started */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Launch your first campaign in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Create Account</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Set up your advertising account with business details
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Set Up Campaign</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your ad format, budget, and targeting options
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Launch & Optimize</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Go live and monitor performance with real-time analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Start Driving Results Today
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful advertisers growing their business with Zando-Kin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Create Advertising Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Schedule Consultation
            </Button>
          </div>
          <p className="text-orange-200 mt-6 text-sm">
            Minimum budget: $100 • Dedicated account manager available
          </p>
        </div>
      </section>
    </div>
  )
}
