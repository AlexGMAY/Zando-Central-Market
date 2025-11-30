import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Smartphone, 
  Zap, 
  Shield, 
  CheckCircle2, 
  QrCode,
  Fingerprint,
  Globe,
  Award,
  TrendingUp,
  Users
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Digital Wallet Payments - Fast & Secure | Zando-Kin',
  description: 'Pay instantly with digital wallets like Apple Pay, Google Pay, PayPal. One-tap checkout with enhanced security and convenience.',
  keywords: 'digital wallets, mobile payments, Apple Pay, Google Pay, PayPal, quick checkout, contactless payments',
}

const supportedWallets = [
  {
    name: 'Apple Pay',
    icon: '📱',
    description: 'Pay with Face ID or Touch ID on your Apple devices',
    features: ['One-tap payment', 'Face ID/Touch ID', 'Device-specific number', 'Instant processing']
  },
  {
    name: 'Google Pay',
    icon: '🤖',
    description: 'Fast checkout on Android devices and Chrome browser',
    features: ['Tap to pay', 'Biometric authentication', 'Cross-device sync', 'Rewards integration']
  },
  {
    name: 'PayPal',
    icon: '🔵',
    description: 'Pay with your PayPal balance or linked cards securely',
    features: ['One-click checkout', 'Buyer protection', 'Instant transfers', 'Global acceptance']
  },
  {
    name: 'Samsung Pay',
    icon: '📲',
    description: 'MST technology works with most card terminals',
    features: ['MST compatibility', 'Samsung Rewards', 'Secure folder', 'Quick access']
  }
]

const benefits = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Lightning Fast',
    description: 'Checkout in seconds with one tap or click'
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Enhanced Security',
    description: 'Tokenization and biometric authentication'
  },
  {
    icon: <Fingerprint className="h-5 w-5" />,
    title: 'Biometric Auth',
    description: 'Pay with Face ID, Touch ID, or fingerprint'
  },
  {
    icon: <QrCode className="h-5 w-5" />,
    title: 'Multiple Methods',
    description: 'Tap, scan, or click - choose your preferred way'
  }
]

const securityFeatures = [
  {
    title: 'Tokenization',
    description: 'Your card details are replaced with unique tokens for each transaction'
  },
  {
    title: 'Biometric Verification',
    description: 'Requires Face ID, Touch ID, or fingerprint for authorization'
  },
  {
    title: 'Device-Specific Numbers',
    description: 'Unique device account numbers instead of your actual card number'
  },
  {
    title: 'Zero Liability',
    description: 'You are not responsible for unauthorized transactions'
  }
]

const usageStats = [
  {
    metric: '3x',
    description: 'Faster checkout compared to traditional methods'
  },
  {
    metric: '67%',
    description: 'Higher conversion rates with digital wallets'
  },
  {
    metric: '2.5M+',
    description: 'Monthly digital wallet transactions'
  },
  {
    metric: '<10s',
    description: 'Average checkout completion time'
  }
]

const setupSteps = [
  {
    step: 1,
    title: 'Add Payment Method',
    description: 'Link your preferred digital wallet in account settings'
  },
  {
    step: 2,
    title: 'Shop as Usual',
    description: 'Add items to cart and proceed to checkout'
  },
  {
    step: 3,
    title: 'Choose Wallet',
    description: 'Select your digital wallet at payment step'
  },
  {
    step: 4,
    title: 'Authenticate & Pay',
    description: 'Use biometrics or PIN to complete payment'
  }
]

const faqs = [
  {
    question: 'Are digital wallets safer than credit cards?',
    answer: 'Yes, digital wallets use tokenization and don\'t share your actual card details with merchants. Each transaction uses a unique token.'
  },
  {
    question: 'Can I use multiple digital wallets?',
    answer: 'Absolutely! You can add and use multiple digital wallets and choose your preferred one at checkout.'
  },
  {
    question: 'Do digital wallets work on desktop computers?',
    answer: 'Yes, most digital wallets like PayPal and Google Pay work on desktop browsers through their web interfaces.'
  },
  {
    question: 'What if my phone is lost or stolen?',
    answer: 'Your payments are protected by biometric authentication. You can also remotely lock or erase your wallet through device management services.'
  }
]

export default function DigitalWallets() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-purple-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Smartphone className="h-4 w-4 mr-2" />
              Contactless Payments
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Digital <span className="text-yellow-300">Wallet</span> Payments
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Checkout in seconds with one tap. Enhanced security, instant processing, and the ultimate convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Smartphone className="h-5 w-5 mr-2" />
                Setup Digital Wallet
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                View Supported Wallets
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Wallets */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Supported Digital Wallets
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose your preferred digital wallet for fast, secure payments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportedWallets.map((wallet, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{wallet.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {wallet.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {wallet.description}
                  </p>
                  <ul className="space-y-2">
                    {wallet.features.map((feature, featureIndex) => (
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
              Why Use Digital Wallets?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience the future of payments with these benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
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

      {/* Security Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Security Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your security is built into every transaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Statistics */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Customers Love Digital Wallets
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See the numbers that make digital wallets the preferred choice
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            {usageStats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stat.metric}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get Started in 4 Easy Steps
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Setup your digital wallet and start paying faster
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {setupSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
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

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Digital Wallet Payments Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Secure, seamless, and instant payment experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                      <Smartphone className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Initiate Payment</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Select digital wallet at checkout
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
                      <Fingerprint className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Authenticate</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Use biometrics or PIN to verify
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Complete</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Payment processed instantly
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
              Everything you need to know about digital wallet payments
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
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready for Faster Checkout?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Experience the convenience and security of digital wallet payments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Setup Digital Wallet Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Learn About Security
            </Button>
          </div>
          <p className="text-purple-200 mt-6 text-sm">
            🚀 One-Tap Checkout • 🔒 Biometric Security • ⚡ Instant Processing
          </p>
        </div>
      </section>
    </div>
  )
}
