// import {
//   LinkAuthenticationElement,
//   PaymentElement,
//   useElements,
//   useStripe,
// } from '@stripe/react-stripe-js'
// import { FormEvent, useState } from 'react'

// import { Button } from '@/components/ui/button'
// import ProductPrice from '@/components/shared/product/product-price'
// import { SERVER_URL } from '@/lib/constants'

// export default function StripeForm({
//   priceInCents,
//   orderId,
// }: {
//   priceInCents: number
//   orderId: string
// }) {
//   const stripe = useStripe()
//   const elements = useElements()
//   const [isLoading, setIsLoading] = useState(false)
//   const [errorMessage, setErrorMessage] = useState<string>()
//   const [email, setEmail] = useState<string>()

//   async function handleSubmit(e: FormEvent) {
//     e.preventDefault()

//     if (stripe == null || elements == null || email == null) return

//     setIsLoading(true)
//     stripe
//       .confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${SERVER_URL}/checkout/${orderId}/stripe-payment-success`,
//         },
//       })
//       .then(({ error }) => {
//         if (error.type === 'card_error' || error.type === 'validation_error') {
//           setErrorMessage(error.message)
//         } else {
//           setErrorMessage('An unknown error occurred')
//         }
//       })
//       .finally(() => setIsLoading(false))
//   }

//   return (
//     <form onSubmit={handleSubmit} className='space-y-4'>
//       <div className='text-xl'>Stripe Checkout</div>
//       {errorMessage && <div className='text-destructive'>{errorMessage}</div>}
//       <PaymentElement />
//       <div>
//         <LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
//       </div>
//       <Button
//         className='w-full'
//         size='lg'
//         disabled={stripe == null || elements == null || isLoading}
//       >
//         {isLoading ? (
//           'Purchasing...'
//         ) : (
//           <div>
//             Purchase - <ProductPrice price={priceInCents / 100} plain />
//           </div>
//         )}
//       </Button>
//     </form>
//   )
// }

import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { FormEvent, useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'
import { SERVER_URL } from '@/lib/constants'
import { 
  Lock, 
  Shield, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export default function StripeForm({
  priceInCents,
  orderId,
}: {
  priceInCents: number
  orderId: string
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [paymentReady, setPaymentReady] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Check if payment element is ready
  useEffect(() => {
    if (elements) {
      // Use a timeout to check if elements are ready since there's no direct event
      const timer = setTimeout(() => {
        setPaymentReady(true)
        if (email) {
          setCurrentStep(2)
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [elements, email])

  // Update step when email is entered
  useEffect(() => {
    if (email && currentStep === 1) {
      setCurrentStep(2)
    }
  }, [email, currentStep])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (stripe == null || elements == null || email == null) {
      setErrorMessage('Please complete all required fields')
      return
    }

    setIsLoading(true)
    setErrorMessage(undefined)
    
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${SERVER_URL}/checkout/${orderId}/stripe-payment-success`,
          payment_method_data: {
            billing_details: {
              email: email,
            },
          },
        },
        redirect: 'if_required',
      })

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setErrorMessage(error.message)
        } else {
          setErrorMessage('An unexpected error occurred. Please try again.')
        }
      } else {
        setCurrentStep(3)
      }
    } catch (error) {
      setErrorMessage('Payment processing failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const PaymentStep = ({ step, title, description, current, completed }: {
    step: number;
    title: string;
    description: string;
    current: boolean;
    completed: boolean;
  }) => (
    <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
      current 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : completed 
        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
    }`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0 ${
        current 
          ? 'bg-blue-500 text-white' 
          : completed 
          ? 'bg-green-500 text-white'
          : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
      }`}>
        {completed ? <CheckCircle2 className="w-4 h-4" /> : step}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold ${
          current || completed 
            ? 'text-slate-900 dark:text-white' 
            : 'text-slate-500 dark:text-slate-400'
        }`}>
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {description}
        </p>
      </div>
    </div>
  )

  return (
    <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Secure Card Payment
          </h3>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Shield className="w-4 h-4" />
            <span>Secure</span>
          </div>
        </div>
        
        {/* Payment Progress */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>Payment Progress</span>
          <span>Step {currentStep} of 3</span>
        </div>
        <Progress value={(currentStep / 3) * 100} className="h-1 mt-1" />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Steps */}
          <div className="space-y-3">
            <PaymentStep
              step={1}
              title="Contact Information"
              description="Enter your email for payment confirmation"
              current={currentStep === 1}
              completed={currentStep > 1}
            />
            
            <PaymentStep
              step={2}
              title="Payment Details"
              description="Enter your card information securely"
              current={currentStep === 2}
              completed={currentStep > 2}
            />
            
            <PaymentStep
              step={3}
              title="Confirmation"
              description="Review and complete your payment"
              current={currentStep === 3}
              completed={false}
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
            </div>
          )}

          {/* Payment Elements */}
          <div className="space-y-4">
            <div className={`transition-opacity duration-300 ${
              currentStep >= 1 ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <LinkAuthenticationElement 
                  onChange={(e) => setEmail(e.value.email)}
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Payment confirmation will be sent to this email
              </p>
            </div>

            <div className={`transition-opacity duration-300 ${
              currentStep >= 2 ? 'opacity-100' : 'opacity-50 pointer-events-none'
            }`}>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Payment Details
              </label>
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <PaymentElement 
                  options={{
                    layout: 'tabs',
                    wallets: {
                      applePay: 'never',
                      googlePay: 'never',
                    }
                  }}
                />
              </div>
              {!paymentReady && (
                <div className="flex items-center gap-2 mt-2">
                  <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
                  <span className="text-xs text-slate-500">Loading payment form...</span>
                </div>
              )}
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Amount:
              </span>
              <span className="text-lg font-bold text-green-600">
                <ProductPrice price={priceInCents / 100} plain />
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!stripe || !elements || isLoading || !paymentReady || !email}
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Pay Securely</span>
                </div>
              )}
            </Button>

            {/* Security Badges */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Shield className="w-3 h-3 text-green-500" />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Lock className="w-3 h-3 text-blue-500" />
                <span>256-bit SSL</span>
              </div>
            </div>

            {/* Trust Message */}
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-3">
              Your payment is secured by Stripe. We never store your card details.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
