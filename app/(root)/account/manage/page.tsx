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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  User, 
  Mail, 
  Key, 
  Phone,
  Building,  
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Lock,
  Eye,  
  Download
} from 'lucide-react'

const PAGE_TITLE = 'Login & Security'
export const metadata: Metadata = {
  title: `Security Settings | ${PAGE_TITLE}`,
}

interface SecurityStatus {
  level: 'high' | 'medium' | 'low'
  lastUpdated: string
  twoFactorEnabled: boolean
  verifiedItems: string[]
}

export default async function SecuritySettingsPage() {
  const session = await auth()
  const user = session?.user

  // Mock security status data
  const securityStatus: SecurityStatus = {
    level: 'high',
    lastUpdated: new Date().toISOString(),
    twoFactorEnabled: true,
    verifiedItems: ['email', 'phone']
  }

  const SecurityLevelBadge = ({ level }: { level: SecurityStatus['level'] }) => {
    const config = {
      high: { label: 'High Security', variant: 'default' as const, color: 'text-green-600' },
      medium: { label: 'Medium Security', variant: 'secondary' as const, color: 'text-yellow-600' },
      low: { label: 'Low Security', variant: 'destructive' as const, color: 'text-red-600' }
    }
    
    const { label, variant, color } = config[level]
    
    return (
      <Badge variant={variant} className={`gap-1 ${color}`}>
        <Shield className="w-3 h-3" />
        {label}
      </Badge>
    )
  }

  const SecurityItem = ({ 
    title, 
    description, 
    value, 
    status = 'verified',
    action,
    icon: Icon,
    comingSoon = false 
  }: {
    title: string
    description: string
    value?: string
    status?: 'verified' | 'pending' | 'unverified'
    action?: React.ReactNode
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    comingSoon?: boolean
  }) => (
    <div className="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0 group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {title}
            </h3>
            {status === 'verified' && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            {status === 'pending' && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800">
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </Badge>
            )}
            {comingSoon && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                Coming Soon
              </Badge>
            )}
          </div>
          
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
            {description}
          </p>
          
          {value && (
            <p className="font-mono text-sm text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md inline-block">
              {value}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 ml-4">
        {action}
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <Link 
              href="/account" 
              className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <Building className="w-4 h-4" />
              Account Overview
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 dark:text-white font-medium">
              {PAGE_TITLE}
            </span>
          </nav>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Security Settings
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Manage your account security and login preferences
              </p>
            </div>
            
            <div className="text-right">
              <SecurityLevelBadge level={securityStatus.level} />
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                Last updated {new Date(securityStatus.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Security Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <User className="w-6 h-6 text-blue-600" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Manage your basic account information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <SecurityItem
                  icon={User}
                  title="Full Name"
                  description="Your legal name as it appears on official documents"
                  value={user?.name || 'Not provided'}
                  status="verified"
                  action={
                    <Link href="/account/manage/name">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Edit
                      </Button>
                    </Link>
                  }
                />
                
                <SecurityItem
                  icon={Mail}
                  title="Email Address"
                  description="Primary email for account notifications and login"
                  value={user?.email || 'Not provided'}
                  status="verified"
                  action={
                    <Button variant="outline" size="sm" className="rounded-full" disabled>
                      Edit
                    </Button>
                  }
                  comingSoon
                />
                
                <SecurityItem
                  icon={Phone}
                  title="Phone Number"
                  description="Used for two-factor authentication and security alerts"
                  value="+1 (555) 123-4567"
                  status="verified"
                  action={
                    <Button variant="outline" size="sm" className="rounded-full">
                      Verify
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            {/* Security & Authentication Card */}
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Shield className="w-6 h-6 text-green-600" />
                  Security & Authentication
                </CardTitle>
                <CardDescription>
                  Enhanced security features to protect your account
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <SecurityItem
                  icon={Key}
                  title="Password"
                  description="Last changed 3 months ago • Strong password detected"
                  value="••••••••••••••••"
                  status="verified"
                  action={
                    <Button variant="outline" size="sm" className="rounded-full" disabled>
                      Change
                    </Button>
                  }
                  comingSoon
                />
                
                <SecurityItem
                  icon={Lock}
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                  value="Authenticator App • SMS Backup"
                  status={securityStatus.twoFactorEnabled ? "verified" : "unverified"}
                  action={
                    securityStatus.twoFactorEnabled ? (
                      <Button variant="outline" size="sm" className="rounded-full">
                        Manage
                      </Button>
                    ) : (
                      <Button size="sm" className="rounded-full bg-green-600 hover:bg-green-700">
                        Enable
                      </Button>
                    )
                  }
                />
                
                <SecurityItem
                  icon={Eye}
                  title="Login Activity"
                  description="Review recent sign-ins and active sessions"
                  value="3 active sessions • Last login: 2 hours ago"
                  status="verified"
                  action={
                    <Button variant="outline" size="sm" className="rounded-full">
                      Review
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Security Overview & Quick Actions */}
          <div className="space-y-6">
            {/* Security Overview Card */}
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Security Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Security Level</span>
                    <SecurityLevelBadge level={securityStatus.level} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">2FA Status</span>
                    <Badge variant={securityStatus.twoFactorEnabled ? "default" : "secondary"}>
                      {securityStatus.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Verified Items</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {securityStatus.verifiedItems.length}/5
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-between" disabled>
                      <span>Export Security Data</span>
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>Privacy Settings</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-between">
                      <span>Security Alerts</span>
                      <AlertCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Tips Card */}
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-blue-800 dark:text-blue-300">
                    Enable two-factor authentication for enhanced security
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Key className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-green-800 dark:text-green-300">
                    Use a unique, strong password for your account
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <Eye className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-800 dark:text-yellow-300">
                    Regularly review your login activity and active sessions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
