// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useSession } from 'next-auth/react'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { useRouter } from 'next/navigation'

// import { Button } from '@/components/ui/button'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { useToast } from '@/hooks/use-toast'
// import { updateUserName } from '@/lib/actions/user.actions'
// import { UserNameSchema } from '@/lib/validator'

// export const ProfileForm = () => {
//   const router = useRouter()
//   const { data: session, update } = useSession()
//   const form = useForm<z.infer<typeof UserNameSchema>>({
//     resolver: zodResolver(UserNameSchema),
//     defaultValues: {
//       name: session?.user?.name ?? '',
//     },
//   })
//   const { toast } = useToast()

//   async function onSubmit(values: z.infer<typeof UserNameSchema>) {
//     const res = await updateUserName(values)
//     if (!res.success)
//       return toast({
//         variant: 'destructive',
//         description: res.message,
//       })

//     const { data, message } = res
//     const newSession = {
//       ...session,
//       user: {
//         ...session?.user,
//         name: data.name,
//       },
//     }
//     await update(newSession)
//     toast({
//       description: message,
//     })
//     router.push('/account/manage')
//   }
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className='  flex flex-col gap-5'
//       >
//         <div className='flex flex-col gap-5'>
//           <FormField
//             control={form.control}
//             name='name'
//             render={({ field }) => (
//               <FormItem className='w-full'>
//                 <FormLabel className='font-bold'>New name</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder='Name'
//                     {...field}
//                     className='input-field'
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>

//         <Button
//           type='submit'
//           size='lg'
//           disabled={form.formState.isSubmitting}
//           className='button col-span-2 w-full'
//         >
//           {form.formState.isSubmitting ? 'Submitting...' : 'Save Changes'}
//         </Button>
//       </form>
//     </Form>
//   )
// }

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { updateUserName } from '@/lib/actions/user.actions'
import { UserNameSchema } from '@/lib/validator'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  Shield,
  ArrowRight,  
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

export const ProfileForm = () => {
  const router = useRouter()
  const { data: session, update } = useSession()
  const { toast } = useToast()
  const [showCharacterCount, setShowCharacterCount] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const form = useForm<z.infer<typeof UserNameSchema>>({
    resolver: zodResolver(UserNameSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
    },
    mode: 'onChange',
  })

  // Watch name changes for character count
  const watchedName = form.watch('name')
  const characterCount = watchedName?.length || 0
  const maxCharacters = 50

  // Check if name has actually changed
  const hasChanges = watchedName !== session?.user?.name

  useEffect(() => {
    if (characterCount > 0) {
      setShowCharacterCount(true)
    } else {
      setShowCharacterCount(false)
    }
  }, [characterCount])

  async function onSubmit(values: z.infer<typeof UserNameSchema>) {
    if (!hasChanges) {
      toast({
        variant: 'destructive',
        description: 'No changes detected. Please modify the name before saving.',
      })
      return
    }

    setIsVerifying(true)
    
    try {
      const res = await updateUserName(values)
      
      if (!res.success) {
        toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: res.message,
        })
        return
      }

      const { data, message } = res
      
      // Update session
      const newSession = {
        ...session,
        user: {
          ...session?.user,
          name: data.name,
        },
      }
      await update(newSession)
      
      toast({
        title: 'Successfully Updated',
        description: message,
        className: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      })

      // Redirect after success
      setTimeout(() => {
        router.push('/account/manage')
      }, 1500)
      
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: 'An unexpected error occurred. Please try again.',
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const getCharacterCountColor = () => {
    if (characterCount === 0) return 'text-slate-400'
    if (characterCount < 3) return 'text-red-500'
    if (characterCount > maxCharacters) return 'text-red-500'
    if (characterCount > maxCharacters * 0.8) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getValidationState = () => {
    const errors = form.formState.errors
    const isValid = form.formState.isValid && hasChanges
    
    if (errors.name) return { state: 'error', message: errors.name.message }
    if (!hasChanges) return { state: 'default', message: 'Make changes to enable save' }
    if (isValid) return { state: 'success', message: 'Ready to save changes' }
    return { state: 'default', message: 'Enter a valid name' }
  }

  const validationState = getValidationState()

  return (
    <div className="space-y-6">
      {/* Validation Status Card */}
      <Card className={`border-l-4 ${
        validationState.state === 'error' 
          ? 'border-l-red-500 bg-red-50 dark:bg-red-900/10' 
          : validationState.state === 'success'
          ? 'border-l-green-500 bg-green-50 dark:bg-green-900/10'
          : 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {validationState.state === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            ) : validationState.state === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            ) : (
              <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
            )}
            <div>
              <p className={`text-sm font-medium ${
                validationState.state === 'error' 
                  ? 'text-red-800 dark:text-red-300'
                  : validationState.state === 'success'
                  ? 'text-green-800 dark:text-green-300'
                  : 'text-blue-800 dark:text-blue-300'
              }`}>
                {validationState.message}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-blue-600" />
                New Name Information
              </CardTitle>
              <CardDescription>
                Enter your full legal name as it should appear on official documents and communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Input Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                      Full Legal Name
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300">
                        Required
                      </Badge>
                    </FormLabel>
                    <FormDescription className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                      This name will be used across all platforms and official communications
                    </FormDescription>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter your full legal name"
                          {...field}
                          className={`input-field pr-24 transition-all duration-200 ${
                            validationState.state === 'error' 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                              : validationState.state === 'success'
                              ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                              : 'focus:border-blue-500 focus:ring-blue-500'
                          }`}
                          disabled={form.formState.isSubmitting || isVerifying}
                        />
                        
                        {/* Character Count */}
                        {showCharacterCount && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className={`text-xs font-medium ${getCharacterCountColor()}`}>
                              {characterCount}/{maxCharacters}
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="flex items-center gap-2 text-sm" />
                  </FormItem>
                )}
              />

              {/* Progress Bar for Character Count */}
              {showCharacterCount && (
                <div className="space-y-2">
                  <Progress 
                    value={(characterCount / maxCharacters) * 100} 
                    className={`h-1 ${
                      characterCount > maxCharacters 
                        ? 'bg-red-500' 
                        : characterCount > maxCharacters * 0.8 
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {characterCount > maxCharacters 
                      ? 'Name is too long. Please shorten it.' 
                      : characterCount > maxCharacters * 0.8 
                      ? 'Approaching character limit'
                      : 'Good length'
                    }
                  </p>
                </div>
              )}

              <Separator />

              {/* Security Notice */}
              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <Shield className="w-4 h-4 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Security Verification
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    This change will be logged for security purposes. You may be required to verify your identity for significant name changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/account/manage')}
              disabled={form.formState.isSubmitting || isVerifying}
              className="rounded-full"
            >
              Cancel
            </Button>
            
            <div className="flex items-center gap-3">
              {hasChanges && (
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  Unsaved Changes
                </Badge>
              )}
              
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting || isVerifying || !hasChanges || !form.formState.isValid}
                className="rounded-full bg-blue-600 hover:bg-blue-700 px-8 font-semibold min-w-[140px]"
              >
                {isVerifying ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : form.formState.isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    Save Changes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
