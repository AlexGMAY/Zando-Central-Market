'use client'
import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IUserSignIn } from '@/types'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignInSchema } from '@/lib/validator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { APP_NAME } from '@/lib/constants'
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react'

const signInDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        email: 'admin@example.com',
        password: '123456',
      }
    : {
        email: '',
        password: '',
      }

export default function CredentialsSignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<IUserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: signInDefaultValues,
  })

  const { control, handleSubmit } = form

  const onSubmit = async (data: IUserSignIn) => {
    setIsLoading(true)
    try {
      await signInWithCredentials({
        email: data.email,
        password: data.password,
      })
      redirect(callbackUrl)
    } catch (error) {
      if (isRedirectError(error)) {
        throw error
      }
      toast({
        title: 'Authentication Failed',
        description: 'Invalid email or password. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        
        {/* Email Field */}
        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder='enterprise@company.com' 
                    {...field}
                    className="h-12 pl-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-800 transition-all duration-200"
                    type="email"
                    disabled={isLoading}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    {...field}
                    className="h-12 pl-10 pr-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-800 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link 
            href="/forgot-password" 
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <div>
          <Button 
            type='submit' 
            className="w-full h-12 bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 dark:from-slate-100 dark:to-slate-300 dark:text-slate-900 dark:hover:from-slate-200 dark:hover:to-slate-400 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-slate-900 dark:border-t-transparent" />
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Sign In Securely</span>
              </div>
            )}
          </Button>
        </div>

        {/* Terms and Conditions */}
        <div className='text-xs text-slate-600 dark:text-slate-400 text-center leading-relaxed pt-4 border-t border-slate-200 dark:border-slate-700'>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-3 h-3 text-green-500" />
            <span>Protected by end-to-end encryption</span>
          </div>
          By signing in, you agree to {APP_NAME}&apos;s{' '}
          <Link 
            href='/page/conditions-of-use' 
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
          >
            Conditions of Use
          </Link>{' '}
          and{' '}
          <Link 
            href='/page/privacy-policy'
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
          >
            Privacy Notice
          </Link>.
        </div>
      </form>
    </Form>
  )
}
