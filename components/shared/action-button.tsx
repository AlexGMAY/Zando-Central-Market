// 'use client'
// import { useTransition } from 'react'

// import { Button } from '@/components/ui/button'
// import { useToast } from '@/hooks/use-toast'
// import { cn } from '@/lib/utils'

// export default function ActionButton({
//   caption,
//   action,
//   className = 'w-full',
//   variant = 'default',
//   size = 'default',
//   disabled = false,
// }: {
//   caption: string
//   action: () => Promise<{ success: boolean; message: string }>
//   className?: string
//   variant?: 'default' | 'outline' | 'destructive'
//   size?: 'default' | 'sm' | 'lg'
//   disabled?: boolean
// }) {
//   const [isPending, startTransition] = useTransition()
//   const { toast } = useToast()
//   return (
//     <Button
//       type='button'
//       className={cn('rounded-full', className)}
//       variant={variant}
//       size={size}
//       disabled={isPending}
//       onClick={() =>
//         startTransition(async () => {
//           const res = await action()
//           toast({
//             variant: res.success ? 'default' : 'destructive',
//             description: res.message,
//           })
//         })
//       }
//     >
//       {isPending ? 'processing...' : caption}
//     </Button>
//   )
// }

'use client'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function ActionButton({
  caption,
  action,
  className = 'w-full',
  variant = 'default',
  size = 'default',
  disabled = false,
}: {
  caption: string
  action: () => Promise<any> // More flexible return type
  className?: string
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
}) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  
  return (
    <Button
      type='button'
      className={cn('rounded-full', className)}
      variant={variant}
      size={size}
      disabled={isPending || disabled}
      onClick={() =>
        startTransition(async () => {
          try {
            const res = await action()
            // Handle different response formats
            if (res && typeof res === 'object') {
              if ('success' in res && 'message' in res) {
                toast({
                  variant: res.success ? 'default' : 'destructive',
                  description: res.message,
                })
              } else if ('error' in res) {
                toast({
                  variant: 'destructive',
                  description: res.error || 'An error occurred',
                })
              }
            } else {
              // Default success message if no specific response
              toast({
                variant: 'default',
                description: 'Action completed successfully',
              })
            }
          } catch (error) {
            toast({
              variant: 'destructive',
              description: 'An unexpected error occurred',
            })
          }
        })
      }
    >
      {isPending ? 'Processing...' : caption}
    </Button>
  )
}

