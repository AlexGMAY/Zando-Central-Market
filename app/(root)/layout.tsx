// // 'use client' 

// import React from 'react'
// import Header from '@/components/shared/header'
// import Footer from '@/components/shared/footer'
// // import { useCartStore } from '@/hooks/use-cart-store'
// import CartSidebar from '@/components/shared/cart-sidebar'
// import useCartStore from '@/hooks/use-cart-store'

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // const loadCartFromServer = useCartStore((state) => state.loadCartFromServer)
//   // const { isCartSidebarOpen, closeCartSidebar } = useCartStore()

//   //  useEffect(() => {
//   //   loadCartFromServer()
//   // }, [loadCartFromServer])
  
//   return (
//     <div className='flex flex-col min-h-screen'>
//       <Header />
//       <main className='flex-1 flex flex-col p-4'>{children}</main>
//       <Footer />
      
//       {/* Add CartSidebar here */}
//       {/* <CartSidebar 
//         isOpen={isCartSidebarOpen} 
//         onClose={closeCartSidebar} 
//       /> */}
//     </div>
//   )
// }

// app/layout.tsx

// app/(root)/layout.tsx
// 'use client' // Make this a client component

import React from 'react'
import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { CartProvider } from '@/components/shared/cart-provider'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
       <CartProvider>
         <main className='flex-1 flex flex-col'>{children}</main>
       </CartProvider>
      
      <Footer />      
    </div>
  )
}
