'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, Check, StarIcon, User, MessageSquare, PenLine, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useInView } from 'react-intersection-observer'
import { z } from 'zod'

import Rating from '@/components/shared/product/rating'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription, 
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import {
  createUpdateReview,
  getReviewByProductId,
  getReviews,
} from '@/lib/actions/review.actions'
import { ReviewInputSchema } from '@/lib/validator'
import RatingSummary from '@/components/shared/product/rating-summary'
import { IProduct } from '@/lib/db/models/product.model'
import { IReviewDetails } from '@/types'
import { Badge } from '@/components/ui/badge'


const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
}

export default function ReviewList({
  userId,
  product,
}: {
  userId: string | undefined
  product: IProduct
}) {
  const [page, setPage] = useState(2)
  const [totalPages, setTotalPages] = useState(0)
  const [reviews, setReviews] = useState<IReviewDetails[]>([])
  const [expandedReview, setExpandedReview] = useState<string | null>(null)
  const { ref, inView } = useInView({ triggerOnce: true })
  
  const reload = async () => {
    try {
      const res = await getReviews({ productId: product._id, page: 1 })
      setReviews([...res.data])
      setTotalPages(res.totalPages)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error in fetching reviews'
      toast({
        variant: 'destructive',
        description: message,
      })
    }
  }

  const loadMoreReviews = async () => {
    if (totalPages !== 0 && page > totalPages) return
    setLoadingReviews(true)
    const res = await getReviews({ productId: product._id, page })
    setLoadingReviews(false)
    setReviews([...reviews, ...res.data])
    setTotalPages(res.totalPages)
    setPage(page + 1)
  }

  const [loadingReviews, setLoadingReviews] = useState(false)
  useEffect(() => {
    const loadReviews = async () => {
      setLoadingReviews(true)
      const res = await getReviews({ productId: product._id, page: 1 })
      setReviews([...res.data])
      setTotalPages(res.totalPages)
      setLoadingReviews(false)
    }

    if (inView) {
      loadReviews()
    }
  }, [inView, product._id])

  type CustomerReview = z.infer<typeof ReviewInputSchema>
  const form = useForm<CustomerReview>({
    resolver: zodResolver(ReviewInputSchema),
    defaultValues: reviewFormDefaultValues,
  })
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  
  const onSubmit: SubmitHandler<CustomerReview> = async (values) => {
    const res = await createUpdateReview({
      data: { ...values, product: product._id },
      path: `/product/${product.slug}`,
    })
    if (!res.success)
      return toast({
        variant: 'destructive',
        description: res.message,
      })
    setOpen(false)
    reload()
    toast({
      description: "🎉 Review submitted successfully!",
    })
  }

  const handleOpenForm = async () => {
    form.setValue('product', product._id)
    form.setValue('user', userId!)
    form.setValue('isVerifiedPurchase', true)
    const review = await getReviewByProductId({ productId: product._id })
    if (review) {
      form.setValue('title', review.title)
      form.setValue('comment', review.comment)
      form.setValue('rating', review.rating)
    }
    setOpen(true)
  }

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId)
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          <StarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="currentColor" />
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {product.avgRating}/5
          </span>
        </div>
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Be the first to share your thoughts about this product!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Left Column - Stats & Review Form */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.length !== 0 && (
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <RatingSummary
                  avgRating={product.avgRating}
                  numReviews={product.numReviews}
                  ratingDistribution={product.ratingDistribution}
                />
              </CardContent>
            </Card>
          )}
          
          {/* Review CTA Card */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <PenLine className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Share Your Experience
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Help other customers make informed decisions
              </p>
              {userId ? (
                <Dialog open={open} onOpenChange={setOpen}>
                  <Button
                    onClick={handleOpenForm}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    Write a Review
                  </Button>

                  <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border-0 shadow-2xl rounded-2xl">
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        Write a Review
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Share your honest thoughts about this product
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                      <form method='post' onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                          {/* Rating Selection */}
                          <FormField
                            control={form.control}
                            name='rating'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold">Your Rating</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={(field.value ?? 0).toString()}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                      <SelectValue placeholder="Select your rating" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                      <SelectItem
                                        key={index}
                                        value={(index + 1).toString()}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                      >
                                        <div className="flex items-center gap-2">
                                          <div className="flex">
                                            {Array.from({ length: index + 1 }).map((_, i) => (
                                              <StarIcon key={i} className="h-4 w-4 text-amber-500 fill-current" />
                                            ))}
                                          </div>
                                          <span className="text-gray-900 dark:text-gray-100">
                                            {index + 1} Star{index !== 0 ? 's' : ''}
                                          </span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Title */}
                          <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold">Review Title</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Summarize your experience..." 
                                    {...field}
                                    className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Comment */}
                          <FormField
                            control={form.control}
                            name='comment'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold">Detailed Review</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Share your detailed experience with this product..."
                                    {...field}
                                    rows={4}
                                    className="border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <DialogFooter>
                          <Button
                            type='submit'
                            size='lg'
                            disabled={form.formState.isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            {form.formState.isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Submitting...
                              </div>
                            ) : (
                              'Submit Review'
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Please sign in to write a review
                  </p>
                  <Link
                    href={`/sign-in?callbackUrl=/product/${product.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Sign In to Review
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Reviews List */}
        <div className='lg:col-span-4 space-y-4'>
          {reviews.map((review: IReviewDetails) => (
            <Card key={review._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                      {review.title}
                    </CardTitle>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Rating rating={review.rating} />
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        <Check className="h-3 w-3 mr-1" />
                        Verified Purchase
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Review Content */}
                <CardDescription className={`text-gray-700 dark:text-gray-300 leading-relaxed ${
                  expandedReview === review._id ? '' : 'line-clamp-3'
                }`}>
                  {review.comment}
                </CardDescription>

                {/* Expand/Collapse Button */}
                {review.comment.length > 200 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleReviewExpansion(review._id)}
                    className="mt-3 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto"
                  >
                    {expandedReview === review._id ? (
                      <>
                        Show less <ChevronUp className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                )}

                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <User className="h-4 w-4" />
                    {review.user ? review.user.name : 'Anonymous User'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Load More Section */}
          <div ref={ref} className="text-center pt-6">
            {page <= totalPages && (
              <Button 
                variant="outline" 
                onClick={loadMoreReviews}
                disabled={loadingReviews}
                className="border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 hover:scale-105"
              >
                {loadingReviews ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                ) : (
                  'Load More Reviews'
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
