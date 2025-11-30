import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import SeparatorWithOr from '@/components/shared/separator-or'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import CredentialsSignInForm from './credentials-signin-form'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { GoogleSignInForm } from './google-signin-form'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default async function SignIn(props: {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative flex min-h-screen items-center justify-center p-4">
        {/* Login Form */}
        <div className="w-full">
          <Card className="shadow-2xl border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
            <CardHeader className="space-y-6 pb-8">
              {/* Mobile Branding */}
              <div className="lg:hidden flex flex-col items-center space-y-4">
                <div className="flex items-center gap-3">                  
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    {APP_NAME}
                  </span>
                </div>
                <div className="text-center">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Welcome back
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Sign in to your account
                  </p>
                </div>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block text-center">
                <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">
                  <div className="mb-8">              
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                      Welcome back
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Sign in to access your enterprise dashboard and continue your seamless shopping experience.
                    </p>
                  </div>
                </CardTitle>                
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Sign-in */}
              <div className="space-y-4">
                <GoogleSignInForm />                
              </div>

              <SeparatorWithOr />

              {/* Credentials Form */}
              <div>
                <CredentialsSignInForm />
              </div>

              {/* Additional Options */}
              <div className="space-y-4">               

                <SeparatorWithOr>New to {APP_NAME}?</SeparatorWithOr>

                <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
                  <Button 
                    className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02]"
                    variant="default"
                  >
                    Create your {APP_NAME} account
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
