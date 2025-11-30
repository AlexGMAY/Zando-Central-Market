'use server'

import mongoose from 'mongoose'
import Product from '@/lib/db/models/product.model'

export interface StockCheckItem {
  product: string
  quantity: number
  size?: string
  color?: string
}

export interface StockCheckResult {
  success: boolean
  stockResults: Array<{
    product: string
    name: string
    requested: number
    available: number
    sufficient: boolean
    size?: string
    color?: string
  }>
  outOfStockItems: Array<{
    product: string
    name: string
    requested: number
    available: number
    reason: string
    size?: string
    color?: string
  }>
  allInStock: boolean
}

export async function checkStock(items: StockCheckItem[]): Promise<StockCheckResult> {
  try {
    // Validate input
    if (!items || !Array.isArray(items)) {
      throw new Error('Invalid items array')
    }

    // Connect to database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!)
    }

    const stockResults = []
    const outOfStockItems = []

    // Get all product IDs for batch query
    const productIds = items.map(item => item.product)
    const products = await Product.find({ 
      _id: { $in: productIds } 
    })

    // Create a map for quick lookup
    const productMap = new Map()
    products.forEach(product => {
      productMap.set(product._id.toString(), product)
    })

    for (const item of items) {
      const product = productMap.get(item.product)
      
      if (!product) {
        outOfStockItems.push({
          product: item.product,
          name: 'Unknown Product',
          requested: item.quantity,
          available: 0,
          reason: 'Product not found',
          size: item.size,
          color: item.color
        })
        continue
      }

      // For your schema, we assume the main countInStock applies to all variants
      // If you need per-variant stock tracking, you'd need to modify your schema
      const availableStock = product.countInStock

      // Validate color and size if provided
      if (item.color && !product.colors.includes(item.color)) {
        outOfStockItems.push({
          product: item.product,
          name: product.name,
          requested: item.quantity,
          available: 0,
          reason: `Color '${item.color}' not available`,
          size: item.size,
          color: item.color
        })
        continue
      }

      if (item.size && !product.sizes.includes(item.size)) {
        outOfStockItems.push({
          product: item.product,
          name: product.name,
          requested: item.quantity,
          available: 0,
          reason: `Size '${item.size}' not available`,
          size: item.size,
          color: item.color
        })
        continue
      }

      // Check stock availability
      if (availableStock < item.quantity) {
        outOfStockItems.push({
          product: item.product,
          name: product.name,
          requested: item.quantity,
          available: availableStock,
          reason: `Only ${availableStock} items available`,
          size: item.size,
          color: item.color
        })
      } else {
        stockResults.push({
          product: item.product,
          name: product.name,
          requested: item.quantity,
          available: availableStock,
          sufficient: true,
          size: item.size,
          color: item.color
        })
      }
    }

    return {
      success: outOfStockItems.length === 0,
      stockResults,
      outOfStockItems,
      allInStock: outOfStockItems.length === 0
    }
  } catch (error) {
    console.error('Error checking stock:', error)
    throw new Error('Failed to check product stock')
  }
}

// Helper function to check stock for a single item
export async function checkSingleItemStock(item: StockCheckItem) {
  const result = await checkStock([item])
  return {
    ...result,
    isInStock: result.allInStock,
    available: result.stockResults[0]?.available || result.outOfStockItems[0]?.available || 0
  }
}

// Function to validate variant selection
export async function validateVariant(productId: string, size?: string, color?: string) {
  try {
    const product = await Product.findById(productId)
    
    if (!product) {
      return { valid: false, error: 'Product not found' }
    }

    const errors: string[] = []

    if (size && !product.sizes.includes(size)) {
      errors.push(`Size '${size}' not available`)
    }

    if (color && !product.colors.includes(color)) {
      errors.push(`Color '${color}' not available`)
    }

    return {
      valid: errors.length === 0,
      errors,
      product: {
        name: product.name,
        availableSizes: product.sizes,
        availableColors: product.colors,
        countInStock: product.countInStock
      }
    }
  } catch (error) {
    console.error('Error validating variant:', error)
    return { valid: false, error: 'Failed to validate variant' }
  }
}