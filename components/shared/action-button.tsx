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

// Define the possible return types from the action
interface SuccessResponse {
  success: true;
  message: string;
  [key: string]: unknown; // Allow additional properties
}

interface ErrorResponse {
  error: string;
  success?: false;
  [key: string]: unknown; // Allow additional properties
}

type ActionResponse = SuccessResponse | ErrorResponse | void;

export default function ActionButton({
  caption,
  action,
  className = 'w-full',
  variant = 'default',
  size = 'default',
  disabled = false,
}: {
  caption: string
  action: () => Promise<ActionResponse> // Use defined type instead of any
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
              // Type guard for SuccessResponse
              if ('success' in res && res.success === true && 'message' in res) {
                toast({
                  variant: 'default',
                  description: res.message,
                })
              } 
              // Type guard for ErrorResponse
              else if ('error' in res) {
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
          } catch (err) {
            // Use the error variable
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            toast({
              variant: 'destructive',
              description: errorMessage,
            })
          }
        })
      }
    >
      {isPending ? 'Processing...' : caption}
    </Button>
  )
}
