// import { APP_NAME } from '@/lib/constants'
// import Link from 'next/link'
// import React from 'react'

// export default function CheckoutFooter() {
//   return (
//     <div className='border-t-2 space-y-2 my-4 py-4'>
//       <p>
//         Need help? Check our <Link href='/page/help'>Help Center</Link> or{' '}
//         <Link href='/page/contact-us'>Contact Us</Link>{' '}
//       </p>
//       <p>
//         For an item ordered from {APP_NAME}: When you click the &apos;Place Your
//         Order&apos; button, we will send you an e-mail acknowledging receipt of
//         your order. Your contract to purchase an item will not be complete until
//         we send you an e-mail notifying you that the item has been shipped to
//         you. By placing your order, you agree to {APP_NAME}
//         &apos;s <Link href='/page/privacy-policy'>privacy notice</Link> and
//         <Link href='/page/conditions-of-use'> conditions of use</Link>.
//       </p>
//       <p>
//         Within 30 days of delivery, you may return new, unopened merchandise in
//         its original condition. Exceptions and restrictions apply.{' '}
//         <Link href='/page/returns-policy'>
//           See {APP_NAME}&apos;s Returns Policy.
//         </Link>
//       </p>
//     </div>
//   )
// }

import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  Shield, 
  Truck, 
  RefreshCw, 
  Clock,
  FileText,
  ArrowRight
} from 'lucide-react'

export default function CheckoutFooter() {
  return (
    <div className="border-t border-slate-200/50 dark:border-slate-700/50 mt-12 pt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Support Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Need Help?
            </h3>
          </div>
          
          <div className="space-y-3">
            <Link 
              href="/page/help" 
              className="flex items-center gap-3 group text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <FileText className="w-3 h-3" />
              </div>
              <span className="font-medium">Help Center & FAQs</span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <Link 
              href="/page/contact-us" 
              className="flex items-center gap-3 group text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <Mail className="w-3 h-3" />
              </div>
              <span className="font-medium">Contact Customer Service</span>
              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <div className="w-6 h-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Phone className="w-3 h-3" />
              </div>
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-300">24/7 Support</span>
                <p className="text-sm">1-800-HELP-NOW</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Process Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Order Process
            </h3>
          </div>
          
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <p>
                When you click &apos;Place Your Order&apos;, we&apos;ll send a confirmation email 
                acknowledging receipt of your order.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <p>
                Your purchase contract is complete once we send the shipping confirmation 
                email with tracking details.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                By placing your order, you agree to {APP_NAME}&apos;s{' '}
                <Link 
                  href="/page/privacy-policy" 
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-2"
                >
                  privacy notice
                </Link>{' '}
                and{' '}
                <Link 
                  href="/page/conditions-of-use" 
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-2"
                >
                  conditions of use
                </Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Returns & Security Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <RefreshCw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Easy Returns
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
              <Truck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>
                Return new, unopened items in original condition within 30 days of delivery.
              </p>
            </div>
            
            <Link 
              href="/page/returns-policy"
              className="flex items-center gap-2 group text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <span className="text-sm font-medium">View Full Returns Policy</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Security Badge */}
            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Secure Checkout</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>Global Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span>30-Day Returns</span>
            </div>
          </div>
          
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-right">
            <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
