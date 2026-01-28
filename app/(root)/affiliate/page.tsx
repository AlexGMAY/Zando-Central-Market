import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Shield, 
  Zap, 
  BarChart3,  
  CheckCircle2,
  Star,
  Award, 
  Gift,
  Target
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Affiliate Program - Earn Commissions | Zando-Kin',
  description: 'Join Zando-Kin Affiliate Program and earn generous commissions promoting products you love. Start earning today.',
  keywords: 'affiliate program, earn money online, commissions, influencer marketing, Zando-Kin affiliate',
}

const benefits = [
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: 'High Commissions',
    description: 'Earn up to 15% commission on every qualified sale'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Fast Payments',
    description: 'Get paid monthly via multiple payment methods'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Real-time Analytics',
    description: 'Track your performance with detailed reporting dashboard'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Reliable Tracking',
    description: '60-day cookie duration with accurate conversion tracking'
  }
]

const commissionTiers = [
  {
    level: 'Starter',
    commission: '5%',
    requirements: '0-10 sales/month',
    features: [
      'Basic affiliate dashboard',
      'Standard marketing materials',
      'Email support',
      '30-day cookie duration'
    ]
  },
  {
    level: 'Pro',
    commission: '10%',
    requirements: '11-50 sales/month',
    features: [
      'Advanced analytics',
      'Custom landing pages',
      'Priority support',
      '60-day cookie duration',
      'Dedicated affiliate manager'
    ],
    popular: true
  },
  {
    level: 'Elite',
    commission: '15%',
    requirements: '50+ sales/month',
    features: [
      'Premium placement',
      'Exclusive deals',
      '24/7 dedicated support',
      '90-day cookie duration',
      'Performance bonuses',
      'Early access to new features'
    ]
  }
]

const successStories = [
  {
    name: 'Sarah M.',
    niche: 'Beauty Influencer',
    earnings: '$8,240',
    testimonial: 'Zando-Kin affiliate program helped me monetize my passion for beauty products. The commissions are generous and payments are always on time.',
    avatar: '👩‍🎤'
  },
  {
    name: 'Mike T.',
    niche: 'Tech Reviewer',
    earnings: '$12,500',
    testimonial: 'As a tech reviewer, I appreciate the wide range of electronics available. The real-time analytics help me optimize my content strategy.',
    avatar: '👨‍💻'
  },
  {
    name: 'Lisa K.',
    niche: 'Mommy Blogger',
    earnings: '$5,800',
    testimonial: 'Perfect for parenting bloggers! Great selection of baby products and the commission structure is very fair for my audience size.',
    avatar: '👩‍👧'
  }
]

const faqs = [
  {
    question: 'How much does it cost to join?',
    answer: 'It\'s completely free to join our affiliate program. No hidden fees or monthly charges.'
  },
  {
    question: 'How often are commissions paid?',
    answer: 'Commissions are paid monthly via bank transfer, PayPal, or other available payment methods.'
  },
  {
    question: 'What is the cookie duration?',
    answer: 'We offer a 60-day cookie duration, meaning you earn commission on purchases made within 60 days of clicking your affiliate link.'
  },
  {
    question: 'Can I promote on social media?',
    answer: 'Absolutely! You can promote on any platform including Instagram, YouTube, TikTok, blogs, and websites.'
  }
]

export default function BecomeAnAffiliate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-green-900/20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-0 backdrop-blur-sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Start Earning Today
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Become a <span className="text-yellow-300">Zando-Kin</span> Affiliate
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Turn your audience into income. Earn generous commissions promoting products you love to your followers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
                <Users className="h-5 w-5 mr-2" />
                Join Program Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
                View Commission Rates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">25K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Affiliates</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">$15M+</div>
              <div className="text-gray-600 dark:text-gray-400">Paid in Commissions</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">60</div>
              <div className="text-gray-600 dark:text-gray-400">Day Cookie Duration</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-400">Affiliate Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join Our Affiliate Program?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to succeed as an affiliate marketer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
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

      {/* Commission Tiers */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Competitive Commission Structure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Earn more as you grow with our tiered commission system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {commissionTiers.map((tier, index) => (
              <Card key={index} className={`border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm relative ${
                tier.popular ? 'ring-2 ring-green-500 scale-105' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-500 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {tier.level}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {tier.commission}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 block text-sm mt-1">
                      Commission Rate
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    {tier.requirements}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${
                    tier.popular 
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700' 
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

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Hear from our successful affiliates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{story.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{story.name}</h3>
                      <p className="text-sm text-green-600 dark:text-green-400">{story.niche}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                    &quot;{story.testimonial}&quot;
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Monthly Earnings</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">{story.earnings}</span>
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
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Start earning in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Apply & Get Approved</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete our simple application form and get approved within 24 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Promote Products</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Share your unique affiliate links across your platforms and content
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Earn Commissions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get paid monthly for every sale generated through your affiliate links
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
              Everything you need to know about our affiliate program
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
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful affiliates already earning with Zando-Kin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-xl">
              Apply Now - It&apos;s Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg rounded-xl">
              Contact Affiliate Team
            </Button>
          </div>
          <p className="text-green-200 mt-6 text-sm">
            Average approval time: 24 hours • No credit card required
          </p>
        </div>
      </section>
    </div>
  )
}