import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Cart, OrderItem, ShippingAddress } from '@/types'
import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  paymentMethod: undefined,
  shippingAddress: undefined,
  deliveryDateIndex: undefined,  
}

interface CartState {
  cart: Cart
  addItem: (item: OrderItem, quantity: number) => Promise<string>
  updateItem: (item: OrderItem, quantity: number) => Promise<void>
  removeItem: (item: OrderItem) => Promise<void>
  clearCart: () => void
  setShippingAddress: (shippingAddress: ShippingAddress) => Promise<void>
  setPaymentMethod: (paymentMethod: string) => void
  setDeliveryDateIndex: (index: number) => Promise<void>
}

// Create a separate store with computed properties
export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cart: initialState,

      addItem: async (item: OrderItem, quantity: number) => {
        const { cart } = get()
        const existItem = cart.items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )

        // Check stock availability
        if (existItem) {
          if (existItem.countInStock < quantity + existItem.quantity) {
            throw new Error('Not enough items in stock')
          }
        } else {
          if (item.countInStock < quantity) {
            throw new Error('Not enough items in stock')
          }
        }

        const updatedCartItems = existItem
          ? cart.items.map((x) =>
              x.product === item.product &&
              x.color === item.color &&
              x.size === item.size
                ? { ...existItem, quantity: existItem.quantity + quantity }
                : x
            )
          : [...cart.items, { 
              ...item, 
              quantity,
              clientId: `${item.product}-${item.color || 'no-color'}-${item.size || 'no-size'}-${Date.now()}`
            }]

        const cartUpdate = await calcDeliveryDateAndPrice({
          items: updatedCartItems,
          shippingAddress: cart.shippingAddress,
        })

        const updatedCart = {
          ...cart,
          items: updatedCartItems,
          ...cartUpdate,
        }

        set({ cart: updatedCart })
        
        const foundItem = updatedCart.items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )
        
        if (!foundItem) {
          throw new Error('Item not found in cart')
        }
        
        return foundItem.clientId!
      },

      updateItem: async (item: OrderItem, quantity: number) => {
        const { cart } = get()
        const exist = cart.items.find(
          (x) =>
            x.product === item.product &&
            x.color === item.color &&
            x.size === item.size
        )
        
        if (!exist) return
        
        const updatedCartItems = cart.items.map((x) =>
          x.product === item.product &&
          x.color === item.color &&
          x.size === item.size
            ? { ...exist, quantity }
            : x
        )
        
        const cartUpdate = await calcDeliveryDateAndPrice({
          items: updatedCartItems,
          shippingAddress: cart.shippingAddress,
        })
        
        const updatedCart = {
          ...cart,
          items: updatedCartItems,
          ...cartUpdate,
        }
        
        set({ cart: updatedCart })
      },

      removeItem: async (item: OrderItem) => {
        const { cart } = get()
        const updatedCartItems = cart.items.filter(
          (x) =>
            x.product !== item.product ||
            x.color !== item.color ||
            x.size !== item.size
        )
        
        const cartUpdate = await calcDeliveryDateAndPrice({
          items: updatedCartItems,
          shippingAddress: cart.shippingAddress,
        })
        
        const updatedCart = {
          ...cart,
          items: updatedCartItems,
          ...cartUpdate,
        }
        
        set({ cart: updatedCart })
      },

      setShippingAddress: async (shippingAddress: ShippingAddress) => {
        const { cart } = get()
        const cartUpdate = await calcDeliveryDateAndPrice({
          items: cart.items,
          shippingAddress,
        })
        
        const updatedCart = {
          ...cart,
          shippingAddress,
          ...cartUpdate,
        }
        
        set({ cart: updatedCart })
      },

      setPaymentMethod: (paymentMethod: string) => {
        const { cart } = get()
        set({
          cart: {
            ...cart,
            paymentMethod,
          },
        })
      },

      setDeliveryDateIndex: async (index: number) => {
        const { cart } = get()
        const cartUpdate = await calcDeliveryDateAndPrice({
          items: cart.items,
          shippingAddress: cart.shippingAddress,
          deliveryDateIndex: index,
        })
        
        const updatedCart = {
          ...cart,
          ...cartUpdate,
        }
        
        set({ cart: updatedCart })
      },

      clearCart: () => {
        set({
          cart: {
            ...initialState,
          },
        })
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage), // or sessionStorage
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return persistedState
        }
        return persistedState
      },
    }
  )
)

// Create a separate hook for computed values to avoid hydration issues
export const useCart = () => {
  const { cart } = useCartStore()
  
  return {
    // Direct cart access
    ...cart,
    
    // Computed properties
    totalItems: cart.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cart.totalPrice,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    
    // Methods from store
    addItem: useCartStore.getState().addItem,
    updateItem: useCartStore.getState().updateItem,
    removeItem: useCartStore.getState().removeItem,
    clearCart: useCartStore.getState().clearCart,
    setShippingAddress: useCartStore.getState().setShippingAddress,
    setPaymentMethod: useCartStore.getState().setPaymentMethod,
    setDeliveryDateIndex: useCartStore.getState().setDeliveryDateIndex,
  }
}

export default useCartStore
