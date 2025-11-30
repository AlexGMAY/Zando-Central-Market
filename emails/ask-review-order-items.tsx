// import {
//   Body,
//   Button,
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

// AskReviewOrderItemsEmail.PreviewProps = {
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

// export default async function AskReviewOrderItemsEmail({
//   order,
// }: OrderInformationProps) {
//   return (
//     <Html>
//       <Preview>Review Order Items</Preview>
//       <Tailwind>
//         <Head />
//         <Body className='font-sans bg-white'>
//           <Container className='max-w-xl'>
//             <Heading>Review Order Items</Heading>
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
//                       <Text className='mx-2 my-0'>{item.name}</Text>
//                     </Link>
//                   </Column>
//                   <Column align='right' className='align-top '>
//                     <Button
//                       href={`${SERVER_URL}/product/${item.slug}#reviews`}
//                       className='text-center bg-blue-500 hover:bg-blue-700 text-white   py-2 px-4 rounded'
//                     >
//                       Review this product
//                     </Button>
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
  Button,
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

AskReviewOrderItemsEmail.PreviewProps = {
  order: {
    _id: '123',
    isPaid: true,
    paidAt: new Date(),
    totalPrice: 100,
    itemsPrice: 100,
    taxPrice: 0,
    shippingPrice: 0,
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    shippingAddress: {
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      postalCode: '12345',
      country: 'USA',
      phone: '123-456-7890',
      province: 'New York',
    },
    items: [
      {
        clientId: '123',
        name: 'Premium Wireless Headphones - Noise Cancelling Over-Ear Bluetooth Headset with 40hr Battery',
        image: 'https://via.placeholder.com/150',
        price: 100,
        quantity: 1,
        product: '123',
        slug: 'product-1',
        category: 'Category 1',
        countInStock: 10,
      },
      {
        clientId: '124',
        name: 'Smart Watch Series 5 - Fitness Tracker with Heart Rate Monitor',
        image: 'https://via.placeholder.com/150',
        price: 250,
        quantity: 2,
        product: '124',
        slug: 'product-2',
        category: 'Category 2',
        countInStock: 15,
      },
    ],
    paymentMethod: 'PayPal',
    expectedDeliveryDate: new Date(),
    isDelivered: true,
  } as IOrder,
} satisfies OrderInformationProps

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export default async function AskReviewOrderItemsEmail({
  order,
}: OrderInformationProps) {
  return (
    <Html>
      <Preview>Share your experience! Review your recent purchases</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-slate-50 py-8">
          {/* Header Section */}
          <Container className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-t-2xl p-8 text-center">
            <Heading className="text-2xl font-bold m-0 mb-2">
              How was your experience?
            </Heading>
            <Text className="text-blue-100 text-lg m-0">
              Share your thoughts on products you recently purchased
            </Text>
          </Container>

          {/* Main Content Container */}
          <Container className="bg-white rounded-b-2xl shadow-lg max-w-2xl">
            {/* Order Summary */}
            <Section className="px-8 py-6 border-b border-slate-100">
              <Row>
                <Column className="align-middle">
                  <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium inline-block">
                    ✓ Order Delivered
                  </div>
                </Column>
                <Column align="right">
                  <Text className="text-slate-500 text-sm m-0">
                    Expected by {dateFormatter.format(order.expectedDeliveryDate)}
                  </Text>
                </Column>
              </Row>
              
              <Row className="mt-4">
                <Column>
                  <Text className="text-slate-500 text-sm font-medium mb-1">
                    ORDER NUMBER
                  </Text>
                  <Text className="text-slate-900 font-semibold m-0">
                    #{order._id.toString()}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-slate-500 text-sm font-medium mb-1">
                    PURCHASE DATE
                  </Text>
                  <Text className="text-slate-900 font-semibold m-0">
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-slate-500 text-sm font-medium mb-1">
                    TOTAL PAID
                  </Text>
                  <Text className="text-slate-900 font-semibold m-0">
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Products Section */}
            <Section className="px-8 py-6">
              <Text className="text-lg font-semibold text-slate-900 mb-6">
                Products to Review ({order.items.length})
              </Text>
              
              {order.items.map((item, index) => (
                <Section 
                  key={item.product} 
                  className={`py-6 ${index !== order.items.length - 1 ? 'border-b border-slate-100' : ''}`}
                >
                  <Row>
                    <Column className="w-24">
                      <Link 
                        href={`${SERVER_URL}/product/${item.slug}`}
                        className="block transition-transform hover:scale-105"
                      >
                        <Img
                          width="96"
                          height="96"
                          alt={item.name}
                          className="rounded-lg shadow-md border border-slate-200"
                          src={
                            item.image.startsWith('/')
                              ? `${SERVER_URL}${item.image}`
                              : item.image
                          }
                        />
                      </Link>
                    </Column>
                    
                    <Column className="pl-4 align-top max-w-xs">
                      <Link 
                        href={`${SERVER_URL}/product/${item.slug}`}
                        className="no-underline"
                      >
                        <Text className="text-slate-900 font-medium m-0 mb-1 leading-tight hover:text-blue-600 transition-colors">
                          {item.name}
                        </Text>
                      </Link>
                      <Text className="text-slate-500 text-sm m-0 mb-2">
                        Qty: {item.quantity}
                      </Text>
                      <Text className="text-slate-900 font-semibold m-0">
                        {formatCurrency(item.price)}
                      </Text>
                    </Column>
                    
                    <Column align="right" className="align-top">
                      <Button
                        href={`${SERVER_URL}/product/${item.slug}#reviews`}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:shadow-lg hover:-translate-y-0.5"
                      >
                        ✨ Write Review
                      </Button>
                    </Column>
                  </Row>
                </Section>
              ))}
            </Section>

            {/* Order Total Summary */}
            <Section className="bg-slate-50 rounded-lg mx-8 mb-8 p-6">
              <Text className="text-lg font-semibold text-slate-900 mb-4">
                Order Summary
              </Text>
              
              {[
                { name: 'Items', price: order.itemsPrice },
                { name: 'Shipping', price: order.shippingPrice },
                { name: 'Tax', price: order.taxPrice },
              ].map(({ name, price }) => (
                <Row key={name} className="py-2">
                  <Column>
                    <Text className="text-slate-600 m-0">{name}</Text>
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

            {/* Footer CTA */}
            <Section className="bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-100 rounded-b-2xl px-8 py-6 text-center">
              <Text className="text-slate-600 mb-4">
                Your reviews help other shoppers make better decisions
              </Text>
              <Button
                href={`${SERVER_URL}/orders/${order._id}`}
                className="bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg shadow-sm transition-all duration-200"
              >
                View Order Details
              </Button>
            </Section>
          </Container>

          {/* Email Footer */}
          <Container className="text-center mt-8 max-w-2xl">
            <Text className="text-slate-400 text-sm mb-4">
              Can't see the buttons? Copy and paste these links in your browser:
            </Text>
            {order.items.map((item) => (
              <Text key={item.product} className="text-slate-400 text-sm m-0 mb-1">
                {item.name}: {SERVER_URL}/product/{item.slug}#reviews
              </Text>
            ))}
            <Text className="text-slate-400 text-xs mt-6">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
