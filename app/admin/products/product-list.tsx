'use client'
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import { 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Edit3, 
  Package,
  Filter,
  TrendingUp,
  Calendar,
  Hash
} from 'lucide-react'

import DeleteDialog from '@/components/shared/delete-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  deleteProduct,
  getAllProductsForAdmin,
} from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'

import { Input } from '@/components/ui/input'
import { formatDateTime, formatId } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProductPrice from '@/components/shared/product/product-price'

type ProductListDataProps = {
  products: IProduct[]
  totalPages: number
  totalProducts: number
  to: number
  from: number
}

const ProductList = () => {
  const [page, setPage] = useState<number>(1)
  const [inputValue, setInputValue] = useState<string>('')
  const [data, setData] = useState<ProductListDataProps>()
  const [isPending, startTransition] = useTransition()

  const handlePageChange = (changeType: 'next' | 'prev') => {
    const newPage = changeType === 'next' ? page + 1 : page - 1
    setPage(newPage)
    startTransition(async () => {
      const data = await getAllProductsForAdmin({
        query: inputValue,
        page: newPage,
      })
      setData(data)
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value) {
      clearTimeout((window as any).debounce)
      ;(window as any).debounce = setTimeout(() => {
        startTransition(async () => {
          const data = await getAllProductsForAdmin({ query: value, page: 1 })
          setData(data)
          setPage(1)
        })
      }, 500)
    } else {
      startTransition(async () => {
        const data = await getAllProductsForAdmin({ query: '', page: 1 })
        setData(data)
        setPage(1)
      })
    }
  }

  useEffect(() => {
    startTransition(async () => {
      const data = await getAllProductsForAdmin({ query: '' })
      setData(data)
    })
  }, [])

  const getStockVariant = (stock: number) => {
    if (stock === 0) return 'destructive'
    if (stock < 10) return 'default'
    return 'outline'
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 dark:text-green-400'
    if (rating >= 3) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            Product Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your product catalog and inventory
          </p>
        </div>
        
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Link href='/admin/products/create' className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Product
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Products</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{data?.totalProducts || 0}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Published</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {data?.products.filter(p => p.isPublished).length || 0}
                </p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Out of Stock</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {data?.products.filter(p => p.countInStock === 0).length || 0}
                </p>
              </div>
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Low Stock</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {data?.products.filter(p => p.countInStock > 0 && p.countInStock < 10).length || 0}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Filter className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Results */}
      <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-slate-600" />
              Product Catalog
            </CardTitle>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-10 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Search products..."
                />
              </div>
              
              {isPending ? (
                <div className="animate-pulse text-sm text-slate-500">Searching...</div>
              ) : (
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Showing {data?.from || 0}-{data?.to || 0} of {data?.totalProducts || 0} products
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-slate-200/50 dark:border-b-slate-700/50">
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      ID
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Product</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white text-right">Price</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Category</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Stock</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Rating</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Status</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Last Updated
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.products.map((product: IProduct) => (
                  <TableRow 
                    key={product._id} 
                    className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                  >
                    <TableCell className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {formatId(product._id)}
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/admin/products/${product._id}`}
                        className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-green-600">
                        <ProductPrice price={product.price} plain />
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStockVariant(product.countInStock)} className="text-xs">
                        {product.countInStock} in stock
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getRatingColor(product.avgRating)}`}>
                        {product.avgRating.toFixed(1)} ★
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={product.isPublished ? "default" : "secondary"}
                        className={product.isPublished 
                          ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300" 
                          : "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
                        }
                      >
                        {product.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDateTime(product.updatedAt).dateOnly}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Link href={`/admin/products/${product._id}`}>
                            <Edit3 className="w-3 h-3" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
                          <Link target="_blank" href={`/product/${product.slug}`}>
                            <Eye className="w-3 h-3" />
                          </Link>
                        </Button>
                        <DeleteDialog
                          id={product._id}
                          action={deleteProduct}
                          callbackAction={() => {
                            startTransition(async () => {
                              const data = await getAllProductsForAdmin({
                                query: inputValue,
                                page: page
                              })
                              setData(data)
                            })
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {(data?.totalPages ?? 0) > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Page {page} of {data?.totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange('prev')}
                  disabled={Number(page) <= 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handlePageChange('next')}
                  disabled={Number(page) >= (data?.totalPages ?? 0)}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductList
