import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import SeparatorWithOr from '@/components/shared/separator-or'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import SignUpForm from './signup-form'
import { GoogleSignInForm } from '../sign-in/google-signin-form'

export const metadata: Metadata = {
  title: 'Sign Up - Create Your Account',
}

export default async function SignUpPage(props: {
  searchParams: Promise<{
    callbackUrl: string
  }>
}) {
  const searchParams = await props.searchParams
  const { callbackUrl = '/' } = searchParams

  const session = await auth()
  if (session) {
    return redirect(callbackUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative flex min-h-screen items-center justify-center p-4">
        {/* Sign Up Form */}
        <div className="w-full">
          <Card className="shadow-2xl border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
            <CardHeader className="space-y-6 pb-8">
              {/* Mobile Branding */}
              <div className="lg:hidden flex flex-col items-center space-y-4">
                <div className="flex items-center gap-3">                  
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {APP_NAME}
                  </span>
                </div>
                <div className="text-center">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Join us today
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Create your account and get started
                  </p>
                </div>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block text-center">
                <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">
                  <div className="mb-6">              
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      Join {APP_NAME}
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Create your enterprise account and unlock a world of seamless shopping experiences.
                    </p>
                  </div>
                </CardTitle>                
              </div>

              {/* Benefits List */}
              {/* <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Fast, secure checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Personalized recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Order tracking and history</span>
                </div>
              </div> */}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Sign-up */}
              <div className="space-y-4">
                <GoogleSignInForm />                
              </div>

              <SeparatorWithOr />

              {/* Sign Up Form */}
              <div>
                <SignUpForm/>
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <SeparatorWithOr>Already have an account?</SeparatorWithOr>

                <Link href={`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
                  <Button 
                    className="w-full h-11 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] border border-slate-500/20"
                    variant="default"
                  >
                    Sign in to your account
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
