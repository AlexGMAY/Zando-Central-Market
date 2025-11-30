import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  RefreshCw, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Truck,
  DollarSign,
  Users,
  Award,
  Package,
  HeadphonesIcon
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns & Replacements Policy | Zando-Kin',
  description: 'Easy returns and replacement policies. Your satisfaction is our priority with hassle-free return processes and quick refunds.',
  keywords: 'returns policy, replacements, refunds, product returns, satisfaction guarantee, return process',
}

const returnOptions = [
  {
    type: 'Easy Returns',
    timeline: '30 days',
    process: 'Simple online process',
    features: ['Free return shipping', 'Instant label generation', 'Drop-off convenience', 'Quick processing'],
    bestFor: 'Change of mind'
  },
  {
    type: 'Quick Replacements',
    timeline: 'Immediate',
    process: 'Advanced shipping available',
    features: ['Fast processing', 'Advanced replacement', 'Quality check', 'Seamless exchange'],
    bestFor: 'Defective items',
    popular: true
  },
  {
    type: 'Instant Refunds',
    timeline: '2-5 business days',
    process: 'Automated refund system',
    features: ['Multiple refund methods', 'Status tracking', 'Email notifications', 'Full amount refund'],
    bestFor: 'Returned items'
  }
]

const returnReasons = [
  {
    reason: 'Wrong Size/Color',
    eligibility: 'Eligible within 30 days',
    process: 'Free exchange or return',
    requirements: ['Unworn condition', 'Original packaging', 'Tags attached']
  },
  {
    reason: 'Product Defects',
    eligibility: 'Eligible within 90 days',
    process: 'Free replacement or refund',
    requirements: ['Manufacturing issues', 'Documented defects', 'Within warranty']
  },
  {
    reason: 'Damaged in Shipping',
    eligibility: 'Immediate replacement',
    process: 'Free expedited replacement',
    requirements: ['Report within 48 hours', 'Photos of damage', 'Original packaging']
  },
  {
    reason: 'Not as Described',
    eligibility: 'Eligible within 30 days',
    process: 'Free return and refund',
    requirements: ['Significant difference', 'Documented evidence', 'Unused condition']
  }
]

const refundMethods = [
  {
    method: 'Original Payment',
    timeline: '2-5 business days',
    features: ['Back to credit card', 'Bank transfer', 'Digital wallet', 'Payment processor'],
    processing: 'Automatic to original method'
  },
  {
    method: 'Store Credit',
    timeline: 'Instant',
    features: ['Immediate use', 'Bonus credit offers', 'No expiration', 'Flexible spending'],
    processing: 'Added to account immediately'
  },
  {
    method: 'Gift Card',
    timeline: 'Instant',
    features: ['Transferable', 'No expiration', 'Easy gifting', 'Multiple uses'],
    processing: 'Email delivery'
  }
]

const policyHighlights = [
  {
    icon: <Clock className="h-5 w-5" />,
    title: '30-Day Return Window',
    description: 'Most items can be returned within 30 days of delivery'
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'Free Return Shipping',
    description: 'Free return shipping labels for qualified returns'
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Hassle-Free Process',
    description: 'Simple online process with step-by-step guidance'
  },
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: 'Quick Refunds',
    description: 'Refunds processed within 2-5 business days'
  }
]

const returnProcess = [
  {
    step: 1,
    title: 'Initiate Return',
    description: 'Start return process online or through our app'
  },
  {
    step: 2,
    title: 'Print Label',
    description: 'Generate and print free return shipping label'
  },
  {
    step: 3,
    title: 'Package & Ship',
    description: 'Pack items securely and drop off at carrier'
  },
  {
    step: 4,
    title: 'Receive Refund',
    description: 'Get refund once we receive and process return'
  }
]

const nonReturnable = [
  {
    category: 'Personal Care',
    items: ['Opened cosmetics', 'Personal hygiene products', 'Earrings for piercing'],
    notes: 'Health and safety regulations'
  },
  {
    category: 'Digital Goods',
    items: ['Software licenses', 'Digital downloads', 'Opened software'],
    notes: 'License activation prevents returns'
  },
  {
    category: 'Custom Items',
    items: ['Personalized products', 'Made-to-order items', 'Custom configurations'],
    notes: 'Made specifically for you'
  },
  {
    category: 'Perishable Goods',
    items: ['Food items', 'Flowers', 'Plants', 'Refrigerated items'],
    notes: 'Product nature prevents returns'
  }
]

const faqs = [
  {
    question: 'How long do I have to return an item?',
    answer: 'Most items can be returned within 30 days of delivery. Some categories like electronics may have extended return windows.'
  },
  {
    question: 'Do I have to pay for return shipping?',
    answer: 'We provide free return shipping for qualified returns. In some cases, return shipping may be deducted from your refund.'
  },
  {
    question: 'How long does it take to get my refund?',
    answer: 'Refunds are typically processed within 2-5 business days after we receive your return. Bank processing may take additional time.'
  },
  {
    question: 'Can I exchange an item for a different size or color?',
    answer: 'Yes, we offer free exchanges for size and color changes within the return period. We can ship the replacement before receiving your return.'
  }
]

export default function ReturnsReplacements() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Satisfaction Guaranteed
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Returns & <span className="text-yellow-300">Replacements</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Easy returns and replacement policies. Your satisfaction is our priority with hassle-free return processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <RefreshCw className="h-5 w-5 mr-2" />
                Start Return Process
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                Check Return Status
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Return Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Return & Replacement Options
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the option that works best for your situation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {returnOptions.map((option, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative ${
                option.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white px-4 py-1">
                      <Users className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {option.type}
                  </CardTitle>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {option.timeline}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {option.process}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Best for: <span className="text-purple-600 dark:text-purple-400">{option.bestFor}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Return Reasons */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Common Return Reasons
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Understanding return eligibility for different situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnReasons.map((reason, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {reason.reason}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Eligibility</p>
                      <p className="text-sm text-green-600 dark:text-green-400">{reason.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Process</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{reason.process}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Requirements</p>
                      <ul className="space-y-1 mt-1">
                        {reason.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-gray-700 dark:text-gray-300">
                            • {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Refund Methods & Timelines
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose how you want to receive your refund
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {refundMethods.map((method, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {method.method}
                  </h3>
                  <div className="text-purple-600 dark:text-purple-400 font-semibold mb-4">
                    {method.timeline}
                  </div>
                  <ul className="space-y-2 mb-4">
                    {method.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-700 dark:text-gray-300">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {method.processing}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Highlights */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Return Policy Highlights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Key features of our customer-friendly return policy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {policyHighlights.map((policy, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-pink-600 dark:text-pink-400">
                    {policy.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {policy.description}
                  </p>
                </CardContent>
              </Card>
            ))}
            </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple 4-Step Return Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Easy and hassle-free return experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {returnProcess.map((step, index) => (
              <div key={index} className="text-center relative">
                {/* Connecting line for desktop */}
                {index < returnProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-purple-200 dark:bg-purple-800 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Return?</h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Begin your return process now and get your refund or replacement quickly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Start Return Online
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl">
                  <HeadphonesIcon className="h-5 w-5 mr-2" />
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non-Returnable Items */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Non-Returnable Items
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Items that cannot be returned for health, safety, or legal reasons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {nonReturnable.map((category, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <Package className="h-5 w-5 text-red-500" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Items Include:</h4>
                    <ul className="space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-700 dark:text-gray-300">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      Note: {category.notes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
            {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Quick answers to common return questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Return?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Begin your return process today and experience our hassle-free service with quick refunds and replacements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              <RefreshCw className="h-5 w-5 mr-2" />
              Start Return Process
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Check Return Status
            </Button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-purple-200 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>30-Day Return Window</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Free Return Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Quick Refund Processing</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
