// import { HelpCircle } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// export default function CheckoutLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className='p-4'>
//       <header className='bg-card mb-4 border-b'>
//         <div className='max-w-6xl mx-auto flex justify-between items-center'>
//           <Link href='/'>
//             <Image
//               src='/icons/logo.svg'
//               alt='logo'
//               width={70}
//               height={70}
//               style={{
//                 maxWidth: '100%',
//                 height: 'auto',
//               }}
//             />
//           </Link>
//           <div>
//             <h1 className='text-3xl'>Checkout</h1>
//           </div>
//           <div>
//             <Link href='/page/help'>
//               <HelpCircle className='w-6 h-6' />
//             </Link>
//           </div>
//         </div>
//       </header>
//       {children}
//     </div>
//   )
// }

import { HelpCircle, Shield, Lock, Phone, Mail, Truck, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { APP_NAME } from '@/lib/constants'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 dark:from-slate-900 dark:via-blue-950/10 dark:to-purple-950/5">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/30 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/30 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      {/* Security Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo & Back */}
              <div className="flex items-center gap-4">
                <Link 
                  href="/" 
                  className="group flex items-center gap-3 transition-all duration-200 hover:scale-105"
                >
                  <div className="relative">
                    <Image
                      src='/icons/logo.svg'
                      alt={`${APP_NAME} logo`}
                      width={48}
                      height={48}
                      className="drop-shadow-sm group-hover:drop-shadow transition-all"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                    <div className="absolute -inset-1 bg-blue-500/10 rounded-lg blur-sm group-hover:bg-blue-500/20 transition-colors" />
                  </div>
                  <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    {APP_NAME}
                  </span>
                </Link>
                
                {/* Back to Shopping */}
                <Link
                  href="/"
                  className="hidden md:flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-medium">Continue Shopping</span>
                </Link>
              </div>

              {/* Checkout Title & Progress */}
              <div className="flex flex-col items-center">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Secure Checkout
                </h1>
                <div className="hidden sm:flex items-center gap-6 mt-2">
                  {['Cart', 'Information', 'Shipping', 'Payment'].map((step, index) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        index === 0 
                          ? 'bg-green-500' 
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`} />
                      <span className={`text-xs font-medium ${
                        index === 0
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & Help */}
              <div className="flex items-center gap-4">
                {/* Security Badge */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Secure Checkout
                  </span>
                </div>

                {/* Contact Support */}
                <div className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">24/7 Support</span>
                </div>

                {/* Help */}
                <Link 
                  href="/page/help"
                  className="group p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="Get Help"
                >
                  <HelpCircle className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Progress Bar */}
          <div className="sm:hidden bg-slate-100 dark:bg-slate-800">
            <div className="max-w-7xl mx-auto px-4">
              <div className="h-1 bg-green-500 w-1/4 rounded-full" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-8">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
                {/* Security Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-green-400" />
                      <div>
                        <h2 className="text-white font-semibold">Secure Payment</h2>
                        <p className="text-green-300 text-sm">All transactions are encrypted</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                            style={{ animationDelay: `${i * 0.2}s` }} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-green-400 font-medium">Live</span>
                    </div>
                  </div>
                </div>
                
                {/* Form Content */}
                <div className="p-6 lg:p-8">
                  {children}
                </div>
              </div>
            </div>

            {/* Trust Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Trust Card */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Why Shop With Confidence
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Lock, text: '256-bit SSL encryption', color: 'text-blue-500' },
                      { icon: Shield, text: 'PCI DSS compliant', color: 'text-green-500' },
                      { icon: Truck, text: 'Fast global shipping', color: 'text-purple-500' },
                      { icon: Mail, text: 'Order confirmation', color: 'text-orange-500' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support Card */}
                <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm rounded-2xl border border-blue-200/50 dark:border-blue-800/50 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-blue-500" />
                    Need Help?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Our support team is here to help you complete your purchase.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-700 dark:text-slate-300">1-800-HELP-NOW</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="text-slate-700 dark:text-slate-300">support@{APP_NAME.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Security Footer */}
        <footer className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm border-t border-slate-700/50 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>PCI Compliant</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Link 
                  href="/page/privacy-policy" 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <Link 
                  href="/page/terms-of-service" 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </Link>
                <Link 
                  href="/page/refund-policy" 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
