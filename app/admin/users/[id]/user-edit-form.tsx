'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { 
  User, 
  Mail, 
  Shield, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2,
  Save,
  UserCog
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { updateUser } from '@/lib/actions/user.actions'
import { USER_ROLES } from '@/lib/constants'
import { IUser } from '@/lib/db/models/user.model'
import { UserUpdateSchema } from '@/lib/validator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const UserEditForm = ({ user }: { user: IUser }) => {
  const router = useRouter()

  type UserUpdateFormValues = z.infer<typeof UserUpdateSchema>

  const form = useForm<UserUpdateFormValues>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: user as unknown as UserUpdateFormValues,
    mode: 'onChange',
  })

  const { toast } = useToast()
  
  async function onSubmit(values: z.infer<typeof UserUpdateSchema>) {
    try {
      const res = await updateUser({
        ...values,
        _id: user._id.toString(),
      })
      
      if (!res.success) {
        return toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: res.message,
        })
      }

      toast({
        title: 'Successfully Updated',
        description: res.message,
        className: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
      })
      
      router.push(`/admin/users`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: error.message,
      })
    }
  }

  const hasChanges = form.formState.isDirty
  const isSubmitting = form.formState.isSubmitting

  return (
    <div className="space-y-6 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <User className="w-4 h-4 text-slate-600" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter user name" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormDescription>
                        User&apos;s full legal name as it should appear in the system
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <Mail className="w-4 h-4 text-slate-600" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter user email" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormDescription>
                        Primary email for account notifications and login
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Role & Permissions Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-purple-600" />
                Role & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 font-semibold">
                      <UserCog className="w-4 h-4 text-slate-600" />
                      Account Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value?.toString() || ''}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {USER_ROLES.map((role) => (
                          <SelectItem key={role} value={role} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              role === 'Admin' ? 'bg-purple-500' : 'bg-blue-500'
                            }`} />
                            {role}
                            {role === 'Admin' && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Full Access
                              </Badge>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Admin roles have full system access, User roles have limited permissions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Permissions Summary */}
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3">
                  Role Permissions
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>View products</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Place orders</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {form.watch('role') === 'Admin' ? (
                      <>
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Manage users</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>System settings</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-slate-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="line-through">Manage users</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="line-through">System settings</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/admin/users`)}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Users
            </Button>
            
            <div className="flex items-center gap-3">
              {hasChanges && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  Unsaved Changes
                </Badge>
              )}
              
              <Button
                type="submit"
                disabled={isSubmitting || !hasChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 min-w-[140px] flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update User
                    <ArrowRight className="w-4 h-4" />
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

export default UserEditForm
