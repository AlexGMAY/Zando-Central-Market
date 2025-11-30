'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/models/product.model'
import { UploadButton } from '@/lib/uploadthing'
import { ProductInputSchema, ProductUpdateSchema } from '@/lib/validator'
import { Checkbox } from '@/components/ui/checkbox'
import { toSlug } from '@/lib/utils'
import { IProductInput } from '@/types'
import { 
  Trash, 
  Package, 
  Tag, 
  DollarSign, 
  Warehouse, 
  FileText,
  Globe,
  Building,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const productDefaultValues: IProductInput =
  process.env.NODE_ENV === 'development'
    ? {
        name: 'Sample Product',
        slug: 'sample-product',
        category: 'Sample Category',
        images: ['/images/p11-1.jpg'],
        brand: 'Sample Brand',
        description: 'This is a sample description of the product.',
        price: 99.99,
        listPrice: 0,
        countInStock: 15,
        numReviews: 0,
        avgRating: 0,
        numSales: 0,
        isPublished: false,
        tags: [],
        sizes: [],
        colors: [],
        ratingDistribution: [],
        reviews: [],
      }
    : {
        name: '',
        slug: '',
        category: '',
        images: [],
        brand: '',
        description: '',
        price: 0,
        listPrice: 0,
        countInStock: 0,
        numReviews: 0,
        avgRating: 0,
        numSales: 0,
        isPublished: false,
        tags: [],
        sizes: [],
        colors: [],
        ratingDistribution: [],
        reviews: [],
      }

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: IProduct
  productId?: string
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<IProductInput>({
    resolver:
      type === 'Update'
        ? zodResolver(ProductUpdateSchema)
        : zodResolver(ProductInputSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  })

  async function onSubmit(values: IProductInput) {
    if (type === 'Create') {
      const res = await createProduct(values)
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        toast({
          description: res.message,
        })
        router.push(`/admin/products`)
      }
    }
    if (type === 'Update') {
      if (!productId) {
        router.push(`/admin/products`)
        return
      }
      const res = await updateProduct({ ...values, _id: productId })
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        router.push(`/admin/products`)
      }
    }
  }

  const images = form.watch('images')
  const isSubmitting = form.formState.isSubmitting

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            {type} Product
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {type === 'Create' ? 'Add a new product to your catalog' : 'Update product details and inventory'}
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
          {type === 'Create' ? 'New Product' : 'Editing'}
        </Badge>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-5 h-5 text-blue-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <Package className="w-4 h-4 text-slate-600" />
                        Product Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter product name" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <Globe className="w-4 h-4 text-slate-600" />
                        URL Slug
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter product slug"
                            className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-24"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              form.setValue('slug', toSlug(form.getValues('name')))
                            }}
                            className="absolute right-1 top-1 h-7 text-xs"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <Tag className="w-4 h-4 text-slate-600" />
                        Category
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter category" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <Building className="w-4 h-4 text-slate-600" />
                        Brand
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter product brand" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Inventory Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <DollarSign className="w-5 h-5 text-green-600" />
                Pricing & Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="listPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">List Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          step="0.01"
                          placeholder="0.00" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormDescription>
                        Original price before discount
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Net Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          step="0.01"
                          placeholder="0.00" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormDescription>
                        Current selling price
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="countInStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <Warehouse className="w-4 h-4 text-slate-600" />
                        Stock Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Images Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <ImageIcon className="w-5 h-5 text-purple-600" />
                Product Images
              </CardTitle>
              <FormDescription>
                Upload high-quality images of your product. First image will be used as the main display.
              </FormDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-4">
                        {/* Image Gallery */}
                        {images.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((image: string) => (
                              <Card key={image} className="relative group border-slate-200 dark:border-slate-700 overflow-hidden">
                                <Image
                                  src={image}
                                  alt="product image"
                                  className="w-full h-32 object-cover object-center transition-transform group-hover:scale-105"
                                  width={200}
                                  height={128}
                                />
                                <Button
                                  variant="destructive"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                                  type="button"
                                  size="icon"
                                  onClick={() => {
                                    form.setValue(
                                      'images',
                                      images.filter((img) => img !== image)
                                    )
                                  }}
                                >
                                  <Trash className="w-3 h-3" />
                                </Button>
                                {images[0] === image && (
                                  <Badge className="absolute top-2 left-2 bg-blue-600 text-xs">
                                    Primary
                                  </Badge>
                                )}
                              </Card>
                            ))}
                          </div>
                        )}

                        {/* Upload Button */}
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                          <UploadButton
                            endpoint='imageUploader'
                            onClientUploadComplete={(res: { url: string }[]) => {
                              form.setValue('images', [...images, res[0].url])
                              toast({
                                description: 'Image uploaded successfully!',
                              })
                            }}
                            onUploadError={(error: Error) => {
                              toast({
                                variant: 'destructive',
                                description: `Upload failed! ${error.message}`,
                              })
                            }}
                            appearance={{
                              button: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg",
                              allowedContent: "text-slate-500 dark:text-slate-400 text-sm",
                            }}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Description Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-5 h-5 text-orange-600" />
                Product Description
              </CardTitle>
              <FormDescription>
                Describe your product in detail. Include features, specifications, and key benefits.
              </FormDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter detailed product description..."
                        className="min-h-[120px] resize-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Publishing Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="w-5 h-5 text-green-600" />
                Publishing Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-semibold text-slate-900 dark:text-white">
                        Publish Product
                      </FormLabel>
                      <FormDescription>
                        Make this product visible to customers on your store
                      </FormDescription>
                    </div>
                    {field.value && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 ml-auto">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/products')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 min-w-[200px]"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {type === 'Create' ? 'Create Product' : 'Update Product'}
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm
