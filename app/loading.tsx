export default async function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Animated Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 border-4 border-blue-200 rounded-2xl animate-ping"></div>
          </div>
        </div>

        {/* Loading Card */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 p-8 text-center">
          {/* Animated Text */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
              <span className="animate-pulse">Loading</span>
              <span className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              </span>
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Preparing your experience
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Loading assets</span>
              <span>75%</span>
            </div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This will only take a moment
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1 animate-pulse"></div>
            Secure
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            Fast
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            Reliable
          </div>
        </div>
      </div>
    </div>
  )
}
