// import Link from 'next/link'
// import ProductForm from '../product-form'
// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Create Product',
// }

// const CreateProductPage = () => {
//   return (
//     <main className='max-w-6xl mx-auto p-4'>
//       <div className='flex mb-4'>
//         <Link href='/admin/products'>Products</Link>
//         <span className='mx-1'>›</span>
//         <Link href='/admin/products/create'>Create</Link>
//       </div>

//       <div className='my-8'>
//         <ProductForm type='Create' />
//       </div>
//     </main>
//   )
// }

// export default CreateProductPage

import Link from 'next/link'
import ProductForm from '../product-form'
import { Metadata } from 'next'
import { ArrowLeft, Package, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Create New Product | Admin Dashboard',
}

const CreateProductPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <Link 
            href="/admin/overview" 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <span>›</span>
          <Link 
            href="/admin/products" 
            className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <Package className="w-4 h-4" />
            Products
          </Link>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-medium">
            Create Product
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Create New Product
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  Add a new product to your catalog and start selling
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300">
              <Plus className="w-3 h-3 mr-1" />
              New Product
            </Badge>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/admin/products">
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <Package className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">Complete Information</p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs">Fill all required fields for better visibility</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                  <Plus className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">High-Quality Images</p>
                  <p className="text-green-700 dark:text-green-400 text-xs">Upload clear, professional product photos</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                  <ArrowLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-300">SEO Optimization</p>
                  <p className="text-purple-700 dark:text-purple-400 text-xs">Use relevant keywords in title and description</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Form */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <ProductForm type="Create" />
          </CardContent>
        </Card>

        {/* Footer Help Section */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help? Check out our{' '}
            <Link href="/admin/help/products" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
              product creation guide
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default CreateProductPage
