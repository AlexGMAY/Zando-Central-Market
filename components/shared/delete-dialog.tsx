// 'use client'
// import { useState, useTransition } from 'react'

// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog'
// import { Button } from '@/components/ui/button'
// import { useToast } from '@/hooks/use-toast'

// export default function DeleteDialog({
//   id,
//   action,
//   callbackAction,
// }: {
//   id: string
//   action: (id: string) => Promise<{ success: boolean; message: string }>
//   callbackAction?: () => void
// }) {
//   const [open, setOpen] = useState(false)
//   const [isPending, startTransition] = useTransition()
//   const { toast } = useToast()
//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <Button size='sm' variant='outline'>
//           Delete
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>

//           <Button
//             variant='destructive'
//             size='sm'
//             disabled={isPending}
//             onClick={() =>
//               startTransition(async () => {
//                 const res = await action(id)
//                 if (!res.success) {
//                   toast({
//                     variant: 'destructive',
//                     description: res.message,
//                   })
//                 } else {
//                   setOpen(false)
//                   toast({
//                     description: res.message,
//                   })
//                   if (callbackAction) callbackAction()
//                 }
//               })
//             }
//           >
//             {isPending ? 'Deleting...' : 'Delete'}
//           </Button>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }

'use client'
import { useState, useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function DeleteDialog({
  id,
  action,
  callbackAction,
  triggerVariant = 'outline',
  triggerSize = 'sm',
  triggerClassName,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete this item and remove all associated data.",
  confirmText = "Delete",
  cancelText = "Cancel",
}: {
  id: string
  action: (id: string) => Promise<{ success: boolean; message: string }>
  callbackAction?: () => void
  triggerVariant?: 'outline' | 'destructive' | 'ghost'
  triggerSize?: 'sm' | 'default' | 'lg'
  triggerClassName?: string
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant={triggerVariant}
          size={triggerSize}
          className={cn(
            "transition-all duration-200",
            triggerVariant === 'destructive' && "bg-red-600 hover:bg-red-700 text-white",
            triggerClassName
          )}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-0 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl max-w-md">
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-4">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <AlertDialogHeader className="text-center space-y-3">
          <AlertDialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-6">
          <AlertDialogCancel 
            className={cn(
              "w-full sm:w-auto border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-200 hover:scale-105",
              isPending && "opacity-50 cursor-not-allowed"
            )}
            disabled={isPending}
          >
            {cancelText}
          </AlertDialogCancel>
          
          <Button
            variant="destructive"
            size="lg"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const res = await action(id)
                if (!res.success) {
                  toast({
                    variant: 'destructive',
                    title: "Deletion Failed",
                    description: res.message,
                  })
                } else {
                  setOpen(false)
                  toast({
                    title: "Successfully Deleted",
                    description: res.message,
                    className: "border-green-200 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100",
                  })
                  if (callbackAction) callbackAction()
                }
              })
            }
            className={cn(
              "w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold",
              isPending && "opacity-70 cursor-not-allowed"
            )}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                {confirmText}
              </>
            )}
          </Button>
        </AlertDialogFooter>

        {/* Warning Footer Note */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
            ⚠️ This action is irreversible. Please confirm you want to proceed.
          </p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
