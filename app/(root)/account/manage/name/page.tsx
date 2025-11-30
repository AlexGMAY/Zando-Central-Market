// import { Metadata } from 'next'
// import { SessionProvider } from 'next-auth/react'

// import { auth } from '@/auth'

// import { ProfileForm } from './profile-form'
// import Link from 'next/link'
// import { Card, CardContent } from '@/components/ui/card'
// import { APP_NAME } from '@/lib/constants'

// const PAGE_TITLE = 'Change Your Name'
// export const metadata: Metadata = {
//   title: PAGE_TITLE,
// }

// export default async function ProfilePage() {
//   const session = await auth()
//   return (
//     <div className='mb-24'>
//       <SessionProvider session={session}>
//         <div className='flex gap-2 '>
//           <Link href='/account'>Your Account</Link>
//           <span>›</span>
//           <Link href='/account/manage'>Login & Security</Link>
//           <span>›</span>
//           <span>{PAGE_TITLE}</span>
//         </div>
//         <h1 className='h1-bold py-4'>{PAGE_TITLE}</h1>
//         <Card className='max-w-2xl'>
//           <CardContent className='p-4 flex justify-between flex-wrap'>
//             <p className='text-sm py-2'>
//               If you want to change the name associated with your {APP_NAME}
//               &apos;s account, you may do so below. Be sure to click the Save
//               Changes button when you are done.
//             </p>
//             <ProfileForm />
//           </CardContent>
//         </Card>
//       </SessionProvider>
//     </div>
//   )
// }

import { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft,
  User,
  Shield,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock
} from 'lucide-react'
import { ProfileForm } from './profile-form'
import { APP_NAME } from '@/lib/constants'
import { SessionProvider } from 'next-auth/react'


const PAGE_TITLE = 'Change Your Name'
export const metadata: Metadata = {
  title: `${PAGE_TITLE} | Account Settings`,
}

interface NameChangeHistory {
  id: string
  previousName: string
  newName: string
  changedAt: string
  status: 'completed' | 'pending'
}

const ProfilePage = async () => {
  const session = await auth()
  const user = session?.user

  // Mock name change history
  const nameChangeHistory: NameChangeHistory[] = [
    {
      id: '1',
      previousName: 'John Doe',
      newName: user?.name || 'Current Name',
      changedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      status: 'completed'
    }
  ]

  const StatusBadge = ({ status }: { status: NameChangeHistory['status'] }) => (
    <Badge 
      variant={status === 'completed' ? 'default' : 'secondary'}
      className={status === 'completed' 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
      }
    >
      {status === 'completed' ? (
        <CheckCircle2 className="w-3 h-3 mr-1" />
      ) : (
        <Clock className="w-3 h-3 mr-1" />
      )}
      {status === 'completed' ? 'Completed' : 'Pending Review'}
    </Badge>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 py-8">
      <SessionProvider session={session}>
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <Link 
                href="/account" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                Account Overview
              </Link>
              <span>›</span>
              <Link 
                href="/account/manage" 
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Login & Security
              </Link>
              <span>›</span>
              <span className="text-slate-900 dark:text-white font-medium">
                {PAGE_TITLE}
              </span>
            </nav>

            {/* Back Button */}
            <div className="mb-6">
              <Link href="/account/manage">
                <Button variant="ghost" className="pl-0 hover:pl-2 transition-all duration-200">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Security Settings
                </Button>
              </Link>
            </div>

            {/* Page Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                  <User className="w-8 h-8 text-blue-600" />
                  {PAGE_TITLE}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                  Update your legal name across all {APP_NAME} services and platforms
                </p>
              </div>
              
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                <Shield className="w-3 h-3 mr-1" />
                Secure Update
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Name Change Form Card */}
              <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Update Personal Information
                  </CardTitle>
                  <CardDescription>
                    Your name will be updated across all {APP_NAME} services and communication
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Name Display */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
                      Current Name
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                      {user?.name || 'Not set'}
                    </p>
                  </div>

                  {/* Important Notice */}
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 text-sm">
                          Important Information
                        </h4>
                        <ul className="text-yellow-700 dark:text-yellow-400 text-sm space-y-1">
                          <li>• Name changes may require verification for security purposes</li>
                          <li>• Updates may take up to 24 hours to propagate across all systems</li>
                          <li>• Some services may require re-authentication after name change</li>
                          <li>• Legal name changes may require document verification</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <ProfileForm />
                  </div>
                </CardContent>
              </Card>

              {/* Change History Card */}
              <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">Name Change History</CardTitle>
                  <CardDescription>
                    Track your previous name changes and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {nameChangeHistory.length > 0 ? (
                    <div className="space-y-4">
                      {nameChangeHistory.map((change) => (
                        <div 
                          key={change.id}
                          className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-medium text-slate-900 dark:text-white text-sm">
                                {change.previousName}
                              </span>
                              <span className="text-slate-400">→</span>
                              <span className="font-semibold text-slate-900 dark:text-white text-sm">
                                {change.newName}
                              </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-500 text-xs">
                              Changed on {new Date(change.changedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <StatusBadge status={change.status} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        No name change history found
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Support Card */}
              <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">
                        Verification Required?
                      </h4>
                      <p className="text-blue-700 dark:text-blue-400 text-xs">
                        Legal name changes may require document submission for verification.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-300 text-sm mb-1">
                        Update Timeline
                      </h4>
                      <p className="text-green-700 dark:text-green-400 text-xs">
                        Changes typically reflect across systems within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                    <Button variant="outline" className="w-full justify-start text-sm" asChild>
                      <Link href="/help/name-changes">
                        <FileText className="w-4 h-4 mr-2" />
                        Name Change Guide
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-sm" asChild>
                      <Link href="/support">
                        <Shield className="w-4 h-4 mr-2" />
                        Contact Support
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Update Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Last Updated</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {nameChangeHistory[0] 
                        ? new Date(nameChangeHistory[0].changedAt).toLocaleDateString()
                        : 'Never'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Total Changes</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {nameChangeHistory.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Status</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SessionProvider>
    </div>
  )
}

export default ProfilePage