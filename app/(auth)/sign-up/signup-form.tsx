// 'use client'
// import { redirect, useSearchParams } from 'next/navigation'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import Link from 'next/link'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { useForm } from 'react-hook-form'
// import { IUserSignUp } from '@/types'
// import { registerUser, signInWithCredentials } from '@/lib/actions/user.actions'
// import { toast } from '@/hooks/use-toast'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { UserSignUpSchema } from '@/lib/validator'
// import { Separator } from '@/components/ui/separator'
// import { isRedirectError } from 'next/dist/client/components/redirect-error'
// import { APP_NAME } from '@/lib/constants'

// const signUpDefaultValues =
//   process.env.NODE_ENV === 'development'
//     ? {
//         name: 'john doe',
//         email: 'john@me.com',
//         password: '123456',
//         confirmPassword: '123456',
//       }
//     : {
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//       }

// export default function SignUpForm() {
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get('callbackUrl') || '/'

//   const form = useForm<IUserSignUp>({
//     resolver: zodResolver(UserSignUpSchema),
//     defaultValues: signUpDefaultValues,
//   })

//   const { control, handleSubmit } = form

//   const onSubmit = async (data: IUserSignUp) => {
//     try {
//       const res = await registerUser(data)
//       if (!res.success) {
//         toast({
//           title: 'Error',
//           description: res.error,
//           variant: 'destructive',
//         })
//         return
//       }
//       await signInWithCredentials({
//         email: data.email,
//         password: data.password,
//       })
//       redirect(callbackUrl)
//     } catch (error) {
//       if (isRedirectError(error)) {
//         throw error
//       }
//       toast({
//         title: 'Error',
//         description: 'Invalid email or password',
//         variant: 'destructive',
//       })
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='space-y-6'>
//           <FormField
//             control={control}
//             name='name'
//             render={({ field }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Enter name address' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name='email'
//             render={({ field }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Enter email address' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={control}
//             name='password'
//             render={({ field }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type='password'
//                     placeholder='Enter password'
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={control}
//             name='confirmPassword'
//             render={({ field }) => (
//               <FormItem className='w-full'>
//                 <FormLabel>Confirm Password</FormLabel>
//                 <FormControl>
//                   <Input
//                     type='password'
//                     placeholder='Confirm Password'
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div>
//             <Button type='submit'>Sign Up</Button>
//           </div>
//           <div className='text-sm'>
//             By creating an account, you agree to {APP_NAME}&apos;s{' '}
//             <Link href='/page/conditions-of-use'>Conditions of Use</Link> and{' '}
//             <Link href='/page/privacy-policy'> Privacy Notice. </Link>
//           </div>
//           <Separator className='mb-4' />
//           <div className='text-sm'>
//             Already have an account?{' '}
//             <Link className='link' href={`/sign-in?callbackUrl=${callbackUrl}`}>
//               Sign In
//             </Link>
//           </div>
//         </div>
//       </form>
//     </Form>
//   )
// }

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
import { IUserSignUp } from '@/types'
import { registerUser, signInWithCredentials } from '@/lib/actions/user.actions'
import { toast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSignUpSchema } from '@/lib/validator'
import { Separator } from '@/components/ui/separator'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { APP_NAME } from '@/lib/constants'
import { Eye, EyeOff, Lock, Mail, User, Shield, Check, ArrowRight } from 'lucide-react'

const signUpDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        name: 'john doe',
        email: 'john@me.com',
        password: '123456',
        confirmPassword: '123456',
      }
    : {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      }

export default function SignUpForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<IUserSignUp>({
    resolver: zodResolver(UserSignUpSchema),
    defaultValues: signUpDefaultValues,
  })

  const { control, handleSubmit, watch } = form
  const password = watch('password')

  const onSubmit = async (data: IUserSignUp) => {
    setIsLoading(true)
    try {
      const res = await registerUser(data)
      if (!res.success) {
        toast({
          title: 'Registration Failed',
          description: res.error,
          variant: 'destructive',
        })
        return
      }
      
      toast({
        title: 'Account Created Successfully',
        description: 'Welcome to ' + APP_NAME + '!',
        variant: 'default',
      })

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
        title: 'Registration Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = {
    hasMinLength: password?.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type='hidden' name='callbackUrl' value={callbackUrl} />
        
        {/* Name Field */}
        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder='John Doe' 
                    {...field}
                    className="h-12 pl-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-slate-800 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

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
                    placeholder='john.doe@company.com' 
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
                    placeholder='Create a strong password'
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
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-3 mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Password strength</span>
                    <span className={`font-medium ${
                      strengthScore >= 4 ? 'text-green-600' : 
                      strengthScore >= 3 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {strengthScore >= 4 ? 'Strong' : strengthScore >= 3 ? 'Good' : 'Weak'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        strengthScore >= 4 ? 'bg-green-500 w-full' : 
                        strengthScore >= 3 ? 'bg-yellow-500 w-3/4' : 
                        strengthScore >= 2 ? 'bg-orange-500 w-1/2' : 
                        'bg-red-500 w-1/4'
                      }`}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                    {[
                      { key: 'hasMinLength', label: 'At least 8 characters' },
                      { key: 'hasUpperCase', label: 'Uppercase letter' },
                      { key: 'hasLowerCase', label: 'Lowercase letter' },
                      { key: 'hasNumber', label: 'Number' },
                      { key: 'hasSpecialChar', label: 'Special character' },
                    ].map((req) => (
                      <div key={req.key} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center ${
                          passwordStrength[req.key as keyof typeof passwordStrength] 
                            ? 'bg-green-500' 
                            : 'bg-slate-300 dark:bg-slate-600'
                        }`}>
                          {passwordStrength[req.key as keyof typeof passwordStrength] && (
                            <Check className="w-2 h-2 text-white" />
                          )}
                        </div>
                        <span className={
                          passwordStrength[req.key as keyof typeof passwordStrength] 
                            ? 'text-green-700 dark:text-green-400' 
                            : 'text-slate-500 dark:text-slate-400'
                        }>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm your password'
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
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

        {/* Submit Button */}
        <div>
          <Button 
            type='submit'
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Create Enterprise Account</span>
                <ArrowRight className="w-4 h-4" />
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
          By creating an account, you agree to {APP_NAME}&apos;s{' '}
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
