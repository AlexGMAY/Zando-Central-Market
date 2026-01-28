// 'use client'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardFooter } from '@/components/ui/card'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import {
//   calculateFutureDate,
//   formatDateTime,
//   timeUntilMidnight,
// } from '@/lib/utils'
// import { ShippingAddressSchema } from '@/lib/validator'
// import { zodResolver } from '@hookform/resolvers/zod'
// import Image from 'next/image'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import CheckoutFooter from './checkout-footer'
// import { ShippingAddress } from '@/types'
// import useIsMounted from '@/hooks/use-is-mounted'
// import Link from 'next/link'
// import useCartStore from '@/hooks/use-cart-store'
// import ProductPrice from '@/components/shared/product/product-price'
// import {
//   APP_NAME,
//   AVAILABLE_DELIVERY_DATES,
//   AVAILABLE_PAYMENT_METHODS,
//   DEFAULT_PAYMENT_METHOD,
// } from '@/lib/constants'
// import { createOrder } from '@/lib/actions/order.actions'
// import { toast } from '@/hooks/use-toast'

// const shippingAddressDefaultValues =
//   process.env.NODE_ENV === 'development'
//     ? {
//         fullName: 'Basir',
//         street: '1911, 65 Sherbrooke Est',
//         city: 'Montreal',
//         province: 'Quebec',
//         phone: '4181234567',
//         postalCode: 'H2X 1C4',
//         country: 'Canada',
//       }
//     : {
//         fullName: '',
//         street: '',
//         city: '',
//         province: '',
//         phone: '',
//         postalCode: '',
//         country: '',
//       }

// const CheckoutForm = () => {
//   const router = useRouter()

//   const {
//     cart: {
//       items,
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       totalPrice,
//       shippingAddress,
//       deliveryDateIndex,
//       paymentMethod = DEFAULT_PAYMENT_METHOD,
//     },
//     setShippingAddress,
//     setPaymentMethod,
//     updateItem,
//     removeItem,
//     setDeliveryDateIndex,
//     clearCart,
//   } = useCartStore()

//   const isMounted = useIsMounted()

//   const shippingAddressForm = useForm<ShippingAddress>({
//     resolver: zodResolver(ShippingAddressSchema),
//     defaultValues: shippingAddress || shippingAddressDefaultValues,
//   })
//   const onSubmitShippingAddress: SubmitHandler<ShippingAddress> = (values) => {
//     setShippingAddress(values)
//     setIsAddressSelected(true)
//   }

//   useEffect(() => {
//     if (!isMounted || !shippingAddress) return
//     shippingAddressForm.setValue('fullName', shippingAddress.fullName)
//     shippingAddressForm.setValue('street', shippingAddress.street)
//     shippingAddressForm.setValue('city', shippingAddress.city)
//     shippingAddressForm.setValue('country', shippingAddress.country)
//     shippingAddressForm.setValue('postalCode', shippingAddress.postalCode)
//     shippingAddressForm.setValue('province', shippingAddress.province)
//     shippingAddressForm.setValue('phone', shippingAddress.phone)
//   }, [items, isMounted, router, shippingAddress, shippingAddressForm])

//   const [isAddressSelected, setIsAddressSelected] = useState<boolean>(false)
//   const [isPaymentMethodSelected, setIsPaymentMethodSelected] =
//     useState<boolean>(false)
//   const [isDeliveryDateSelected, setIsDeliveryDateSelected] =
//     useState<boolean>(false)

//   const handlePlaceOrder = async () => {
//     const res = await createOrder({
//       items,
//       shippingAddress,
//       expectedDeliveryDate: calculateFutureDate(
//         AVAILABLE_DELIVERY_DATES[deliveryDateIndex!].daysToDeliver
//       ),
//       deliveryDateIndex,
//       paymentMethod,
//       itemsPrice,
//       shippingPrice,
//       taxPrice,
//       totalPrice,
//     })
//     if (!res.success) {
//       toast({
//         description: res.message,
//         variant: 'destructive',
//       })
//     } else {
//       toast({
//         description: res.message,
//         variant: 'default',
//       })
//       clearCart()
//       router.push(`/checkout/${res.data?.orderId}`)
//     }
//   }
//   const handleSelectPaymentMethod = () => {
//     setIsAddressSelected(true)
//     setIsPaymentMethodSelected(true)
//   }
//   const handleSelectShippingAddress = () => {
//     shippingAddressForm.handleSubmit(onSubmitShippingAddress)()
//   }
//   const CheckoutSummary = () => (
//     <Card>
//       <CardContent className='p-4'>
//         {!isAddressSelected && (
//           <div className='border-b mb-4'>
//             <Button
//               className='rounded-full w-full'
//               onClick={handleSelectShippingAddress}
//             >
//               Ship to this address
//             </Button>
//             <p className='text-xs text-center py-2'>
//               Choose a shipping address and payment method in order to calculate
//               shipping, handling, and tax.
//             </p>
//           </div>
//         )}
//         {isAddressSelected && !isPaymentMethodSelected && (
//           <div className=' mb-4'>
//             <Button
//               className='rounded-full w-full'
//               onClick={handleSelectPaymentMethod}
//             >
//               Use this payment method
//             </Button>

//             <p className='text-xs text-center py-2'>
//               Choose a payment method to continue checking out. You&apos;ll
//               still have a chance to review and edit your order before it&apos;s
//               final.
//             </p>
//           </div>
//         )}
//         {isPaymentMethodSelected && isAddressSelected && (
//           <div>
//             <Button onClick={handlePlaceOrder} className='rounded-full w-full'>
//               Place Your Order
//             </Button>
//             <p className='text-xs text-center py-2'>
//               By placing your order, you agree to {APP_NAME}&apos;s{' '}
//               <Link href='/page/privacy-policy'>privacy notice</Link> and
//               <Link href='/page/conditions-of-use'> conditions of use</Link>.
//             </p>
//           </div>
//         )}

//         <div>
//           <div className='text-lg font-bold'>Order Summary</div>
//           <div className='space-y-2'>
//             <div className='flex justify-between'>
//               <span>Items:</span>
//               <span>
//                 <ProductPrice price={itemsPrice} plain />
//               </span>
//             </div>
//             <div className='flex justify-between'>
//               <span>Shipping & Handling:</span>
//               <span>
//                 {shippingPrice === undefined ? (
//                   '--'
//                 ) : shippingPrice === 0 ? (
//                   'FREE'
//                 ) : (
//                   <ProductPrice price={shippingPrice} plain />
//                 )}
//               </span>
//             </div>
//             <div className='flex justify-between'>
//               <span> Tax:</span>
//               <span>
//                 {taxPrice === undefined ? (
//                   '--'
//                 ) : (
//                   <ProductPrice price={taxPrice} plain />
//                 )}
//               </span>
//             </div>
//             <div className='flex justify-between  pt-4 font-bold text-lg'>
//               <span> Order Total:</span>
//               <span>
//                 <ProductPrice price={totalPrice} plain />
//               </span>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )

//   return (
//     <main className='max-w-6xl mx-auto highlight-link'>
//       <div className='grid md:grid-cols-4 gap-6'>
//         <div className='md:col-span-3'>
//           {/* shipping address */}
//           <div>
//             {isAddressSelected && shippingAddress ? (
//               <div className='grid grid-cols-1 md:grid-cols-12    my-3  pb-3'>
//                 <div className='col-span-5 flex text-lg font-bold '>
//                   <span className='w-8'>1 </span>
//                   <span>Shipping address</span>
//                 </div>
//                 <div className='col-span-5 '>
//                   <p>
//                     {shippingAddress.fullName} <br />
//                     {shippingAddress.street} <br />
//                     {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
//                   </p>
//                 </div>
//                 <div className='col-span-2'>
//                   <Button
//                     variant={'outline'}
//                     onClick={() => {
//                       setIsAddressSelected(false)
//                       setIsPaymentMethodSelected(true)
//                       setIsDeliveryDateSelected(true)
//                     }}
//                   >
//                     Change
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 <div className='flex text-primary text-lg font-bold my-2'>
//                   <span className='w-8'>1 </span>
//                   <span>Enter shipping address</span>
//                 </div>
//                 <Form {...shippingAddressForm}>
//                   <form
//                     method='post'
//                     onSubmit={shippingAddressForm.handleSubmit(
//                       onSubmitShippingAddress
//                     )}
//                     className='space-y-4'
//                   >
//                     <Card className='md:ml-8 my-4'>
//                       <CardContent className='p-4 space-y-2'>
//                         <div className='text-lg font-bold mb-2'>
//                           Your address
//                         </div>

//                         <div className='flex flex-col gap-5 md:flex-row'>
//                           <FormField
//                             control={shippingAddressForm.control}
//                             name='fullName'
//                             render={({ field }) => (
//                               <FormItem className='w-full'>
//                                 <FormLabel>Full Name</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder='Enter full name'
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                         <div>
//                           <FormField
//                             control={shippingAddressForm.control}
//                             name='street'
//                             render={({ field }) => (
//                               <FormItem className='w-full'>
//                                 <FormLabel>Address</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder='Enter address'
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                         <div className='flex flex-col gap-5 md:flex-row'>
//                           <FormField
//                             control={shippingAddressForm.control}
//                             name='city'
//                             render={({ field }) => (
//                               <FormItem className='w-full'>
//                                 <FormLabel>City</FormLabel>
//                                 <FormControl>
//                                   <Input placeholder='Enter city' {...field} />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={shippingAddressForm.control}
//                             name='province'
//                             render={({ field }) => (
//                               <FormItem className='w-full'>
//                                 <FormLabel>Province</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder='Enter province'
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={shippingAddressForm.control}
//                             name='country'
//                             render={({ field }) => (
//                               <FormItem className='w-full'>
//                                 <FormLabel>Country</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder='Enter country'
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                         <div className='flex flex-col gap-5 md:flex-row'>
//                           <FormField
//                             control={shippingAddressForm.control}
//                             name='postalCode'
//                             render={({ field }) => (
//                               <FormItem className='w-full'>
//                                 <FormLabel>Postal Code</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder='Enter postal code'
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                           <FormField
//                             control={shippingAddressForm.control}
//                             name='phone'
//                             render={({ field }) => (
//                               <FormItem className='w-full'>
//                                 <FormLabel>Phone number</FormLabel>
//                                 <FormControl>
//                                   <Input
//                                     placeholder='Enter phone number'
//                                     {...field}
//                                   />
//                                 </FormControl>
//                                 <FormMessage />
//                               </FormItem>
//                             )}
//                           />
//                         </div>
//                       </CardContent>
//                       <CardFooter className='  p-4'>
//                         <Button
//                           type='submit'
//                           className='rounded-full font-bold'
//                         >
//                           Ship to this address
//                         </Button>
//                       </CardFooter>
//                     </Card>
//                   </form>
//                 </Form>
//               </>
//             )}
//           </div>
//           {/* payment method */}
//           <div className='border-y'>
//             {isPaymentMethodSelected && paymentMethod ? (
//               <div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
//                 <div className='flex text-lg font-bold  col-span-5'>
//                   <span className='w-8'>2 </span>
//                   <span>Payment Method</span>
//                 </div>
//                 <div className='col-span-5 '>
//                   <p>{paymentMethod}</p>
//                 </div>
//                 <div className='col-span-2'>
//                   <Button
//                     variant='outline'
//                     onClick={() => {
//                       setIsPaymentMethodSelected(false)
//                       if (paymentMethod) setIsDeliveryDateSelected(true)
//                     }}
//                   >
//                     Change
//                   </Button>
//                 </div>
//               </div>
//             ) : isAddressSelected ? (
//               <>
//                 <div className='flex text-primary text-lg font-bold my-2'>
//                   <span className='w-8'>2 </span>
//                   <span>Choose a payment method</span>
//                 </div>
//                 <Card className='md:ml-8 my-4'>
//                   <CardContent className='p-4'>
//                     <RadioGroup
//                       value={paymentMethod}
//                       onValueChange={(value) => setPaymentMethod(value)}
//                     >
//                       {AVAILABLE_PAYMENT_METHODS.map((pm) => (
//                         <div key={pm.name} className='flex items-center py-1 '>
//                           <RadioGroupItem
//                             value={pm.name}
//                             id={`payment-${pm.name}`}
//                           />
//                           <Label
//                             className='font-bold pl-2 cursor-pointer'
//                             htmlFor={`payment-${pm.name}`}
//                           >
//                             {pm.name}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </CardContent>
//                   <CardFooter className='p-4'>
//                     <Button
//                       onClick={handleSelectPaymentMethod}
//                       className='rounded-full font-bold'
//                     >
//                       Use this payment method
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </>
//             ) : (
//               <div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
//                 <span className='w-8'>2 </span>
//                 <span>Choose a payment method</span>
//               </div>
//             )}
//           </div>
//           {/* items and delivery date */}
//           <div>
//             {isDeliveryDateSelected && deliveryDateIndex != undefined ? (
//               <div className='grid  grid-cols-1 md:grid-cols-12  my-3 pb-3'>
//                 <div className='flex text-lg font-bold  col-span-5'>
//                   <span className='w-8'>3 </span>
//                   <span>Items and shipping</span>
//                 </div>
//                 <div className='col-span-5'>
//                   <p>
//                     Delivery date:{' '}
//                     {
//                       formatDateTime(
//                         calculateFutureDate(
//                           AVAILABLE_DELIVERY_DATES[deliveryDateIndex]
//                             .daysToDeliver
//                         )
//                       ).dateOnly
//                     }
//                   </p>
//                   <ul>
//                     {items.map((item, _index) => (
//                       <li key={_index}>
//                         {item.name} x {item.quantity} = {item.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className='col-span-2'>
//                   <Button
//                     variant={'outline'}
//                     onClick={() => {
//                       setIsPaymentMethodSelected(true)
//                       setIsDeliveryDateSelected(false)
//                     }}
//                   >
//                     Change
//                   </Button>
//                 </div>
//               </div>
//             ) : isPaymentMethodSelected && isAddressSelected ? (
//               <>
//                 <div className='flex text-primary  text-lg font-bold my-2'>
//                   <span className='w-8'>3 </span>
//                   <span>Review items and shipping</span>
//                 </div>
//                 <Card className='md:ml-8'>
//                   <CardContent className='p-4'>
//                     <p className='mb-2'>
//                       <span className='text-lg font-bold text-green-700'>
//                         Arriving{' '}
//                         {
//                           formatDateTime(
//                             calculateFutureDate(
//                               AVAILABLE_DELIVERY_DATES[deliveryDateIndex!]
//                                 .daysToDeliver
//                             )
//                           ).dateOnly
//                         }
//                       </span>{' '}
//                       If you order in the next {timeUntilMidnight().hours} hours
//                       and {timeUntilMidnight().minutes} minutes.
//                     </p>
//                     <div className='grid md:grid-cols-2 gap-6'>
//                       <div>
//                         {items.map((item, _index) => (
//                           <div key={_index} className='flex gap-4 py-2'>
//                             <div className='relative w-16 h-16'>
//                               <Image
//                                 src={item.image}
//                                 alt={item.name}
//                                 fill
//                                 sizes='20vw'
//                                 style={{
//                                   objectFit: 'contain',
//                                 }}
//                               />
//                             </div>

//                             <div className='flex-1'>
//                               <p className='font-semibold'>
//                                 {item.name}, {item.color}, {item.size}
//                               </p>
//                               <p className='font-bold'>
//                                 <ProductPrice price={item.price} plain />
//                               </p>

//                               <Select
//                                 value={item.quantity.toString()}
//                                 onValueChange={(value) => {
//                                   if (value === '0') removeItem(item)
//                                   else updateItem(item, Number(value))
//                                 }}
//                               >
//                                 <SelectTrigger className='w-24'>
//                                   <SelectValue>
//                                     Qty: {item.quantity}
//                                   </SelectValue>
//                                 </SelectTrigger>
//                                 <SelectContent position='popper'>
//                                   {Array.from({
//                                     length: item.countInStock,
//                                   }).map((_, i) => (
//                                     <SelectItem key={i + 1} value={`${i + 1}`}>
//                                       {i + 1}
//                                     </SelectItem>
//                                   ))}
//                                   <SelectItem key='delete' value='0'>
//                                     Delete
//                                   </SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                       <div>
//                         <div className=' font-bold'>
//                           <p className='mb-2'> Choose a shipping speed:</p>

//                           <ul>
//                             <RadioGroup
//                               value={
//                                 AVAILABLE_DELIVERY_DATES[deliveryDateIndex!]
//                                   .name
//                               }
//                               onValueChange={(value) =>
//                                 setDeliveryDateIndex(
//                                   AVAILABLE_DELIVERY_DATES.findIndex(
//                                     (address) => address.name === value
//                                   )!
//                                 )
//                               }
//                             >
//                               {AVAILABLE_DELIVERY_DATES.map((dd) => (
//                                 <div key={dd.name} className='flex'>
//                                   <RadioGroupItem
//                                     value={dd.name}
//                                     id={`address-${dd.name}`}
//                                   />
//                                   <Label
//                                     className='pl-2 space-y-2 cursor-pointer'
//                                     htmlFor={`address-${dd.name}`}
//                                   >
//                                     <div className='text-green-700 font-semibold'>
//                                       {
//                                         formatDateTime(
//                                           calculateFutureDate(dd.daysToDeliver)
//                                         ).dateOnly
//                                       }
//                                     </div>
//                                     <div>
//                                       {(dd.freeShippingMinPrice > 0 &&
//                                       itemsPrice >= dd.freeShippingMinPrice
//                                         ? 0
//                                         : dd.shippingPrice) === 0 ? (
//                                         'FREE Shipping'
//                                       ) : (
//                                         <ProductPrice
//                                           price={dd.shippingPrice}
//                                           plain
//                                         />
//                                       )}
//                                     </div>
//                                   </Label>
//                                 </div>
//                               ))}
//                             </RadioGroup>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </>
//             ) : (
//               <div className='flex text-muted-foreground text-lg font-bold my-4 py-3'>
//                 <span className='w-8'>3 </span>
//                 <span>Items and shipping</span>
//               </div>
//             )}
//           </div>
//           {isPaymentMethodSelected && isAddressSelected && (
//             <div className='mt-6'>
//               <div className='block md:hidden'>
//                 <CheckoutSummary />
//               </div>

//               <Card className='hidden md:block '>
//                 <CardContent className='p-4 flex flex-col md:flex-row justify-between items-center gap-3'>
//                   <Button onClick={handlePlaceOrder} className='rounded-full'>
//                     Place Your Order
//                   </Button>
//                   <div className='flex-1'>
//                     <p className='font-bold text-lg'>
//                       Order Total: <ProductPrice price={totalPrice} plain />
//                     </p>
//                     <p className='text-xs'>
//                       {' '}
//                       By placing your order, you agree to {APP_NAME}&apos;s{' '}
//                       <Link href='/page/privacy-policy'>privacy notice</Link>{' '}
//                       and
//                       <Link href='/page/conditions-of-use'>
//                         {' '}
//                         conditions of use
//                       </Link>
//                       .
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//           <CheckoutFooter />
//         </div>
//         <div className='hidden md:block'>
//           <CheckoutSummary />
//         </div>
//       </div>
//     </main>
//   )
// }
// export default CheckoutForm

'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  calculateFutureDate,
  formatDateTime,
  timeUntilMidnight,
} from '@/lib/utils'
import { ShippingAddressSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CheckoutFooter from './checkout-footer'
import { ShippingAddress } from '@/types'
import useIsMounted from '@/hooks/use-is-mounted'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart-store' // Use the new hook
import ProductPrice from '@/components/shared/product/product-price'
import {
  APP_NAME,
  AVAILABLE_DELIVERY_DATES,
  AVAILABLE_PAYMENT_METHODS,
  DEFAULT_PAYMENT_METHOD,
} from '@/lib/constants'
import { createOrder } from '@/lib/actions/order.actions'
import { toast } from '@/hooks/use-toast'
import {   
  Shield, 
  Lock,  
  CreditCard, 
  MapPin, 
  Package,
  CheckCircle2,
  Clock,
  Edit3
} from 'lucide-react'

const shippingAddressDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        fullName: 'Basir',
        street: '1911, 65 Sherbrooke Est',
        city: 'Montreal',
        province: 'Quebec',
        phone: '4181234567',
        postalCode: 'H2X 1C4',
        country: 'Canada',
      }
    : {
        fullName: '',
        street: '',
        city: '',
        province: '',
        phone: '',
        postalCode: '',
        country: '',
      }

const CheckoutForm = () => {
  const router = useRouter()

  const {
    items,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    shippingAddress,
    deliveryDateIndex,
    paymentMethod = DEFAULT_PAYMENT_METHOD,
    setShippingAddress,
    setPaymentMethod,
    updateItem,
    removeItem,
    setDeliveryDateIndex,
    clearCart,
  } = useCart() // Use the new hook

  const isMounted = useIsMounted()

  const shippingAddressForm = useForm<ShippingAddress>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: shippingAddress || shippingAddressDefaultValues,
  })
  
  const onSubmitShippingAddress: SubmitHandler<ShippingAddress> = (values) => {
    setShippingAddress(values)
    setIsAddressSelected(true)
  }

  useEffect(() => {
    if (!isMounted || !shippingAddress) return
    shippingAddressForm.setValue('fullName', shippingAddress.fullName)
    shippingAddressForm.setValue('street', shippingAddress.street)
    shippingAddressForm.setValue('city', shippingAddress.city)
    shippingAddressForm.setValue('country', shippingAddress.country)
    shippingAddressForm.setValue('postalCode', shippingAddress.postalCode)
    shippingAddressForm.setValue('province', shippingAddress.province)
    shippingAddressForm.setValue('phone', shippingAddress.phone)
  }, [items, isMounted, router, shippingAddress, shippingAddressForm])

  const [isAddressSelected, setIsAddressSelected] = useState<boolean>(false)
  const [isPaymentMethodSelected, setIsPaymentMethodSelected] = useState<boolean>(false)
  const [isDeliveryDateSelected, setIsDeliveryDateSelected] = useState<boolean>(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false)

  // Safe delivery date index with fallback
  const safeDeliveryDateIndex = deliveryDateIndex ?? 0
  const selectedDeliveryDate = AVAILABLE_DELIVERY_DATES[safeDeliveryDateIndex]

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true)
    try {
      const res = await createOrder({
        items,
        shippingAddress,
        expectedDeliveryDate: calculateFutureDate(
          selectedDeliveryDate.daysToDeliver
        ),
        deliveryDateIndex: safeDeliveryDateIndex,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
      
      if (!res.success) {
        toast({
          title: "Order Failed",
          description: res.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: "Order Confirmed!",
          description: res.message,
          variant: 'default',
        })
        clearCart()
        router.push(`/checkout/${res.data?.orderId}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again." + error,
        variant: 'destructive',
      })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleSelectPaymentMethod = () => {
    setIsAddressSelected(true)
    setIsPaymentMethodSelected(true)
  }

  const handleSelectShippingAddress = () => {
    shippingAddressForm.handleSubmit(onSubmitShippingAddress)()
  }

  const CheckoutSummary = () => (
    <Card className="sticky top-24 border-slate-200/50 dark:border-slate-700/50 shadow-lg">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          Order Summary
        </h3>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAddressSelected && (
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
            <Button
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200"
              onClick={handleSelectShippingAddress}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ship to this address
            </Button>
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-2">
              Complete shipping address to calculate shipping, handling, and tax.
            </p>
          </div>
        )}

        {isAddressSelected && !isPaymentMethodSelected && (
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
            <Button
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-200"
              onClick={handleSelectPaymentMethod}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Use this payment method
            </Button>
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-2">
              Choose payment method to continue. Review order before finalizing.
            </p>
          </div>
        )}

        {isPaymentMethodSelected && isAddressSelected && (
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
            <Button 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold transition-all duration-200 disabled:opacity-50"
            >
              {isPlacingOrder ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Place Your Order
                </div>
              )}
            </Button>
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-2">
              By placing your order, you agree to {APP_NAME}&apos;s{' '}
              <Link href='/page/privacy-policy' className="text-blue-600 hover:underline">privacy notice</Link> and{' '}
              <Link href='/page/conditions-of-use' className="text-blue-600 hover:underline">conditions of use</Link>.
            </p>
          </div>
        )}

        {/* Order Summary Details */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Items ({items.length}):</span>
            <span className="font-medium"><ProductPrice price={itemsPrice} plain /></span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Shipping:</span>
            <span className="font-medium">
              {shippingPrice === undefined ? (
                '--'
              ) : shippingPrice === 0 ? (
                <span className="text-green-600 font-semibold">FREE</span>
              ) : (
                <ProductPrice price={shippingPrice} plain />
              )}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-600 dark:text-slate-400">Tax:</span>
            <span className="font-medium">
              {taxPrice === undefined ? '--' : <ProductPrice price={taxPrice} plain />}
            </span>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Order Total:</span>
              <span className="text-green-600"><ProductPrice price={totalPrice} plain /></span>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-xs text-slate-500 dark:text-slate-400">Secure SSL Encryption</span>
        </div>
      </CardContent>
    </Card>
  )

  const StepIndicator = ({ step, title, completed, current }: { 
    step: number; 
    title: string; 
    completed: boolean; 
    current: boolean; 
  }) => (
    <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
      current 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
        : completed 
        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
    }`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
        current 
          ? 'bg-blue-500 text-white' 
          : completed 
          ? 'bg-green-500 text-white'
          : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
      }`}>
        {completed ? <CheckCircle2 className="w-4 h-4" /> : step}
      </div>
      <div>
        <div className={`font-semibold ${
          current || completed 
            ? 'text-slate-900 dark:text-white' 
            : 'text-slate-500 dark:text-slate-400'
        }`}>
          {title}
        </div>
      </div>
    </div>
  )

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StepIndicator 
          step={1} 
          title="Shipping Address" 
          completed={isAddressSelected} 
          current={!isAddressSelected} 
        />
        <StepIndicator 
          step={2} 
          title="Payment Method" 
          completed={isPaymentMethodSelected} 
          current={isAddressSelected && !isPaymentMethodSelected} 
        />
        <StepIndicator 
          step={3} 
          title="Review & Confirm" 
          completed={isDeliveryDateSelected} 
          current={isPaymentMethodSelected && !isDeliveryDateSelected} 
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          {/* Shipping Address Section */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Shipping Information
                </h2>
                {isAddressSelected && shippingAddress && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddressSelected(false)}
                    className="flex items-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    Change
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isAddressSelected && shippingAddress ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-300">{shippingAddress.fullName}</p>
                      <p className="text-slate-700 dark:text-slate-300">{shippingAddress.street}</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {shippingAddress.city}, {shippingAddress.province}, {shippingAddress.postalCode}
                      </p>
                      <p className="text-slate-600 dark:text-slate-400">{shippingAddress.country}</p>
                      <p className="text-slate-600 dark:text-slate-400">{shippingAddress.phone}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <Form {...shippingAddressForm}>
                  <form onSubmit={shippingAddressForm.handleSubmit(onSubmitShippingAddress)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={shippingAddressForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter full name" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={shippingAddressForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter phone number" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={shippingAddressForm.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter street address" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={shippingAddressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter city" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={shippingAddressForm.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter province" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={shippingAddressForm.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter postal code" {...field} className="h-11" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={shippingAddressForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter country" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold">
                      Save Shipping Address
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>

          {/* Payment Method Section */}
          {(isAddressSelected || isPaymentMethodSelected) && (
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Method
                  </h2>
                  {isPaymentMethodSelected && paymentMethod && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPaymentMethodSelected(false)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Change
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isPaymentMethodSelected && paymentMethod ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-semibold text-green-800 dark:text-green-300">{paymentMethod}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Your payment method is securely stored</p>
                      </div>
                    </div>
                  </div>
                ) : isAddressSelected ? (
                  <div className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value)} className="space-y-3">
                      {AVAILABLE_PAYMENT_METHODS.map((pm) => (
                        <div key={pm.name} className="flex items-center space-x-3 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                          <RadioGroupItem value={pm.name} id={`payment-${pm.name}`} />
                          <Label htmlFor={`payment-${pm.name}`} className="flex-1 cursor-pointer">
                            <div className="font-semibold">{pm.name}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    <Button 
                      onClick={handleSelectPaymentMethod}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                    >
                      Confirm Payment Method
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}

          {/* Items and Delivery Section */}
          {(isPaymentMethodSelected || isDeliveryDateSelected) && (
            <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Review Items & Shipping
                  </h2>
                  {isDeliveryDateSelected && deliveryDateIndex != undefined && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsDeliveryDateSelected(false)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Change
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isDeliveryDateSelected && deliveryDateIndex != undefined ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-800 dark:text-green-300">
                            Delivery scheduled for {formatDateTime(calculateFutureDate(selectedDeliveryDate.daysToDeliver)).dateOnly}
                          </p>
                          <div className="mt-2 space-y-1">
                            {items.map((item, index) => (
                              <div key={index} className="text-sm text-slate-700 dark:text-slate-300">
                                {item.name} × {item.quantity}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : isPaymentMethodSelected && isAddressSelected ? (
                  <div className="space-y-6">
                    {/* Delivery Time Notice */}
                    {selectedDeliveryDate && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-semibold text-blue-800 dark:text-blue-300">
                              Order within {timeUntilMidnight().hours}h {timeUntilMidnight().minutes}m for delivery by{' '}
                              {formatDateTime(calculateFutureDate(selectedDeliveryDate.daysToDeliver)).dateOnly}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Items List */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Items in Cart</h3>
                        <div className="space-y-4">
                          {items.map((item, index) => (
                            <div key={index} className="flex gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                              <div className="relative w-20 h-20 flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  sizes="80px"
                                  className="object-contain rounded-lg"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm line-clamp-2">{item.name}</p>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                  {item.color}, {item.size}
                                </p>
                                <p className="font-bold text-sm mt-1">
                                  <ProductPrice price={item.price} plain />
                                </p>
                                <Select
                                  value={item.quantity.toString()}
                                  onValueChange={(value) => {
                                    if (value === '0') removeItem(item)
                                    else updateItem(item, Number(value))
                                  }}
                                >
                                  <SelectTrigger className="w-20 h-8 text-sm">
                                    <SelectValue>Qty: {item.quantity}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Array.from({ length: item.countInStock }).map((_, i) => (
                                      <SelectItem key={i + 1} value={`${i + 1}`}>
                                        {i + 1}
                                      </SelectItem>
                                    ))}
                                    <SelectItem value="0">Remove</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Options */}
                      <div>
                        <h3 className="font-semibold text-lg mb-4">Shipping Options</h3>
                        <div className="space-y-3">
                          <RadioGroup
                            value={selectedDeliveryDate?.name}
                            onValueChange={(value) => {
                              const newIndex = AVAILABLE_DELIVERY_DATES.findIndex(dd => dd.name === value)
                              if (newIndex !== -1) {
                                setDeliveryDateIndex(newIndex)
                              }
                            }}
                          >
                            {AVAILABLE_DELIVERY_DATES.map((dd) => (
                              <div key={dd.name} className="flex items-start space-x-3 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                                <RadioGroupItem value={dd.name} id={`shipping-${dd.name}`} />
                                <Label htmlFor={`shipping-${dd.name}`} className="flex-1 cursor-pointer">
                                  <div className="font-semibold text-green-700">
                                    {formatDateTime(calculateFutureDate(dd.daysToDeliver)).dateOnly}
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    {dd.freeShippingMinPrice > 0 && itemsPrice >= dd.freeShippingMinPrice ? (
                                      <span className="text-green-600 font-semibold">FREE Shipping</span>
                                    ) : (
                                      <ProductPrice price={dd.shippingPrice} plain />
                                    )}
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        
                        <Button
                          onClick={() => setIsDeliveryDateSelected(true)}
                          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold mt-4"
                        >
                          Confirm Shipping
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          )}

          {/* Mobile Order Button */}
          {isPaymentMethodSelected && isAddressSelected && (
            <div className="block lg:hidden">
              <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                <CardContent className="p-6">
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold disabled:opacity-50"
                  >
                    {isPlacingOrder ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Order...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Place Your Order
                      </div>
                    )}
                  </Button>
                  <div className="text-center mt-3">
                    <p className="font-bold text-lg">
                      Order Total: <ProductPrice price={totalPrice} plain />
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      By placing your order, you agree to {APP_NAME}&apos;s privacy notice and conditions of use.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Desktop Order Summary */}
        <div className="hidden lg:block lg:col-span-2">
          <CheckoutSummary />
        </div>
      </div>

      <CheckoutFooter />
    </main>
  )
}

export default CheckoutForm
