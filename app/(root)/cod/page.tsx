import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Truck, 
  Shield, 
  Clock, 
  CheckCircle2, 
  DollarSign,
  MapPin,
  Users,
  Award,
  Package,
  Smartphone,
  Home
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cash on Delivery - Pay When You Receive | Zando-Kin',
  description: 'Pay cash when your order arrives. No upfront payment required. Available for most locations with flexible payment options.',
  keywords: 'cash on delivery, COD, pay on delivery, cash payment, flexible payment, no upfront payment',
}

const deliveryAreas = [
  {
    area: 'Major Cities',
    coverage: 'Next-day delivery',
    features: ['Free COD', 'Evening delivery', 'Trackable delivery', 'SMS updates']
  },
  {
    area: 'Metro Areas',
    coverage: '1-2 business days',
    features: ['Standard COD', 'Flexible timing', 'Delivery confirmation', 'Phone alerts']
  },
  {
    area: 'Regional Centers',
    coverage: '2-3 business days',
    features: ['Available COD', 'Scheduled delivery', 'Secure handling', 'Cash verification']
  },
  {
    area: 'Remote Locations',
    coverage: '3-5 business days',
    features: ['Limited COD', 'Advance notice', 'Safe delivery', 'Exact change preferred']
  }
]

const benefits = [
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: 'Pay on Delivery',
    description: 'No upfront payment - pay only when you receive your order'
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Product Verification',
    description: 'Inspect your items before making payment'
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: 'No Online Payment',
    description: 'Perfect if you prefer not to share payment details online'
  },
  {
    icon: <Home className="h-5 w-5" />,
    title: 'Home Convenience',
    description: 'Get delivery and payment handled at your doorstep'
  }
]

const codProcess = [
  {
    step: 1,
    title: 'Place Order',
    description: 'Select Cash on Delivery at checkout - no payment required'
  },
  {
    step: 2,
    title: 'Order Processing',
    description: 'We prepare and dispatch your order immediately'
  },
  {
    step: 3,
    title: 'Delivery & Inspection',
    description: 'Receive your order and inspect the items'
  },
  {
    step: 4,
    title: 'Pay & Complete',
    description: 'Pay the delivery agent in cash and complete your purchase'
  }
]

const paymentOptions = [
  {
    type: 'Exact Cash',
    description: 'Pay with exact change for fastest processing',
    features: ['Instant completion', 'No waiting', 'Receipt provided'],
    bestFor: 'Quick transactions'
  },
  {
    type: 'Cash with Change',
    description: 'Pay with larger bills and receive change',
    features: ['Change available', 'Verified amounts', 'Detailed receipt'],
    bestFor: 'Convenient payment',
    popular: true
  },
  {
    type: 'Mixed Payment',
    description: 'Combine cash with mobile payment if needed',
    features: ['Flexible options', 'Multiple methods', 'Full documentation'],
    bestFor: 'Large purchases'
  }
]

const safetyMeasures = [
  {
    title: 'Verified Delivery Agents',
    description: 'All our delivery personnel are background-checked and carry proper identification'
  },
  {
    title: 'Contactless Delivery',
    description: 'Optional contactless delivery with secure payment drop-off'
  },
  {
    title: 'Digital Receipts',
    description: 'Instant digital receipts sent to your email and phone'
  },
  {
    title: 'Secure Cash Handling',
    description: 'Trained personnel with proper cash handling procedures'
  }
]

const eligibility = [
  {
    criteria: 'Order Value',
    details: 'Available for orders up to $500',
    icon: '💰'
  },
  {
    criteria: 'Delivery Location',
    details: 'Available in most serviced areas',
    icon: '📍'
  },
  {
    criteria: 'Product Type',
    details: 'Most products eligible (some restrictions apply)',
    icon: '📦'
  },
  {
    criteria: 'Customer History',
    details: 'Available for customers with good order history',
    icon: '⭐'
  }
]

const faqs = [
  {
    question: 'Is there an extra fee for Cash on Delivery?',
    answer: 'No extra fees for COD in most areas. Some remote locations may have a small service fee which will be shown at checkout.'
  },
  {
    question: 'What if I am not available when delivery arrives?',
    answer: 'Our delivery agent will attempt delivery 3 times. You can also reschedule delivery through our app or customer service.'
  },
  {
    question: 'Can I return items paid with Cash on Delivery?',
    answer: 'Yes, returns work the same way. You will receive a refund via bank transfer or store credit based on your preference.'
  },
  {
    question: 'What payment denominations do you accept?',
    answer: 'We accept all standard currency denominations. For large amounts, we recommend using larger bills for convenience.'
  }
]

export default function CashOnDelivery() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-orange-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Truck className="h-4 w-4 mr-2" />
              Pay on Delivery
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Cash on <span className="text-yellow-300">Delivery</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
              Pay cash when your order arrives. No upfront payment, product verification, and ultimate shopping convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Truck className="h-5 w-5 mr-2" />
                Shop with COD
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                Check Availability
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Service Coverage Areas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Cash on Delivery available across multiple service tiers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-400">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {area.area}
                  </h3>
                  <p className="text-orange-600 dark:text-orange-400 font-semibold mb-4">
                    {area.coverage}
                  </p>
                  <ul className="space-y-2">
                    {area.features.map((feature, featureIndex) => (
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

      {/* Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Cash on Delivery?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience shopping with confidence and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Cash on Delivery Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple 4-step process for worry-free shopping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {codProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Payment Options at Delivery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Flexible payment methods when your order arrives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {paymentOptions.map((option, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative ${
                option.popular ? 'ring-2 ring-orange-500 scale-105' : ''
              }`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-500 text-white px-4 py-1">
                      <Users className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {option.type}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    {option.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h4>
                    <ul className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Best for: <span className="text-orange-600 dark:text-orange-400">{option.bestFor}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Measures */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Safety & Security
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your safety and security are our top priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {safetyMeasures.map((measure, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {measure.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {measure.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              COD Eligibility
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Check if Cash on Delivery is available for your order
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {eligibility.map((item, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.criteria}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about Cash on Delivery
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
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Shop with Confidence?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Experience the convenience of paying only when you receive your order
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Start Shopping with COD
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Check Your Area
            </Button>
          </div>
          <p className="text-orange-200 mt-6 text-sm">
            🚚 Pay on Delivery • 🔒 Product Verification • 💰 No Upfront Payment
          </p>
        </div>
      </section>
    </div>
  )
}
