// app/api/cart/check-stock/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { checkStock } from '@/lib/actions/stock.actions'// You'll need to create this

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json()
    
    // Check stock for all items
    const stockCheck = await checkStock(items)
    
    return NextResponse.json(stockCheck)
  } catch (error) {
    console.error('Stock check error:', error)
    return NextResponse.json(
      { error: 'Failed to check stock' },
      { status: 500 }
    )
  }
}

// New API route for variant validation
// app/api/products/[id]/validate-variant/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { validateVariant } from '@/lib/actions/stock.actions'

// export async function POST(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { size, color } = await request.json()
//     const result = await validateVariant(params.id, size, color)
    
//     return NextResponse.json(result)
//   } catch (error) {
//     console.error('Variant validation error:', error)
//     return NextResponse.json(
//       { error: 'Failed to validate variant' },
//       { status: 500 }
//     )
//   }
// }