import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Reset Password - Create New Password',
}

export default async function ResetPasswordPage(props: {
  searchParams: Promise<{
    token: string
  }>
}) {
  const searchParams = await props.searchParams
  const { token } = searchParams

  const session = await auth()
  if (session) {
    return redirect('/')
  }

  if (!token) {
    return redirect('/forgot-password')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30">
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800/50 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
            <CardHeader className="space-y-6 pb-8">
              <div className="text-center">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  New Password
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400">
                  Create a new password for your account
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <p className="font-medium mb-1">Create a strong password</p>
                    <p className="text-blue-700 dark:text-blue-300">Use at least 8 characters with a mix of letters, numbers, and symbols.</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ResetPasswordForm token={token} />

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
