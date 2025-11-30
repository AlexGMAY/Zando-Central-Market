// components/providers/cart-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useCartStore } from '@/hooks/use-cart-store'

const CartContext = createContext<ReturnType<typeof useCartStore> | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false)
  const store = useCartStore()

  // Wait for store to hydrate from localStorage
  useEffect(() => {
    const unsub = useCartStore.persist.onFinishHydration(() => {
      setIsHydrated(true)
    })
    
    setIsHydrated(true) // Fallback in case hydration is instant
    
    return unsub
  }, [])

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <CartContext.Provider value={store}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }
  return context
}