// import {
//   Body,
//   Column,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Img,
//   Link,
//   Preview,
//   Row,
//   Section,
//   Tailwind,
//   Text,
// } from '@react-email/components'

// import { formatCurrency } from '@/lib/utils'
// import { IOrder } from '@/lib/db/models/order.model'
// import { SERVER_URL } from '@/lib/constants'

// type OrderInformationProps = {
//   order: IOrder
// }

// PurchaseReceiptEmail.PreviewProps = {
//   order: {
//     _id: '123',
//     isPaid: true,
//     paidAt: new Date(),
//     totalPrice: 100,
//     itemsPrice: 100,
//     taxPrice: 0,
//     shippingPrice: 0,
//     user: {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//     },
//     shippingAddress: {
//       fullName: 'John Doe',
//       street: '123 Main St',
//       city: 'New York',
//       postalCode: '12345',
//       country: 'USA',
//       phone: '123-456-7890',
//       province: 'New York',
//     },
//     items: [
//       {
//         clientId: '123',
//         name: 'Product 1',
//         image: 'https://via.placeholder.com/150',
//         price: 100,
//         quantity: 1,
//         product: '123',
//         slug: 'product-1',
//         category: 'Category 1',
//         countInStock: 10,
//       },
//     ],
//     paymentMethod: 'PayPal',
//     expectedDeliveryDate: new Date(),
//     isDelivered: true,
//   } as IOrder,
// } satisfies OrderInformationProps

// const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

// export default async function PurchaseReceiptEmail({
//   order,
// }: OrderInformationProps) {
//   return (
//     <Html>
//       <Preview>View order receipt</Preview>
//       <Tailwind>
//         <Head />
//         <Body className='font-sans bg-white'>
//           <Container className='max-w-xl'>
//             <Heading>Purchase Receipt</Heading>
//             <Section>
//               <Row>
//                 <Column>
//                   <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
//                     Order ID
//                   </Text>
//                   <Text className='mt-0 mr-4'>{order._id.toString()}</Text>
//                 </Column>
//                 <Column>
//                   <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
//                     Purchased On
//                   </Text>
//                   <Text className='mt-0 mr-4'>
//                     {dateFormatter.format(order.createdAt)}
//                   </Text>
//                 </Column>
//                 <Column>
//                   <Text className='mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4'>
//                     Price Paid
//                   </Text>
//                   <Text className='mt-0 mr-4'>
//                     {formatCurrency(order.totalPrice)}
//                   </Text>
//                 </Column>
//               </Row>
//             </Section>
//             <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4'>
//               {order.items.map((item) => (
//                 <Row key={item.product} className='mt-8'>
//                   <Column className='w-20'>
//                     <Link href={`${SERVER_URL}/product/${item.slug}`}>
//                       <Img
//                         width='80'
//                         alt={item.name}
//                         className='rounded'
//                         src={
//                           item.image.startsWith('/')
//                             ? `${SERVER_URL}${item.image}`
//                             : item.image
//                         }
//                       />
//                     </Link>
//                   </Column>
//                   <Column className='align-top'>
//                     <Link href={`${SERVER_URL}/product/${item.slug}`}>
//                       <Text className='mx-2 my-0'>
//                         {item.name} x {item.quantity}
//                       </Text>
//                     </Link>
//                   </Column>
//                   <Column align='right' className='align-top'>
//                     <Text className='m-0 '>{formatCurrency(item.price)}</Text>
//                   </Column>
//                 </Row>
//               ))}
//               {[
//                 { name: 'Items', price: order.itemsPrice },
//                 { name: 'Tax', price: order.taxPrice },
//                 { name: 'Shipping', price: order.shippingPrice },
//                 { name: 'Total', price: order.totalPrice },
//               ].map(({ name, price }) => (
//                 <Row key={name} className='py-1'>
//                   <Column align='right'>{name}:</Column>
//                   <Column align='right' width={70} className='align-top'>
//                     <Text className='m-0'>{formatCurrency(price)}</Text>
//                   </Column>
//                 </Row>
//               ))}
//             </Section>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   )
// }


import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

import { formatCurrency } from '@/lib/utils'
import { IOrder } from '@/lib/db/models/order.model'
import { APP_NAME, SERVER_URL } from '@/lib/constants'

type OrderInformationProps = {
  order: IOrder
}

PurchaseReceiptEmail.PreviewProps = {
  order: {
    _id: '123456789',
    isPaid: true,
    paidAt: new Date(),
    totalPrice: 349.99,
    itemsPrice: 329.99,
    taxPrice: 20.00,
    shippingPrice: 0,
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    shippingAddress: {
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'USA',
      phone: '+1 (123) 456-7890',
      province: 'NY',
    },
    items: [
      {
        clientId: '123',
        name: 'Premium Wireless Headphones - Noise Cancelling Over-Ear Bluetooth Headset',
        image: 'https://via.placeholder.com/150',
        price: 199.99,
        quantity: 1,
        product: '123',
        slug: 'premium-wireless-headphones',
        category: 'Electronics',
        countInStock: 10,
      },
      {
        clientId: '124',
        name: 'Smart Watch Series 5 - Fitness Tracker with Heart Rate Monitor',
        image: 'https://via.placeholder.com/150',
        price: 130.00,
        quantity: 1,
        product: '124',
        slug: 'smart-watch-series-5',
        category: 'Wearables',
        countInStock: 15,
      },
    ],
    paymentMethod: 'PayPal',
    expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    isDelivered: false,
  } as IOrder,
} satisfies OrderInformationProps

const dateFormatter = new Intl.DateTimeFormat('en', { 
  dateStyle: 'medium',
  timeStyle: 'short'
})

export default async function PurchaseReceiptEmail({
  order,
}: OrderInformationProps) {
  const deliveryDate = new Intl.DateTimeFormat('en', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(order.expectedDeliveryDate)

  return (
    <Html>
      <Preview>Your order confirmation and receipt - Order #{order._id.toString()}</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-slate-50 py-8">
          {/* Header */}
          <Container className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-t-2xl p-8 text-center max-w-2xl">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <Heading className="text-2xl font-bold m-0 mb-2">
              Order Confirmed!
            </Heading>
            <Text className="text-green-100 text-lg m-0">
              Thank you for your purchase!
            </Text>
          </Container>

          {/* Main Content */}
          <Container className="bg-white rounded-b-2xl shadow-lg max-w-2xl">
            {/* Order Status & Timeline */}
            <Section className="px-8 py-6 border-b border-slate-100">
              <Row>
                <Column>
                  <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium inline-flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Payment Confirmed
                  </div>
                </Column>
                <Column align="right">
                  <Text className="text-slate-500 text-sm m-0">
                    Order # {order._id.toString()}
                  </Text>
                </Column>
              </Row>
              
              {/* Delivery Timeline */}
              <Section className="mt-6 bg-blue-50 rounded-lg p-4">
                <Row>
                  <Column>
                    <Text className="text-blue-900 font-semibold text-sm m-0 mb-1">
                      📦 Expected Delivery
                    </Text>
                    <Text className="text-blue-700 text-sm m-0">
                      {deliveryDate}
                    </Text>
                  </Column>
                  <Column align="right">
                    <Text className="text-blue-900 font-semibold text-sm m-0 mb-1">
                      🚚 Shipping Method
                    </Text>
                    <Text className="text-blue-700 text-sm m-0">
                      Standard Shipping
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* Order Summary */}
            <Section className="px-8 py-6">
              <Text className="text-lg font-semibold text-slate-900 mb-4">
                Order Summary
              </Text>
              
              {order.items.map((item, index) => (
                <Section 
                  key={item.product} 
                  className={`py-4 ${index !== order.items.length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <Row>
                    <Column className="w-20">
                      <Link 
                        href={`${SERVER_URL}/product/${item.slug}`}
                        className="block transition-transform hover:scale-105"
                      >
                        <Img
                          width="80"
                          height="80"
                          alt={item.name}
                          className="rounded-lg border border-slate-200"
                          src={
                            item.image.startsWith('/')
                              ? `${SERVER_URL}${item.image}`
                              : item.image
                          }
                        />
                      </Link>
                    </Column>
                    
                    <Column className="pl-4 align-top">
                      <Link 
                        href={`${SERVER_URL}/product/${item.slug}`}
                        className="no-underline"
                      >
                        <Text className="text-slate-900 font-medium m-0 mb-1 hover:text-blue-600 transition-colors">
                          {item.name}
                        </Text>
                      </Link>
                      <Text className="text-slate-500 text-sm m-0">
                        Quantity: {item.quantity}
                      </Text>
                    </Column>
                    
                    <Column align="right" className="align-top">
                      <Text className="text-slate-900 font-semibold m-0">
                        {formatCurrency(item.price * item.quantity)}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              ))}
            </Section>

            {/* Pricing Breakdown */}
            <Section className="bg-slate-50 mx-8 mb-6 rounded-lg p-6">
              {[
                { name: 'Subtotal', price: order.itemsPrice },
                { name: 'Shipping', price: order.shippingPrice, note: 'Free' },
                { name: 'Tax', price: order.taxPrice },
              ].map(({ name, price, note }) => (
                <Row key={name} className="py-2">
                  <Column>
                    <Text className="text-slate-600 m-0 flex items-center gap-2">
                      {name}
                      {note && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {note}
                        </span>
                      )}
                    </Text>
                  </Column>
                  <Column align="right" width={100}>
                    <Text className="text-slate-900 font-medium m-0">
                      {formatCurrency(price)}
                    </Text>
                  </Column>
                </Row>
              ))}
              
              <Row className="py-3 border-t border-slate-200 mt-2">
                <Column>
                  <Text className="text-slate-900 font-bold text-lg m-0">Total</Text>
                </Column>
                <Column align="right" width={100}>
                  <Text className="text-slate-900 font-bold text-lg m-0">
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Shipping & Payment Info */}
            <Section className="px-8 py-6 border-t border-slate-100">
              <Row>
                <Column>
                  <Text className="text-slate-900 font-semibold mb-2">
                    📦 Shipping Address
                  </Text>
                  <Text className="text-slate-600 m-0">
                    {order.shippingAddress.fullName}<br />
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.country}<br />
                    📞 {order.shippingAddress.phone}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-slate-900 font-semibold mb-2">
                    💳 Payment Method
                  </Text>
                  <div className="bg-slate-100 rounded-lg p-3">
                    <Text className="text-slate-700 m-0 font-medium">
                      {order.paymentMethod}
                    </Text>
                    <Text className="text-slate-500 text-sm m-0 mt-1">
                      Paid on {dateFormatter.format(order.paidAt)}
                    </Text>
                  </div>
                </Column>
              </Row>
            </Section>

            {/* Order Actions */}
            <Section className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-100 rounded-b-2xl px-8 py-6">
              <Row>
                <Column>
                  <Text className="text-slate-700 m-0 mb-3 text-center">
                    Need help with your order?
                  </Text>
                  <Row>
                    <Column>
                      <Link 
                        href={`${SERVER_URL}/orders/${order._id}`}
                        className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 font-semibold py-3 px-4 rounded-lg text-center block no-underline transition-all duration-200"
                      >
                        View Order Details
                      </Link>
                    </Column>
                    <Column>
                      <Link 
                        href={`${SERVER_URL}/support`}
                        className="bg-slate-800 text-white hover:bg-slate-900 font-semibold py-3 px-4 rounded-lg text-center block no-underline transition-all duration-200"
                      >
                        Contact Support
                      </Link>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
          </Container>

          {/* Footer */}
          <Container className="text-center mt-8 max-w-2xl">
            <Text className="text-slate-400 text-sm mb-2">
              We're here to help if you have any questions
            </Text>
            <Text className="text-slate-400 text-xs">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.<br />
              {SERVER_URL.replace('https://', '')} • support@zando-kin.com
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
