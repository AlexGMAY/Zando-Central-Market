import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CreditCard, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Globe,
  Smartphone,
  Award,
  TrendingUp,
  Users
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Credit Card Payments - Secure & Fast | Zando-Kin',
  description: 'Pay securely with your credit card on Zando-Kin. We accept Visa, Mastercard, American Express with advanced fraud protection.',
  keywords: 'credit card payments, Visa, Mastercard, American Express, secure payments, online shopping',
}

const acceptedCards = [
  {
    name: 'Visa',
    icon: '💳',
    features: ['Widely accepted', 'Zero liability', 'Instant verification']
  },
  {
    name: 'Mastercard',
    icon: '💳',
    features: ['SecureCode protection', 'Price protection', 'World elite benefits']
  },
  {
    name: 'American Express',
    icon: '💳',
    features: ['Purchase protection', 'Membership rewards', 'Travel benefits']
  },
  {
    name: 'Discover',
    icon: '💳',
    features: ['Cashback rewards', 'Freeze it feature', 'US acceptance']
  }
]

const securityFeatures = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'PCI DSS Compliant',
    description: 'We meet the highest security standards for payment processing'
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'End-to-End Encryption',
    description: 'Your card details are encrypted from entry to processing'
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: '3D Secure',
    description: 'Additional verification layer for extra security'
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Global Acceptance',
    description: 'Accept cards from over 200 countries and territories'
  }
]

const benefits = [
  {
    title: 'Instant Processing',
    description: 'Payments are processed immediately for faster order confirmation'
  },
  {
    title: 'Zero Fraud Liability',
    description: 'You are not responsible for unauthorized transactions'
  },
  {
    title: 'Easy Refunds',
    description: 'Quick and hassle-free refund processing to your card'
  },
  {
    title: 'Reward Points',
    description: 'Earn credit card rewards and cashback on every purchase'
  }
]

const faqs = [
  {
    question: 'Is it safe to use my credit card on Zando-Kin?',
    answer: 'Yes, we use industry-standard encryption and are PCI DSS compliant. Your card details are never stored on our servers.'
  },
  {
    question: 'What credit cards do you accept?',
    answer: 'We accept Visa, Mastercard, American Express, and Discover from most countries worldwide.'
  },
  {
    question: 'Are there any additional fees for credit card payments?',
    answer: 'No, there are no additional fees for using credit cards. You pay only the product price and applicable taxes.'
  },
  {
    question: 'Can I save my credit card for future purchases?',
    answer: 'Yes, you can securely save your card details for faster checkout with your consent and additional verification.'
  }
]

export default function CreditCards() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Secure Payments
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Credit Card <span className="text-yellow-300">Payments</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Shop with confidence using your preferred credit card. Advanced security, instant processing, and worldwide acceptance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <CreditCard className="h-5 w-5 mr-2" />
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                Learn About Security
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Accepted Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Accepted Credit Cards
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We accept all major credit cards from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {acceptedCards.map((card, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {card.name}
                  </h3>
                  <ul className="space-y-2">
                    {card.features.map((feature, featureIndex) => (
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

      {/* Security Features */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Bank-Level Security
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your payment security is our top priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Pay with Credit Card?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Enjoy these benefits when you use your credit card
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
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
              How Credit Card Payments Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple, secure, and instant payment processing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Enter Card Details</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Securely enter your credit card information at checkout
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Security Verification</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complete 3D Secure verification for added protection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Instant Processing</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Payment is processed immediately and securely
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Order Confirmed</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Receive instant order confirmation and tracking
              </p>
            </div>
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
              Everything you need to know about credit card payments
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

      {/* Trust Indicators */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Millions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join millions of satisfied customers who shop securely with us
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10M+</div>
              <div className="text-gray-600 dark:text-gray-400">Credit Card Transactions</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Payment Success Rate</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">200+</div>
              <div className="text-gray-600 dark:text-gray-400">Countries Supported</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Fraud Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Shop Securely?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience fast, secure credit card payments with advanced fraud protection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Start Shopping Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              View Other Payment Methods
            </Button>
          </div>
          <p className="text-blue-200 mt-6 text-sm">
            🔒 PCI DSS Compliant • Zero Fraud Liability • Instant Processing
          </p>
        </div>
      </section>
    </div>
  )
}
