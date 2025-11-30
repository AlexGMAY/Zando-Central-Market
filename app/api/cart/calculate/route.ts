// app/api/cart/calculate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'

export async function POST(request: NextRequest) {
  try {
    const { items, shippingAddress, deliveryDateIndex } = await request.json()
    
    const calculations = await calcDeliveryDateAndPrice({
      items,
      shippingAddress,
      deliveryDateIndex
    })

    return NextResponse.json(calculations)
  } catch (error) {
    console.error('Cart calculation error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate prices' },
      { status: 500 }
    )
  }
}