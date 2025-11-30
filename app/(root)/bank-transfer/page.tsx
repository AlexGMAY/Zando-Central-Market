import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Coins,
  Globe,
  Users,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bank Transfer Payments - Secure & Direct | Zando-Kin',
  description: 'Pay securely via bank transfer. Direct bank-to-bank payments with enhanced security, ideal for large purchases and business accounts.',
  keywords: 'bank transfer, direct debit, wire transfer, online banking, secure payments, business payments',
}

const supportedBanks = [
  {
    name: 'Standard Bank',
    features: ['Instant verification', 'Secure login', 'Mobile banking', '24/7 support']
  },
  {
    name: 'First National Bank',
    features: ['Quick transfer', 'Biometric auth', 'Business accounts', 'Bulk payments']
  },
  {
    name: 'Absa Bank',
    features: ['Real-time processing', 'Advanced security', 'Corporate banking', 'International transfers']
  },
  {
    name: 'Nedbank',
    features: ['Easy integration', 'Multi-currency', 'API access', 'Enterprise solutions']
  }
]

const benefits = [
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Enhanced Security',
    description: 'Direct bank-to-bank transfers with bank-level encryption'
  },
  {
    icon: <Coins className="h-5 w-5" />,
    title: 'No Extra Fees',
    description: 'Avoid credit card processing fees and service charges'
  },
  {
    icon: <Building className="h-5 w-5" />,
    title: 'Business Friendly',
    description: 'Ideal for corporate accounts and bulk purchases'
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Wide Acceptance',
    description: 'Works with major banks across multiple countries'
  }
]

const transferTypes = [
  {
    type: 'Instant Transfer',
    time: '2-15 minutes',
    fee: 'Free',
    features: ['Real-time processing', 'Immediate order confirmation', 'Available 24/7'],
    bestFor: 'Urgent purchases'
  },
  {
    type: 'Standard Transfer',
    time: '1-2 business days',
    fee: 'Free',
    features: ['Bank processing', 'Secure verification', 'Email notifications'],
    bestFor: 'Regular shopping',
    popular: true
  },
  {
    type: 'International Transfer',
    time: '2-5 business days',
    fee: 'Bank charges apply',
    features: ['Multi-currency', 'FX rates', 'International banking', 'SWIFT transfers'],
    bestFor: 'Cross-border purchases'
  }
]

const securityFeatures = [
  {
    title: 'Bank-Level Encryption',
    description: 'All transactions protected with 256-bit SSL encryption'
  },
  {
    title: 'Two-Factor Authentication',
    description: 'Additional verification through your banking app or SMS'
  },
  {
    title: 'Transaction Monitoring',
    description: 'Real-time fraud detection and suspicious activity alerts'
  },
  {
    title: 'Secure Banking APIs',
    description: 'Direct integration with bank security protocols'
  }
]

const usageScenarios = [
  {
    scenario: 'Large Purchases',
    description: 'Ideal for high-value items like electronics, furniture, or appliances',
    benefits: ['No transaction limits', 'Better security', 'Corporate billing']
  },
  {
    scenario: 'Business Accounts',
    description: 'Perfect for company purchases and procurement departments',
    benefits: ['Easy accounting', 'Bulk orders', 'Tax documentation']
  },
  {
    scenario: 'International Orders',
    description: 'Secure cross-border payments with proper documentation',
    benefits: ['Multi-currency', 'Bank guarantees', 'Trade compliance']
  }
]

const processSteps = [
  {
    step: 1,
    title: 'Select Bank Transfer',
    description: 'Choose bank transfer as your payment method at checkout'
  },
  {
    step: 2,
    title: 'Get Payment Details',
    description: 'Receive our secure banking information and reference number'
  },
  {
    step: 3,
    title: 'Make Transfer',
    description: 'Log into your online banking and complete the transfer'
  },
  {
    step: 4,
    title: 'Confirm Payment',
    description: 'We verify payment and confirm your order automatically'
  }
]

const faqs = [
  {
    question: 'How long do bank transfers take to process?',
    answer: 'Instant transfers take 2-15 minutes, standard transfers 1-2 business days, and international transfers 2-5 business days.'
  },
  {
    question: 'Are there any fees for using bank transfer?',
    answer: 'We do not charge any fees for bank transfers. However, some banks may charge for international transfers or expedited processing.'
  },
  {
    question: 'Is bank transfer safe for large purchases?',
    answer: 'Yes, bank transfers are one of the safest methods for large purchases due to bank-level security and direct institution-to-institution transfers.'
  },
  {
    question: 'Can I use bank transfer for international orders?',
    answer: 'Absolutely! We accept international bank transfers with proper documentation and currency conversion.'
  }
]

export default function BankTransfer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-900 dark:to-blue-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <Building className="h-4 w-4 mr-2" />
              Direct Banking
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Bank <span className="text-yellow-300">Transfer</span> Payments
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Secure direct bank payments with enhanced security. Ideal for large purchases, business accounts, and international orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Building className="h-5 w-5 mr-2" />
                Pay via Bank Transfer
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                View Supported Banks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Banks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Supported Banks & Institutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We work with major banking partners across multiple countries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportedBanks.map((bank, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                    {bank.name}
                  </h3>
                  <ul className="space-y-2">
                    {bank.features.map((feature, featureIndex) => (
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
              Why Choose Bank Transfer?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience secure, direct banking with these advantages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 text-teal-600 dark:text-teal-400">
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

      {/* Transfer Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Transfer Options & Timelines
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Choose the transfer method that fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {transferTypes.map((transfer, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative ${
                transfer.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              }`}>
                {transfer.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                    {transfer.type}
                  </CardTitle>
                  <div className="mt-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {transfer.time}
                    </div>
                    <div className="text-green-600 dark:text-green-400 font-semibold">
                      {transfer.fee}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h4>
                    <ul className="space-y-2">
                      {transfer.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Best for: <span className="text-blue-600 dark:text-blue-400">{transfer.bestFor}</span>
                    </p>
                  </div>
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
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your transactions are protected by multiple security layers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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

      {/* Usage Scenarios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perfect For These Scenarios
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Bank transfers excel in these specific use cases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {usageScenarios.map((scenario, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {scenario.scenario}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {scenario.description}
                  </p>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Benefits:</p>
                    <ul className="space-y-1">
                      {scenario.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {benefit}
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

      {/* Process Steps */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Bank Transfer Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple 4-step process for secure payments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to know about bank transfer payments
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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 text-yellow-300" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready for Secure Direct Payments?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the security and reliability of direct bank transfers for your purchases
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Pay via Bank Transfer
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Contact Business Support
            </Button>
          </div>
          <p className="text-blue-200 mt-6 text-sm">
            🏦 Bank-Level Security • 💰 No Extra Fees • 🌍 International Support
          </p>
        </div>
      </section>
    </div>
  )
}
