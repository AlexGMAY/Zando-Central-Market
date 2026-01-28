// 'use client'

// import ProductPrice from '@/components/shared/product/product-price'
// import { Card, CardContent } from '@/components/ui/card'
// import useColorStore from '@/hooks/use-color-store'
// import { formatDateTime } from '@/lib/utils'
// import { useTheme } from 'next-themes'
// import React from 'react'
// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   TooltipProps,
//   XAxis,
//   YAxis,
// } from 'recharts'
// import { TrendingUp, Calendar, DollarSign } from 'lucide-react'

// interface CustomTooltipProps extends TooltipProps<number, string> {
//   active?: boolean
//   payload?: Array<{ payload: { value: number }; value: number }>
//   label?: string
// }

// const CustomTooltip: React.FC<CustomTooltipProps> = ({
//   active,
//   payload,
//   label,
// }) => {
//   if (active && payload && payload.length) {
//     return (
//       <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
//         <CardContent className="p-4 space-y-2">
//           <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
//             <Calendar className="w-4 h-4" />
//             <span>{label && formatDateTime(new Date(label)).dateOnly}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <DollarSign className="w-5 h-5 text-green-500" />
//             <p className="text-2xl font-bold text-slate-900 dark:text-white">
//               <ProductPrice price={payload[0].value} plain />
//             </p>
//           </div>
//           <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
//             <TrendingUp className="w-3 h-3" />
//             <span>+12.5% from previous period</span>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }
//   return null
// }

// const CustomXAxisTick = (props: any) => {
//   const { x, y, payload } = props;
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text 
//         x={0}
//         y={0}
//         dy={16}
//         textAnchor="middle"
//         fill="currentColor"
//         className="text-xs fill-slate-500 dark:fill-slate-400"
//       >
//         {formatDateTime(new Date(payload.value)).dateOnly}
//       </text>
//     </g>
//   )
// }

// const CustomYAxisTick = (props: any) => {
//   const { x, y, payload } = props;
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text 
//         x={-10}
//         y={0}
//         textAnchor="end"
//         fill="currentColor"
//         className="text-xs fill-slate-500 dark:fill-slate-400"
//       >
//         ${payload.value}
//       </text>
//     </g>
//   )
// }

// const STROKE_COLORS: { [key: string]: { [key: string]: string } } = {
//   Red: { 
//     light: '#dc2626', 
//     dark: '#ef4444',
//   },
//   Green: { 
//     light: '#059669', 
//     dark: '#10b981',
//   },
//   Gold: { 
//     light: '#d97706', 
//     dark: '#f59e0b',
//   },
//   Blue: { 
//     light: '#2563eb', 
//     dark: '#3b82f6',
//   },
//   Purple: { 
//     light: '#7c3aed', 
//     dark: '#8b5cf6',
//   },
// }

// interface SalesAreaChartProps {
//   data: Array<{ date: string; totalSales: number }>
// }

// export default function SalesAreaChart({ data }: SalesAreaChartProps) {
//   const { theme } = useTheme()
//   const { color } = useColorStore(theme)
//   const currentTheme = theme || 'light'
  
//   const strokeColor = STROKE_COLORS[color.name]?.[currentTheme] || STROKE_COLORS.Blue[currentTheme]
//   const fillColor = currentTheme === 'dark' ? '#1e3a8a' : '#dbeafe'

//   return (
//     <div className="w-full h-[400px] relative">
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
//           <defs>
//             <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor={strokeColor} stopOpacity={0.8}/>
//               <stop offset="100%" stopColor={fillColor} stopOpacity={0.1}/>
//             </linearGradient>
//           </defs>
          
//           <CartesianGrid 
//             strokeDasharray="3 3" 
//             stroke="#e2e8f0" 
//             strokeOpacity={0.5}
//             vertical={false}
//             horizontal={true}
//           />
          
//           <XAxis 
//             dataKey="date" 
//             tick={<CustomXAxisTick />}
//             axisLine={{ stroke: '#e2e8f0', strokeOpacity: 0.5 }}
//             tickLine={false}
//             interval="preserveStartEnd"
//             minTickGap={50}
//           />
          
//           <YAxis 
//             tick={<CustomYAxisTick />}
//             axisLine={{ stroke: '#e2e8f0', strokeOpacity: 0.5 }}
//             tickLine={false}
//             tickCount={6}
//             fontSize={12}
//           />
          
//           <Tooltip 
//             content={<CustomTooltip />}
//             cursor={{
//               stroke: '#94a3b8',
//               strokeWidth: 1,
//               strokeDasharray: '5 5',
//             }}
//           />
          
//           <Area
//             type="monotone"
//             dataKey="totalSales"
//             stroke={strokeColor}
//             strokeWidth={3}
//             fill="url(#salesGradient)"
//             fillOpacity={0.8}
//             dot={{
//               fill: strokeColor,
//               strokeWidth: 2,
//               stroke: '#ffffff',
//               r: 4,
//             }}
//             activeDot={{
//               fill: strokeColor,
//               stroke: '#ffffff',
//               strokeWidth: 3,
//               r: 6,
//             }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
      
//       {/* Chart watermark */}
//       <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
//         <TrendingUp className="w-3 h-3" />
//         <span>Live Sales Data</span>
//       </div>
//     </div>
//   )
// }


'use client'

import ProductPrice from '@/components/shared/product/product-price'
import { Card, CardContent } from '@/components/ui/card'
import useColorStore from '@/hooks/use-color-store'
import { formatDateTime } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { TrendingUp, Calendar, DollarSign } from 'lucide-react'

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: Array<{ payload: { value: number }; value: number }>
  label?: string
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="w-4 h-4" />
            <span>{label && formatDateTime(new Date(label)).dateOnly}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              <ProductPrice price={payload[0].value} plain />
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
            <TrendingUp className="w-3 h-3" />
            <span>+12.5% from previous period</span>
          </div>
        </CardContent>
      </Card>
    )
  }
  return null
}

// Define proper interfaces for Recharts tick props
interface TickProps {
  x: number;
  y: number;
  payload: {
    value: string | number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const CustomXAxisTick: React.FC<TickProps> = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="currentColor"
        className="text-xs fill-slate-500 dark:fill-slate-400"
      >
        {formatDateTime(new Date(payload.value as string)).dateOnly}
      </text>
    </g>
  )
}

const CustomYAxisTick: React.FC<TickProps> = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={-10}
        y={0}
        textAnchor="end"
        fill="currentColor"
        className="text-xs fill-slate-500 dark:fill-slate-400"
      >
        ${payload.value}
      </text>
    </g>
  )
}

const STROKE_COLORS: { [key: string]: { [key: string]: string } } = {
  Red: { 
    light: '#dc2626', 
    dark: '#ef4444',
  },
  Green: { 
    light: '#059669', 
    dark: '#10b981',
  },
  Gold: { 
    light: '#d97706', 
    dark: '#f59e0b',
  },
  Blue: { 
    light: '#2563eb', 
    dark: '#3b82f6',
  },
  Purple: { 
    light: '#7c3aed', 
    dark: '#8b5cf6',
  },
}

interface SalesAreaChartProps {
  data: Array<{ date: string; totalSales: number }>
}

export default function SalesAreaChart({ data }: SalesAreaChartProps) {
  const { theme } = useTheme()
  const { color } = useColorStore(theme)
  const currentTheme = theme || 'light'
  
  const strokeColor = STROKE_COLORS[color.name]?.[currentTheme] || STROKE_COLORS.Blue[currentTheme]
  const fillColor = currentTheme === 'dark' ? '#1e3a8a' : '#dbeafe'

  return (
    <div className="w-full h-[400px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.8}/>
              <stop offset="100%" stopColor={fillColor} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            strokeOpacity={0.5}
            vertical={false}
            horizontal={true}
          />
          
          <XAxis 
            dataKey="date" 
            tick={<CustomXAxisTick x={0} y={0} payload={{
              value: ''
            }} />}
            axisLine={{ stroke: '#e2e8f0', strokeOpacity: 0.5 }}
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          
          <YAxis 
            tick={<CustomYAxisTick x={0} y={0} payload={{
              value: ''
            }} />}
            axisLine={{ stroke: '#e2e8f0', strokeOpacity: 0.5 }}
            tickLine={false}
            tickCount={6}
            fontSize={12}
          />
          
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{
              stroke: '#94a3b8',
              strokeWidth: 1,
              strokeDasharray: '5 5',
            }}
          />
          
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={strokeColor}
            strokeWidth={3}
            fill="url(#salesGradient)"
            fillOpacity={0.8}
            dot={{
              fill: strokeColor,
              strokeWidth: 2,
              stroke: '#ffffff',
              r: 4,
            }}
            activeDot={{
              fill: strokeColor,
              stroke: '#ffffff',
              strokeWidth: 3,
              r: 6,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Chart watermark */}
      <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
        <TrendingUp className="w-3 h-3" />
        <span>Live Sales Data</span>
      </div>
    </div>
  )
}
