// 'use client'
// import { BadgeDollarSign, Barcode, CreditCard, Users, TrendingUp, ArrowUpRight, Eye } from 'lucide-react'
// import Link from 'next/link'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { calculatePastDate, formatDateTime, formatNumber } from '@/lib/utils'
// import SalesCategoryPieChart from './sales-category-pie-chart'
// import React, { useEffect, useState, useTransition } from 'react'
// import { DateRange } from 'react-day-picker'
// import { getOrderSummary } from '@/lib/actions/order.actions'
// import SalesAreaChart from './sales-area-chart'
// import { CalendarDateRangePicker } from './date-range-picker'
// import { IOrderList } from '@/types'
// import ProductPrice from '@/components/shared/product/product-price'
// import TableChart from './table-chart'
// import { Skeleton } from '@/components/ui/skeleton'


// export default function OverviewReport() {
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: calculatePastDate(30),
//     to: new Date(),
//   })

//   const [data, setData] = useState<{ [key: string]: any }>()
//   const [isPending, startTransition] = useTransition()

//   useEffect(() => {
//     if (date) {
//       startTransition(async () => {
//         setData(await getOrderSummary(date))
//       })
//     }
//   }, [date])

//   if (!data || isPending)
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
//             <p className="text-slate-600 dark:text-slate-400 mt-2">Key metrics and performance indicators</p>
//           </div>
//           <Skeleton className="h-12 w-64" />
//         </div>

//         {/* Metric Cards Skeleton */}
//         <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//           {[...Array(4)].map((_, index) => (
//             <Card key={index} className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <Skeleton className="h-4 w-20" />
//                   <Skeleton className="h-8 w-8 rounded-lg" />
//                 </div>
//                 <Skeleton className="h-8 w-24 mt-4" />
//                 <Skeleton className="h-4 w-32 mt-2" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Chart Skeletons */}
//         <div className="grid gap-6 lg:grid-cols-2">
//           <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
//             <CardHeader>
//               <Skeleton className="h-6 w-40" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-80 w-full" />
//             </CardContent>
//           </Card>
//           <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
//             <CardHeader>
//               <Skeleton className="h-6 w-40" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-80 w-full" />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
//           <p className="text-slate-600 dark:text-slate-400 mt-2">
//             Analytics for {formatDateTime(date!.from!).dateOnly} to {formatDateTime(date!.to!).dateOnly}
//           </p>
//         </div>
//         <CalendarDateRangePicker defaultDate={date} setDate={setDate} />
//       </div>

//       {/* Key Metrics Grid */}
//       <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">
//                 Total Revenue
//               </CardTitle>
//               <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
//                 <BadgeDollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-2xl font-bold text-slate-900 dark:text-white">
//                 <ProductPrice price={data.totalSales} plain />
//               </div>
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="h-3 w-3 text-green-500" />
//                 <span className="text-xs text-slate-600 dark:text-slate-400">
//                   +12.5% from last period
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/10 dark:to-green-800/10">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">
//                 Total Orders
//               </CardTitle>
//               <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
//                 <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-2xl font-bold text-slate-900 dark:text-white">
//                 {formatNumber(data.ordersCount)}
//               </div>
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="h-3 w-3 text-green-500" />
//                 <span className="text-xs text-slate-600 dark:text-slate-400">
//                   +8.2% from last period
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">
//                 Customers
//               </CardTitle>
//               <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
//                 <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-2xl font-bold text-slate-900 dark:text-white">
//                 {formatNumber(data.usersCount)}
//               </div>
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="h-3 w-3 text-green-500" />
//                 <span className="text-xs text-slate-600 dark:text-slate-400">
//                   +15.3% from last period
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/10 dark:to-orange-800/10">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">
//                 Products
//               </CardTitle>
//               <div className="p-2 bg-orange-100 dark:bg-orange-800/30 rounded-lg">
//                 <Barcode className="h-4 w-4 text-orange-600 dark:text-orange-400" />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="text-2xl font-bold text-slate-900 dark:text-white">
//                 {formatNumber(data.productsCount)}
//               </div>
//               <div className="flex items-center gap-2">
//                 <TrendingUp className="h-3 w-3 text-green-500" />
//                 <span className="text-xs text-slate-600 dark:text-slate-400">
//                   +5.7% from last period
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Charts Row */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
//           <CardHeader className="pb-4">
//             <CardTitle className="flex items-center gap-2 text-lg">
//               <TrendingUp className="h-5 w-5 text-blue-600" />
//               Sales Overview
//             </CardTitle>
//             <CardDescription>
//               Revenue trends and performance metrics
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <SalesAreaChart data={data.salesChartData} />
//           </CardContent>
//         </Card>

//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
//           <CardHeader className="pb-4">
//             <CardTitle className="flex items-center gap-2 text-lg">
//               <BadgeDollarSign className="h-5 w-5 text-green-600" />
//               Revenue Analytics
//             </CardTitle>
//             <CardDescription>Monthly performance breakdown</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <TableChart data={data.monthlySales} labelType='month' />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Performance Charts Row */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
//           <CardHeader className="pb-4">
//             <CardTitle className="flex items-center gap-2 text-lg">
//               <Barcode className="h-5 w-5 text-purple-600" />
//               Product Performance
//             </CardTitle>
//             <CardDescription>
//               Top performing products by revenue
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <TableChart data={data.topSalesProducts} labelType='product' />
//           </CardContent>
//         </Card>

//         <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
//           <CardHeader className="pb-4">
//             <CardTitle className="flex items-center gap-2 text-lg">
//               <Users className="h-5 w-5 text-orange-600" />
//               Category Distribution
//             </CardTitle>
//             <CardDescription>Sales by product category</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <SalesCategoryPieChart data={data.topSalesCategories} />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Sales */}
//       <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-lg">
//             <CreditCard className="h-5 w-5 text-slate-600" />
//             Recent Transactions
//           </CardTitle>
//           <CardDescription>Latest orders and customer activity</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow className="border-b-slate-200/50 dark:border-b-slate-700/50">
//                 <TableHead className="font-semibold text-slate-900 dark:text-white">Customer</TableHead>
//                 <TableHead className="font-semibold text-slate-900 dark:text-white">Date</TableHead>
//                 <TableHead className="font-semibold text-slate-900 dark:text-white">Amount</TableHead>
//                 <TableHead className="font-semibold text-slate-900 dark:text-white text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {data.latestOrders.map((order: IOrderList) => (
//                 <TableRow key={order._id} className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
//                   <TableCell className="font-medium text-slate-900 dark:text-white">
//                     {order.user ? order.user.name : 'Deleted User'}
//                   </TableCell>
//                   <TableCell className="text-slate-600 dark:text-slate-400">
//                     {formatDateTime(order.createdAt).dateOnly}
//                   </TableCell>
//                   <TableCell>
//                     <span className="font-bold text-green-600">
//                       <ProductPrice price={order.totalPrice} plain />
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <Link 
//                       href={`/admin/orders/${order._id}`}
//                       className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                     >
//                       <Eye className="h-4 w-4" />
//                       View Details
//                       <ArrowUpRight className="h-3 w-3" />
//                     </Link>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client'
import { BadgeDollarSign, Barcode, CreditCard, Users, TrendingUp, ArrowUpRight, Eye } from 'lucide-react'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { calculatePastDate, formatDateTime, formatNumber } from '@/lib/utils'
import SalesCategoryPieChart from './sales-category-pie-chart'
import React, { useEffect, useState, useTransition } from 'react'
import { DateRange } from 'react-day-picker'
import { getOrderSummary } from '@/lib/actions/order.actions'
import SalesAreaChart from './sales-area-chart'
import { CalendarDateRangePicker } from './date-range-picker'
import { IOrderList } from '@/types'
import ProductPrice from '@/components/shared/product/product-price'
import TableChart from './table-chart'
import { Skeleton } from '@/components/ui/skeleton'


// Define the API response interface
interface DashboardData {
  totalSales: number;
  ordersCount: number;
  usersCount: number;
  productsCount: number;
  salesChartData: Array<{ date: string; sales: number }>; // API returns 'sales', not 'totalSales'
  monthlySales: Array<{ month: string; revenue: number; orders: number }>; // API returns different structure
  topSalesProducts: Array<{ product: string; revenue: number; unitsSold: number }>; // API returns different structure
  topSalesCategories: Array<{ category: string; value: number }>; // API returns different structure
  latestOrders: IOrderList[];
}

// Types for chart components
type SalesAreaChartData = Array<{ date: string; totalSales: number }>;
type TableChartData = Array<{ label: string; image?: string; value: number; id?: string }>;
type PieChartData = Array<{ _id: string; totalSales: number }>;

export default function OverviewReport() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: calculatePastDate(30),
    to: new Date(),
  })

  const [data, setData] = useState<DashboardData>()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (date) {
      startTransition(async () => {
        const result = await getOrderSummary(date);
        setData(result);
      })
    }
  }, [date])

  // Transform data for chart components
  const transformSalesChartData = (): SalesAreaChartData => {
    if (!data?.salesChartData) return [];
    return data.salesChartData.map(item => ({
      date: item.date,
      totalSales: item.sales // Transform 'sales' to 'totalSales'
    }));
  };

  const transformMonthlySalesData = (): TableChartData => {
    if (!data?.monthlySales) return [];
    return data.monthlySales.map(item => ({
      label: item.month,
      value: item.revenue, // Use revenue as the value
      // Add optional fields if needed
    }));
  };

  const transformTopProductsData = (): TableChartData => {
    if (!data?.topSalesProducts) return [];
    return data.topSalesProducts.map(item => ({
      label: item.product,
      value: item.revenue, // Use revenue as the value      
    }));
  };

  const transformCategoryData = (): PieChartData => {
    if (!data?.topSalesCategories) return [];
    return data.topSalesCategories.map(item => ({
      _id: item.category, // Use category as _id
      totalSales: item.value
    }));
  };

  if (!data || isPending)
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Key metrics and performance indicators</p>
          </div>
          <Skeleton className="h-12 w-64" />
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
                <Skeleton className="h-8 w-24 mt-4" />
                <Skeleton className="h-4 w-32 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Skeletons */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Analytics for {formatDateTime(date!.from!).dateOnly} to {formatDateTime(date!.to!).dateOnly}
          </p>
        </div>
        <CalendarDateRangePicker defaultDate={date} setDate={setDate} />
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                Total Revenue
              </CardTitle>
              <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                <BadgeDollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                <ProductPrice price={data.totalSales} plain />
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  +12.5% from last period
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/10 dark:to-green-800/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">
                Total Orders
              </CardTitle>
              <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                <CreditCard className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatNumber(data.ordersCount)}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  +8.2% from last period
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                Customers
              </CardTitle>
              <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatNumber(data.usersCount)}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  +15.3% from last period
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/10 dark:to-orange-800/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                Products
              </CardTitle>
              <div className="p-2 bg-orange-100 dark:bg-orange-800/30 rounded-lg">
                <Barcode className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatNumber(data.productsCount)}
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  +5.7% from last period
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Sales Overview
            </CardTitle>
            <CardDescription>
              Revenue trends and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesAreaChart data={transformSalesChartData()} />
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BadgeDollarSign className="h-5 w-5 text-green-600" />
              Revenue Analytics
            </CardTitle>
            <CardDescription>Monthly performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <TableChart data={transformMonthlySalesData()} labelType='month' />
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Barcode className="h-5 w-5 text-purple-600" />
              Product Performance
            </CardTitle>
            <CardDescription>
              Top performing products by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TableChart data={transformTopProductsData()} labelType='product' />
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-orange-600" />
              Category Distribution
            </CardTitle>
            <CardDescription>Sales by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesCategoryPieChart data={transformCategoryData()} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Sales */}
      <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-slate-600" />
            Recent Transactions
          </CardTitle>
          <CardDescription>Latest orders and customer activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-slate-200/50 dark:border-b-slate-700/50">
                <TableHead className="font-semibold text-slate-900 dark:text-white">Customer</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-white">Date</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-white">Amount</TableHead>
                <TableHead className="font-semibold text-slate-900 dark:text-white text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.latestOrders.map((order: IOrderList) => (
                <TableRow key={order._id} className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {order.user ? order.user.name : 'Deleted User'}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">
                    {formatDateTime(order.createdAt).dateOnly}
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-green-600">
                      <ProductPrice price={order.totalPrice} plain />
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link 
                      href={`/admin/orders/${order._id}`}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
