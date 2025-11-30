// 'use client'

// import { ShoppingCartIcon } from 'lucide-react'
// import Link from 'next/link'
// import useIsMounted from '@/hooks/use-is-mounted'
// import { cn } from '@/lib/utils'
// import useCartStore from '@/hooks/use-cart-store'
// import useCartSidebar from '@/hooks/use-cart-sidebar'

// export default function CartButton({ mobile = false }: { mobile?: boolean }) {
//   const isMounted = useIsMounted()
//   const {
//     cart: { items },
//   } = useCartStore()
//   const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)
//   const isCartSidebarOpen = useCartSidebar()

//   if (mobile) {
//     return (
//       <Link 
//         href='/cart' 
//         className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
//       >
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <ShoppingCartIcon className="h-5 w-5 text-blue-400" />
//             {isMounted && cartItemsCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
//                 {cartItemsCount > 99 ? '99+' : cartItemsCount}
//               </span>
//             )}
//           </div>
//           <div className="flex flex-col text-left">
//             <span className="font-medium">Shopping Cart</span>
//             <span className="text-sm text-gray-300">
//               {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'}
//             </span>
//           </div>
//         </div>
//       </Link>
//     )
//   }

//   return (
//     <Link 
//       href='/cart' 
//       className={cn(
//         "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700/50 hover:text-white relative group",
//         isCartSidebarOpen && "bg-gray-700/50 text-white"
//       )}
//     >
//       <div className="relative">
//         <ShoppingCartIcon className="h-5 w-5" />
//         {isMounted && cartItemsCount > 0 && (
//           <span 
//             className={cn(
//               "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold animate-pulse transition-all",
//               cartItemsCount >= 10 && "text-[10px] px-1",
//               cartItemsCount >= 100 && "text-[8px]"
//             )}
//           >
//             {cartItemsCount > 99 ? '99+' : cartItemsCount}
//           </span>
//         )}
//       </div>
      
//       <div className="hidden sm:flex flex-col text-left leading-tight">
//         <span className="text-xs font-semibold">Cart</span>
//         <span className="text-xs text-gray-300">
//           {isMounted ? `$${items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}` : '$0.00'}
//         </span>
//       </div>

//       {/* Cart sidebar indicator */}
//       {isCartSidebarOpen && (
//         <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-transparent border-b-blue-500"></div>
//       )}
//     </Link>
//   )
// }


// components/shared/header/cart-button.tsx
'use client'

import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import useIsMounted from '@/hooks/use-is-mounted'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart-store' // Use the new hook

export default function CartButton({ mobile = false }: { mobile?: boolean }) {
  const isMounted = useIsMounted()
  const { items, itemsPrice } = useCart() // Use the new cart hook
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)

  if (mobile) {
    return (
      <Link 
        href='/cart' 
        className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCartIcon className="h-5 w-5 text-blue-400" />
            {isMounted && cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-medium">Shopping Cart</span>
            <span className="text-sm text-gray-300">
              {cartItemsCount} {cartItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href="/cart"
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 transition-all duration-200 hover:bg-gray-700/50 hover:text-white relative group"
      )}
    >
      <div className="relative">
        <ShoppingCartIcon className="h-5 w-5" />
        {isMounted && cartItemsCount > 0 && (
          <span 
            className={cn(
              "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold animate-pulse transition-all",
              cartItemsCount >= 10 && "text-[10px] px-1",
              cartItemsCount >= 100 && "text-[8px]"
            )}
          >
            {cartItemsCount > 99 ? '99+' : cartItemsCount}
          </span>
        )}
      </div>
      
      <div className="hidden sm:flex flex-col text-left leading-tight">
        <span className="text-xs font-semibold">Cart</span>
        <span className="text-xs text-gray-300">
          {isMounted ? `$${itemsPrice.toFixed(2)}` : '$0.00'}
        </span>
      </div>
    </Link>
  )
}
