'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { resetPassword } from '@/lib/actions/user.actions'


type FormState = {
  message: string;
  success: boolean;
  errors: {
    password?: string[];
    confirmPassword?: string[];
    token?: string[];
  } | null;
}

const initialState: FormState = {
  message: '',
  success: false,
  errors: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button 
      type="submit" 
      className="w-full h-11 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Updating password...
        </div>
      ) : (
        'Reset Password'
      )}
    </Button>
  )
}

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction] = useFormState(resetPassword, initialState)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Password reset successful!',
        description: 'You can now sign in with your new password.',
        variant: 'default',
      })
      // Redirect to sign in after successful reset
      setTimeout(() => {
        router.push('/sign-in')
      }, 2000)
    } else if (state.message && !state.success) {
      toast({
        title: 'Failed to reset password',
        description: state.message,
        variant: 'destructive',
      })
    }
  }, [state, router])

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={token} />
      
      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          New Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 border-slate-300 dark:border-slate-600 focus:border-blue-500 transition-colors"
        />
        {state.errors?.password && (
          <p className="text-sm text-red-600">{state.errors.password[0]}</p>
        )}
        <p className="text-xs text-slate-500">
          Must be at least 8 characters long
        </p>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Confirm New Password
        </Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-11 border-slate-300 dark:border-slate-600 focus:border-blue-500 transition-colors"
        />
        {state.errors?.confirmPassword && (
          <p className="text-sm text-red-600">{state.errors.confirmPassword[0]}</p>
        )}
      </div>

      {/* Password Strength Indicator */}
      {password && (
        <div className="space-y-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  password.length >= level * 2
                    ? level <= 2
                      ? 'bg-red-400'
                      : level === 3
                      ? 'bg-yellow-400'
                      : 'bg-green-400'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">
            {password.length < 8
              ? 'Too short'
              : password.length < 12
              ? 'Good'
              : 'Strong'}
          </p>
        </div>
      )}

      {/* Success Message */}
      {state.success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-green-800 dark:text-green-200">
              <p className="font-medium">Password updated successfully!</p>
              <p className="text-green-700 dark:text-green-300">
                Redirecting you to sign in page...
              </p>
            </div>
          </div>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
