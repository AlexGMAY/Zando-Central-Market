import { APP_COPYRIGHT, APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Shield, Lock } from 'lucide-react'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-950/20 dark:to-purple-950/10">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))] dark:bg-grid-slate-800/50 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow dark:bg-blue-500/10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow dark:bg-purple-500/10" />
      
      <div className="relative flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-center lg:justify-between items-center p-6 lg:p-8">
          <Link 
            href="/" 
            className="group flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="relative">
              <Image
                src='/icons/logo.svg'
                alt={`${APP_NAME} logo`}
                width={48}
                height={48}
                priority
                className="drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
              <div className="absolute -inset-1 bg-blue-500/10 rounded-lg blur-sm group-hover:bg-blue-500/20 transition-colors" />
            </div>            
          </Link>

          {/* Security Badge - Desktop */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50">
            <Shield className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Enterprise Secure
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-2xl">
            <div className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
              {/* Security Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-800 dark:to-slate-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">
                      Secure Authentication
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">
                      Encrypted
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Form Container */}
              <div className="p-2 lg:p-8">
                {children}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative bg-gradient-to-t from-slate-900/95 to-slate-800/95 dark:from-slate-950/95 dark:to-slate-900/95 backdrop-blur-sm border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            {/* Bottom Bar */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-sm text-center lg:text-left">
                  {APP_COPYRIGHT}
                </p>
                
                {/* Trust Seals */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Lock className="w-3 h-3" />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Shield className="w-3 h-3" />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
