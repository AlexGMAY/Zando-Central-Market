'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Home, Search, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react'


export default function NotFound() {
  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleGoBack = () => {
    window.history.back()
  }

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center p-4'>
      <div className='max-w-md w-full animate-fade-in'>
        {/* Main Card */}
        <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8 text-center relative overflow-hidden group'>
          {/* Background Pattern */}
          <div className='absolute inset-0 opacity-5'>
            <div className='absolute -top-24 -right-24 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse-slow'></div>
            <div className='absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse-slow delay-1000'></div>
          </div>

          {/* Animated Icon */}
          <div className='relative mb-6'>
            <div className='relative inline-flex animate-bounce-in'>
              <div className='w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300'>
                <div className='w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-inner animate-pulse'>
                  <AlertCircle className='h-10 w-10 text-white' />
                </div>
              </div>
              
              {/* Floating Search Icon */}
              <div className='absolute -top-2 -right-2 animate-float'>
                <div className='w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg'>
                  <Search className='h-3 w-3 text-yellow-800' />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className='animate-slide-up'>
            {/* Error Code */}
            <div className='mb-4'>
              <h1 className='text-7xl font-black bg-gradient-to-br from-red-500 to-purple-600 bg-clip-text text-transparent animate-gradient'>
                404
              </h1>
            </div>

            {/* Title */}
            <h2 className='text-2xl font-bold text-slate-800 dark:text-white mb-3'>
              Page Not Found
            </h2>

            {/* Description */}
            <p className='text-slate-600 dark:text-slate-300 mb-8 leading-relaxed'>
              Oops! The page you&apos;re looking for seems to have wandered off into the digital void. 
              Let&apos;s get you back on track.
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 justify-center animate-slide-up-delayed'>
              <Button
                onClick={handleGoHome}
                className='flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-1 group/btn'
                size='lg'
              >
                <Home className='h-4 w-4 group-hover/btn:scale-110 transition-transform' />
                Back to Home
              </Button>
              
              <Button
                onClick={handleGoBack}
                variant='outline'
                className='flex items-center gap-2 border-2 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 flex-1 group/btn'
                size='lg'
              >
                <ArrowLeft className='h-4 w-4 group-hover/btn:-translate-x-1 transition-transform' />
                Go Back
              </Button>
            </div>

            {/* Secondary Action */}
            <div className='mt-6 animate-fade-in-delayed'>
              <Button
                onClick={handleRetry}
                variant='ghost'
                size='sm'
                className='text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors group/retry'
              >
                <RefreshCw className='h-4 w-4 mr-2 group-hover/retry:rotate-180 transition-transform' />
                Try Again
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className='absolute -bottom-16 -right-16 w-32 h-32 border-2 border-dashed border-red-200 dark:border-red-800 rounded-full opacity-50 animate-spin-slow' />
          
          <div className='absolute -top-12 -left-12 w-24 h-24 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-full opacity-50 animate-spin-slow-reverse' />
        </div>        
      </div>      
    </div>
  )
}