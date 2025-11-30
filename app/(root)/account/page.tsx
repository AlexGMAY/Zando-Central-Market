// import BrowsingHistoryList from '@/components/shared/browsing-history-list'
// import { Card, CardContent } from '@/components/ui/card'
// import { Home, PackageCheckIcon, User } from 'lucide-react'
// import { Metadata } from 'next'
// import Link from 'next/link'
// import React from 'react'

// const PAGE_TITLE = 'Your Account'
// export const metadata: Metadata = {
//   title: PAGE_TITLE,
// }
// export default function AccountPage() {
//   return (
//     <div>
//       <h1 className='h1-bold py-4'>{PAGE_TITLE}</h1>
//       <div className='grid md:grid-cols-3 gap-4 items-stretch'>
//         <Card>
//           <Link href='/account/orders'>
//             <CardContent className='flex items-start gap-4 p-6'>
//               <div>
//                 <PackageCheckIcon className='w-12 h-12' />
//               </div>
//               <div>
//                 <h2 className='text-xl font-bold'>Orders</h2>
//                 <p className='text-muted-foreground'>
//                   Track, return, cancel an order, download invoice or buy again
//                 </p>
//               </div>
//             </CardContent>
//           </Link>
//         </Card>

//         <Card>
//           <Link href='/account/manage'>
//             <CardContent className='flex items-start gap-4 p-6'>
//               <div>
//                 <User className='w-12 h-12' />
//               </div>
//               <div>
//                 <h2 className='text-xl font-bold'>Login & security</h2>
//                 <p className='text-muted-foreground'>
//                   Manage password, email and mobile number
//                 </p>
//               </div>
//             </CardContent>
//           </Link>
//         </Card>

//         <Card>
//           <Link href='/account/addresses'>
//             <CardContent className='flex items-start gap-4 p-6'>
//               <div>
//                 <Home className='w-12 h-12' />
//               </div>
//               <div>
//                 <h2 className='text-xl font-bold'>Addresses</h2>
//                 <p className='text-muted-foreground'>
//                   Edit, remove or set default address
//                 </p>
//               </div>
//             </CardContent>
//           </Link>
//         </Card>
//       </div>
//       <BrowsingHistoryList className='mt-16' />
//     </div>
//   )
// }

import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  PackageCheckIcon, 
  User, 
  Shield, 
  CreditCard, 
  Settings,
  Heart,
  Bell,
  HelpCircle,
  ArrowRight,
  BadgeCheck
} from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

const PAGE_TITLE = 'Your Account'
export const metadata: Metadata = {
  title: PAGE_TITLE,
}

const accountCards = [
  {
    title: 'Orders & Purchases',
    description: 'Track, return, cancel orders, download invoices or buy again',
    icon: PackageCheckIcon,
    href: '/account/orders',
    color: 'blue',
    count: 12, // Example count
    badge: '3 new'
  },
  {
    title: 'Profile & Security',
    description: 'Manage password, email, mobile number and security settings',
    icon: User,
    href: '/account/manage',
    color: 'green',
    badge: 'Verified'
  },
  {
    title: 'Address Book',
    description: 'Edit, remove or set default shipping and billing addresses',
    icon: Home,
    href: '/account/addresses',
    color: 'purple',
    count: 2
  },
  {
    title: 'Payment Methods',
    description: 'Manage your saved credit cards, PayPal, and other payment options',
    icon: CreditCard,
    href: '/account/payments',
    color: 'orange'
  },
  {
    title: 'Wishlist',
    description: 'View and manage your saved items and create multiple wishlists',
    icon: Heart,
    href: '/account/wishlist',
    color: 'pink',
    count: 8
  },
  {
    title: 'Privacy & Settings',
    description: 'Control your privacy preferences and account settings',
    icon: Settings,
    href: '/account/settings',
    color: 'gray'
  }
]

const quickActions = [
  { label: 'Track Order', href: '/track-order', icon: PackageCheckIcon },
  { label: 'Contact Support', href: '/support', icon: HelpCircle },
  { label: 'Notification Settings', href: '/account/notifications', icon: Bell },
  { label: 'Security Center', href: '/account/security', icon: Shield }
]

const AccountPage = () => {
  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 dark:from-slate-900 dark:via-blue-950/10 dark:to-purple-950/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/30 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/30 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-4 border-white dark:border-slate-900">
                <BadgeCheck className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Your Account
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mt-2">
                Welcome back! Manage your account settings and preferences
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { label: 'Orders', value: '12', change: '+2' },
              { label: 'Wishlist Items', value: '8', change: '+1' },
              { label: 'Addresses', value: '3', change: '' },
              { label: 'Loyalty Points', value: '1,250', change: '+50' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 min-w-[140px]">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-base text-slate-600 dark:text-slate-400">{stat.label}</div>
                {stat.change && (
                  <div className="text-sm text-green-600 font-medium mt-2">{stat.change} this month</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid xl:grid-cols-4 gap-8">
          {/* Main Account Cards */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
              {accountCards.map((card, index) => {
                const Icon = card.icon
                const colorClasses = {
                  blue: 'from-blue-500 to-blue-600',
                  green: 'from-green-500 to-green-600',
                  purple: 'from-purple-500 to-purple-600',
                  orange: 'from-orange-500 to-orange-600',
                  pink: 'from-pink-500 to-pink-600',
                  gray: 'from-slate-500 to-slate-600'
                }[card.color]

                return (
                  <Card 
                    key={index}
                    className="group border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden"
                  >
                    <Link href={card.href}>
                      <CardContent className="p-8">
                        <div className="flex items-start gap-6">
                          {/* Icon with gradient background */}
                          <div className={`p-4 rounded-2xl bg-gradient-to-r ${colorClasses} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {card.title}
                              </h3>
                              
                              {/* Badges */}
                              <div className="flex gap-2 ml-2">
                                {card.count !== undefined && (
                                  <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium px-3 py-1 rounded-full">
                                    {card.count}
                                  </span>
                                )}
                                {card.badge && (
                                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                                    card.badge === 'Verified' 
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                  }`}>
                                    {card.badge}
                                  </span>
                                )}
                              </div>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6">
                              {card.description}
                            </p>

                            {/* Action Link */}
                            <div className="flex items-center text-base font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                              <span>Manage</span>
                              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                )
              })}
            </div>

            {/* Quick Actions Section */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={index}
                      href={action.href}
                      className="group p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center"
                    >
                      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl inline-flex group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="mt-4 text-lg font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {action.label}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Account Status & Security */}
          <div className="xl:col-span-1 space-y-8">
            {/* Account Status Card */}
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  Account Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-slate-600 dark:text-slate-400">Verification:</span>
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <BadgeCheck className="w-5 h-5" />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="text-slate-600 dark:text-slate-400">Member Since:</span>
                    <span className="text-slate-900 dark:text-white font-medium">2024</span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="text-slate-600 dark:text-slate-400">Loyalty Tier:</span>
                    <span className="text-blue-600 font-medium">Gold Member</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                    <span>Next Tier: Platinum</span>
                    <span>750/1000 pts</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="border-green-200/50 dark:border-green-800/50 bg-green-50/50 dark:bg-green-900/10 shadow-xl">
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl text-green-900 dark:text-green-300 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  Security Check
                </h3>
                <div className="space-y-4 text-base">
                  {[
                    { label: 'Two-Factor Auth', status: 'Enabled', color: 'text-green-600' },
                    { label: 'Recent Login', status: 'This device', color: 'text-green-600' },
                    { label: 'Password Age', status: '30 days', color: 'text-orange-600' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-green-800 dark:text-green-400">{item.label}</span>
                      <span className={`font-medium ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
                <Link href="/account/security">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full mt-6 border-green-200 text-green-700 hover:bg-green-100 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/20 text-base py-3"
                  >
                    Security Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="border-blue-200/50 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-900/10 shadow-xl">
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  Need Help?
                </h3>
                <p className="text-blue-800 dark:text-blue-400 text-base mb-6">
                  Our support team is available 24/7 to assist you.
                </p>
                <div className="space-y-3">
                  <Link href="/support">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-base py-3">
                      Contact Support
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button variant="outline" size="lg" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20 text-base py-3">
                      Help Center
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Browsing History */}
        <div className="mt-20">
          <BrowsingHistoryList />
        </div>
      </div>
    </div>
  )
}

export default AccountPage