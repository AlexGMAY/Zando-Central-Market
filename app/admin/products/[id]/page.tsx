// import { notFound } from 'next/navigation'

// import { getProductById } from '@/lib/actions/product.actions'
// import Link from 'next/link'
// import ProductForm from '../product-form'
// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Edit Product',
// }

// type UpdateProductProps = {
//   params: Promise<{
//     id: string
//   }>
// }

// const UpdateProduct = async (props: UpdateProductProps) => {
//   const params = await props.params

//   const { id } = params

//   const product = await getProductById(id)
//   if (!product) notFound()
//   return (
//     <main className='max-w-6xl mx-auto p-4'>
//       <div className='flex mb-4'>
//         <Link href='/admin/products'>Products</Link>
//         <span className='mx-1'>›</span>
//         <Link href={`/admin/products/${product._id}`}>{product._id}</Link>
//       </div>

//       <div className='my-8'>
//         <ProductForm type='Update' product={product} productId={product._id} />
//       </div>
//     </main>
//   )
// }

// export default UpdateProduct


import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/actions/product.actions'
import Link from 'next/link'
import ProductForm from '../product-form'
import { Metadata } from 'next'
import { ArrowLeft, Package, Edit3, Eye, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDateTime, formatId } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Edit Product | Admin Dashboard',
}

type UpdateProductProps = {
  params: Promise<{
    id: string
  }>
}

const UpdateProduct = async (props: UpdateProductProps) => {
  const params = await props.params
  const { id } = params

  const product = await getProductById(id)
  if (!product) notFound()

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
            Edit {product.name}
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Edit3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Edit Product
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  Update product details and inventory information
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300">
              <Edit3 className="w-3 h-3 mr-1" />
              Editing
            </Badge>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/admin/products">
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>

        {/* Product Summary Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Product Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <Tag className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-300">Product ID</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-mono">
                    {formatId(product._id.toString())}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                  <Package className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">Current Status</p>
                  <Badge 
                    variant={product.isPublished ? "default" : "secondary"}
                    className={product.isPublished 
                      ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 mt-1" 
                      : "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 mt-1"
                    }
                  >
                    {product.isPublished ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">Last Updated</p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs">
                    {formatDateTime(product.updatedAt).dateTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-300">Live Preview</p>
                  <Button asChild variant="link" className="h-auto p-0 text-purple-700 dark:text-purple-400">
                    <Link target="_blank" href={`/product/${product.slug}`} className="text-xs">
                      View on site →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href={`/product/${product.slug}`} target="_blank">
                  <Eye className="w-4 h-4" />
                  Preview Product
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/admin/products">
                  <Package className="w-4 h-4" />
                  View All Products
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/admin/products/create">
                  <Edit3 className="w-4 h-4" />
                  Create New Product
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Form */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Edit3 className="w-5 h-5 text-blue-600" />
              Edit Product Details
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Update the product information below. Changes will be reflected immediately on your store.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <ProductForm type="Update" product={product} productId={product._id.toString()} />
          </CardContent>
        </Card>

        {/* Footer Help Section */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need assistance? Check out our{' '}
            <Link href="/admin/help/products" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
              product management guide
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default UpdateProduct
