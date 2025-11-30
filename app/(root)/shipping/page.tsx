// app/shipping-rates-policies/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Truck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Package,
  Shield,
  Globe,
  Award,
  Users,
  Calendar
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Shipping Rates & Delivery Policies | Zando-Kin',
  description: 'Complete shipping information, delivery timelines, and policy details. Free shipping options, express delivery, and international shipping.',
  keywords: 'shipping rates, delivery policy, free shipping, express delivery, international shipping, delivery timeline',
}

const shippingOptions = [
  {
    name: 'Standard Shipping',
    delivery: '3-5 business days',
    price: 'Free on orders over $50',
    features: ['Trackable delivery', 'Email notifications', 'Safe handling', 'Delivery attempts'],
    bestFor: 'Regular shopping'
  },
  {
    name: 'Express Delivery',
    delivery: '1-2 business days',
    price: '$9.99',
    features: ['Priority processing', 'Real-time tracking', 'Evening delivery', 'Signature required'],
    bestFor: 'Urgent needs',
    popular: true
  },
  {
    name: 'Next-Day Delivery',
    delivery: 'Next business day',
    price: '$19.99',
    features: ['Guaranteed delivery', 'Time-window delivery', 'Premium handling', 'Dedicated support'],
    bestFor: 'Emergency orders'
  },
  {
    name: 'International Shipping',
    delivery: '5-10 business days',
    price: 'From $24.99',
    features: ['Global coverage', 'Customs handling', 'Tracking included', 'Insurance coverage'],
    bestFor: 'Overseas delivery'
  }
]

const freeShippingInfo = [
  {
    threshold: '$50',
    description: 'Free standard shipping on all orders over $50',
    features: ['No minimum for members', 'All product categories', 'Most locations']
  },
  {
    threshold: '$100',
    description: 'Free express shipping on orders over $100',
    features: ['Priority processing', 'Faster delivery', 'Premium service']
  },
  {
    threshold: 'Membership',
    description: 'Zando-Kin Prime members enjoy free shipping always',
    features: ['No minimum order', 'All shipping methods', 'Exclusive benefits']
  }
]

const deliveryAreas = [
  {
    region: 'Major Metropolitan Areas',
    timeline: '1-2 days',
    coverage: 'Next-day available',
    features: ['Evening delivery', 'Weekend delivery', 'Time slots']
  },
  {
    region: 'Regional Centers',
    timeline: '2-3 days',
    coverage: 'Express available',
    features: ['Standard delivery', 'Trackable service', 'Safe drop-off']
  },
  {
    region: 'Outlying Areas',
    timeline: '3-5 days',
    coverage: 'Standard shipping',
    features: ['Reliable service', 'Delivery notifications', 'Local partners']
  },
  {
    region: 'International',
    timeline: '5-10 days',
    coverage: 'Global network',
    features: ['Customs clearance', 'Tracking included', 'Insurance options']
  }
]

const policyHighlights = [
  {
    icon: <Package className="h-5 w-5" />,
    title: 'Package Protection',
    description: 'All shipments include basic protection against loss or damage'
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Secure Delivery',
    description: 'Signature required for high-value items and alcohol products'
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Delivery Windows',
    description: 'Choose preferred delivery times for express services'
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Flexible Locations',
    description: 'Deliver to home, work, or pickup points'
  }
]

const internationalShipping = [
  {
    region: 'North America',
    timeline: '3-5 days',
    cost: '$24.99',
    features: ['Duties calculated', 'Fast clearance', 'Tracked service']
  },
  {
    region: 'Europe',
    timeline: '4-7 days',
    cost: '$29.99',
    features: ['VAT included', 'EU compliance', 'Express options']
  },
  {
    region: 'Asia Pacific',
    timeline: '5-10 days',
    cost: '$34.99',
    features: ['Customs handled', 'Local partners', 'Insurance included']
  },
  {
    region: 'Middle East & Africa',
    timeline: '7-14 days',
    cost: '$39.99',
    features: ['Special handling', 'Documentation', 'Reliable partners']
  }
]

const faqs = [
  {
    question: 'How can I track my order?',
    answer: 'You will receive a tracking number via email and SMS. Use our tracking portal or mobile app for real-time updates.'
  },
  {
    question: 'What if I am not home for delivery?',
    answer: 'We will attempt delivery 3 times. You can also redirect to a neighbor, reschedule, or pick up from a local depot.'
  },
  {
    question: 'Do you ship to PO boxes?',
    answer: 'Yes, we ship to PO boxes via standard mail. Express services require physical addresses for delivery.'
  },
  {
    question: 'How are shipping costs calculated?',
    answer: 'Shipping costs are based on package size, weight, destination, and delivery speed. Free shipping thresholds apply to order subtotal.'
  }
]

export default function ShippingRatesPolicies() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-green-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Truck className="h-4 w-4 mr-2" />
              Delivery Information
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Shipping <span className="text-yellow-300">Rates & Policies</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Complete shipping information, delivery timelines, and policy details. Everything you need to know about getting your orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Truck className="h-5 w-5 mr-2" />
                Calculate Shipping
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                Track Your Order
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shipping Options & Rates
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose the delivery speed that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {shippingOptions.map((option, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative ${
                option.popular ? 'ring-2 ring-green-500 scale-105' : ''
              }`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-1">
                      <Users className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {option.name}
                  </CardTitle>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {option.delivery}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {option.price}
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
                      Best for: <span className="text-green-600 dark:text-green-400">{option.bestFor}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free Shipping */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Free Shipping Opportunities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Enjoy free shipping with these options
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {freeShippingInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                    {info.threshold}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {info.description}
                  </h3>
                  <ul className="space-y-2">
                    {info.features.map((feature, featureIndex) => (
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

      {/* Delivery Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Delivery Areas & Timelines
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Estimated delivery times by region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {area.region}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="text-green-600 dark:text-green-400 font-semibold">
                      {area.timeline}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {area.coverage}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {area.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-700 dark:text-gray-300">
                        • {feature}
                      </li>
                    ))}
                  </ul>
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
              Shipping Policy Highlights
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Important policies for your delivery experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {policyHighlights.map((policy, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
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

      {/* International Shipping */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              International Shipping
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Global delivery to most countries worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {internationalShipping.map((shipping, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {shipping.region}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="text-green-600 dark:text-green-400 font-semibold">
                      {shipping.timeline}
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {shipping.cost}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {shipping.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-700 dark:text-gray-300">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about shipping and delivery
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Need Help with Shipping?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Our customer service team is here to help with any shipping questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Contact Support
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Track Your Order
            </Button>
          </div>
          <p className="text-green-200 mt-6 text-sm">
            🚚 Multiple Shipping Options • 🌍 International Delivery • 🆓 Free Shipping Available
          </p>
        </div>
      </section>
    </div>
  )
}
