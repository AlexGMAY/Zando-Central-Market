'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { requestPasswordReset } from '@/lib/actions/user.actions'

// Fixed type definition
type FormState = {
  message: string;
  success: boolean;
  errors: {
    email?: string[];
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
      className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Sending reset link...
        </div>
      ) : (
        'Send Reset Link'
      )}
    </Button>
  )
}

export default function RecoveryForm() {
  const [state, formAction] = useFormState(requestPasswordReset, initialState)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (state.success) {
      toast({        
        title: 'Reset link sent!',
        description: 'Check your email for password reset instructions.',
        variant: 'default',
      })      
    } else if (state.message && !state.success) {
      toast({
        title: 'Failed to send reset link',
        description: state.message,
        variant: 'destructive',
      })
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 border-slate-300 dark:border-slate-600 focus:border-blue-500 transition-colors"
        />
        {state.errors?.email && (
          <p className="text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

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
              <p className="font-medium">Check your email</p>
              <p className="text-green-700 dark:text-green-300">
                We&apos;ve sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
