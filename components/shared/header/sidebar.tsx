// import * as React from 'react'
// import Link from 'next/link'
// import { X, ChevronRight, UserCircle, MenuIcon } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { SignOut } from '@/lib/actions/user.actions'
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer'
// import { auth } from '@/auth'

// export default async function Sidebar({
//   categories,
// }: {
//   categories: string[]
// }) {
//   const session = await auth()

//   return (
//     <Drawer direction='left'>
//       <DrawerTrigger className='header-button flex items-center !p-2  '>
//         <MenuIcon className='h-5 w-5 mr-1' />
//         All
//       </DrawerTrigger>
//       <DrawerContent className='w-[350px] mt-0 top-0'>
//         <div className='flex flex-col h-full'>
//           {/* User Sign In Section */}
//           <div className='dark bg-gray-800 text-foreground flex items-center justify-between  '>
//             <DrawerHeader>
//               <DrawerTitle className='flex items-center'>
//                 <UserCircle className='h-6 w-6 mr-2' />
//                 {session ? (
//                   <DrawerClose asChild>
//                     <Link href='/account'>
//                       <span className='text-lg font-semibold'>
//                         Hello, {session.user.name}
//                       </span>
//                     </Link>
//                   </DrawerClose>
//                 ) : (
//                   <DrawerClose asChild>
//                     <Link href='/sign-in'>
//                       <span className='text-lg font-semibold'>
//                         Hello, sign in
//                       </span>
//                     </Link>
//                   </DrawerClose>
//                 )}
//               </DrawerTitle>
//               <DrawerDescription></DrawerDescription>
//             </DrawerHeader>
//             <DrawerClose asChild>
//               <Button variant='ghost' size='icon' className='mr-2'>
//                 <X className='h-5 w-5' />
//                 <span className='sr-only'>Close</span>
//               </Button>
//             </DrawerClose>
//           </div>

//           {/* Shop By Category */}
//           <div className='flex-1 overflow-y-auto'>
//             <div className='p-4 border-b'>
//               <h2 className='text-lg font-semibold'>Shop By Department</h2>
//             </div>
//             <nav className='flex flex-col'>
//               {categories.map((category) => (
//                 <DrawerClose asChild key={category}>
//                   <Link
//                     href={`/search?category=${category}`}
//                     className={`flex items-center justify-between item-button`}
//                   >
//                     <span>{category}</span>
//                     <ChevronRight className='h-4 w-4' />
//                   </Link>
//                 </DrawerClose>
//               ))}
//             </nav>
//           </div>

//           {/* Setting and Help */}
//           <div className='border-t flex flex-col '>
//             <div className='p-4'>
//               <h2 className='text-lg font-semibold'>Help & Settings</h2>
//             </div>
//             <DrawerClose asChild>
//               <Link href='/account' className='item-button'>
//                 Your account
//               </Link>
//             </DrawerClose>{' '}
//             <DrawerClose asChild>
//               <Link href='/page/customer-service' className='item-button'>
//                 Customer Service
//               </Link>
//             </DrawerClose>
//             {session ? (
//               <form action={SignOut} className='w-full'>
//                 <Button
//                   className='w-full justify-start item-button text-base'
//                   variant='ghost'
//                 >
//                   Sign out
//                 </Button>
//               </form>
//             ) : (
//               <Link href='/sign-in' className='item-button'>
//                 Sign in
//               </Link>
//             )}
//           </div>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   )
// }

import * as React from 'react'
import Link from 'next/link'
import { X, ChevronRight, UserCircle, MenuIcon, HelpCircle, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { auth } from '@/auth'

export default async function Sidebar({
  categories,
}: {
  categories: string[]
}) {
  const session = await auth()

  return (
    <Drawer direction='left'>
      <DrawerTrigger className='flex items-center px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50 text-sm font-medium text-gray-200'>
        <MenuIcon className='h-5 w-5 mr-2' />
        Menu
      </DrawerTrigger>
      <DrawerContent className='w-[380px] mt-0 top-0 h-screen bg-gray-900 border-r border-gray-700'>
        <div className='flex flex-col h-full'>
          
          {/* User Section */}
          <div className='bg-gradient-to-r from-gray-800 to-gray-700 p-6'>
            <DrawerHeader className='p-0'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <UserCircle className='h-8 w-8 text-blue-400' />
                  <div>
                    <DrawerTitle className='text-white text-lg font-semibold'>
                      {session ? (
                        <DrawerClose asChild>
                          <Link href='/account' className='hover:text-blue-300 transition-colors'>
                            Hello, {session.user.name}
                          </Link>
                        </DrawerClose>
                      ) : (
                        <DrawerClose asChild>
                          <Link href='/sign-in' className='hover:text-blue-300 transition-colors'>
                            Hello, sign in
                          </Link>
                        </DrawerClose>
                      )}
                    </DrawerTitle>
                    <p className='text-gray-300 text-sm mt-1'>
                      {session ? 'Manage your account' : 'Access your account'}
                    </p>
                  </div>
                </div>
                <DrawerClose asChild>
                  <Button variant='ghost' size='icon' className='text-gray-300 hover:text-white hover:bg-gray-600/50'>
                    <X className='h-5 w-5' />
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
          </div>

          {/* Categories Section */}
          <div className='flex-1 overflow-y-auto py-4'>
            <div className='px-6 pb-3 mb-3 border-b border-gray-700'>
              <h2 className='text-lg font-semibold text-white'>Shop By Category</h2>
            </div>
            <nav className='flex flex-col'>
              {categories.map((category) => (
                <DrawerClose asChild key={category}>
                  <Link
                    href={`/search?category=${category}`}
                    className='flex items-center justify-between px-6 py-3 text-gray-200 transition-all duration-200 hover:bg-gray-800/50 hover:text-white hover:pl-7 group'
                  >
                    <span className='font-medium'>{category}</span>
                    <ChevronRight className='h-4 w-4 text-gray-400 group-hover:text-white transition-colors' />
                  </Link>
                </DrawerClose>
              ))}
            </nav>
          </div>

          {/* Help & Settings Section */}
          <div className='border-t border-gray-700 bg-gray-800/30'>
            <div className='p-6 pb-3'>
              <h2 className='text-lg font-semibold text-white flex items-center gap-2'>
                <Settings className='h-5 w-5' />
                Help & Settings
              </h2>
            </div>
            <div className='flex flex-col pb-6'>
              <DrawerClose asChild>
                <Link 
                  href='/account' 
                  className='flex items-center gap-3 px-6 py-3 text-gray-200 transition-all duration-200 hover:bg-gray-800/50 hover:text-white'
                >
                  <UserCircle className='h-5 w-5' />
                  Your Account
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link 
                  href='/page/customer-service' 
                  className='flex items-center gap-3 px-6 py-3 text-gray-200 transition-all duration-200 hover:bg-gray-800/50 hover:text-white'
                >
                  <HelpCircle className='h-5 w-5' />
                  Customer Service
                </Link>
              </DrawerClose>
              {session ? (
                <form action={SignOut} className='w-full'>
                  <Button
                    className='w-full justify-start items-center gap-3 px-6 py-3 h-auto text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all duration-200'
                    variant='ghost'
                  >
                    <UserCircle className='h-5 w-5' />
                    Sign Out
                  </Button>
                </form>
              ) : (
                <DrawerClose asChild>
                  <Link 
                    href='/sign-in' 
                    className='flex items-center gap-3 px-6 py-3 text-gray-200 transition-all duration-200 hover:bg-gray-800/50 hover:text-white'
                  >
                    <UserCircle className='h-5 w-5' />
                    Sign In
                  </Link>
                </DrawerClose>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
