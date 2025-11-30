// import CartButton from './cart-button'
// import { EllipsisVertical } from 'lucide-react'
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from '@/components/ui/sheet'
// import ThemeSwitcher from './theme-switcher'
// import UserButton from './user-button'

// export default function Menu({ forAdmin = false }: { forAdmin?: boolean }) {
//   return (
//     <div className='flex justify-end'>
//       <nav className='hidden md:flex gap-3  w-full'>
//         <ThemeSwitcher />
//         <UserButton />
//         {forAdmin ? null : <CartButton />}
//       </nav>
//       <nav className='md:hidden'>
//         <Sheet>
//           <SheetTrigger className='align-middle header-button'>
//             <EllipsisVertical className='h-6 w-6' />
//           </SheetTrigger>
//           <SheetContent className='bg-black text-white  flex flex-col items-start  '>
//             <SheetHeader className='w-full'>
//               <div className='flex items-center justify-between '>
//                 <SheetTitle>Site Menu</SheetTitle>
//                 <SheetDescription></SheetDescription>
//               </div>
//             </SheetHeader>
//             <ThemeSwitcher />
//             <UserButton />
//             <CartButton />
//           </SheetContent>
//         </Sheet>
//       </nav>
//     </div>
//   )
// }

import CartButton from './cart-button'
import { EllipsisVertical, User, ShoppingCart, Sun, Moon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ThemeSwitcher from './theme-switcher'
import UserButton from './user-button'

export default function Menu({ forAdmin = false }: { forAdmin?: boolean }) {
  return (
    <div className='flex items-center justify-end'>
      {/* Desktop Menu */}
      <nav className='hidden md:flex items-center gap-2'>
        <ThemeSwitcher />
        <UserButton />
        {forAdmin ? null : <CartButton />}
      </nav>

      {/* Mobile Menu */}
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-gray-700/50 focus:bg-gray-700/50 focus:ring-2 focus:ring-blue-500'>
            <EllipsisVertical className='h-5 w-5' />
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className='bg-gray-900 text-white border-l border-gray-700 w-80'
          >
            <SheetHeader className='border-b border-gray-700 pb-4 mb-4'>
              <SheetTitle className='text-xl font-semibold text-white'>Menu</SheetTitle>
            </SheetHeader>
            
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors'>
                <ThemeSwitcher />
              </div>
              <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors'>
                <UserButton />
              </div>
              {!forAdmin && (
                <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors'>
                  <CartButton />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}
