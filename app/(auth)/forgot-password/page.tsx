import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import RecoveryForm from './recoveryForm'


export const metadata: Metadata = {
  title: 'Forgot Password - Account Recovery',
}

export default async function ForgotPasswordPage() {
  const session = await auth()
  if (session) {
    return redirect('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative flex min-h-screen items-center justify-center p-4">
        {/* Recovery Form */}
        <div className="w-full max-w-md">
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
                    Reset Password
                  </CardTitle>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Recover access to your account
                  </p>
                </div>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block text-center">
                <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">
                  <div className="mb-6">              
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      Reset Password
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                      Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
                  </div>
                </CardTitle>                
              </div>

              {/* Security Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">Secure Password Recovery</p>
                    <p className="text-blue-700 dark:text-blue-300">We&apos;ll send a secure link to your email to reset your password. The link expires in 1 hour.</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Recovery Form */}
              <RecoveryForm />

              {/* Back to Sign In */}
              <div className="text-center pt-4">
                <Link href="/sign-in">
                  <Button 
                    variant="ghost"
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    ← Back to sign in
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
