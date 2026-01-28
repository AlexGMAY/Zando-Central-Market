'use client'

import useColorStore from '@/hooks/use-color-store'
import { useTheme } from 'next-themes'
import React from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts'
import { PieChart as PieChartIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface PieChartData {
  _id: string
  totalSales: number
  value?: number
}

interface CustomLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  index: number
}

interface TooltipPayload {
  color: string;
  payload: PieChartData;
  value: number;
  percent?: number;
  [key: string]: unknown;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

const COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card className="border-slate-200 dark:border-slate-700 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: payload[0].color }}
            />
            <p className="font-semibold text-slate-900 dark:text-white">
              {data._id}
            </p>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Sales: <span className="font-bold text-slate-900 dark:text-white">{data.totalSales}</span>
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {payload[0].percent && `${(payload[0].percent * 100).toFixed(1)}% of total`}
          </p>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export default function SalesCategoryPieChart({ data }: { data: PieChartData[] }) {
  const { theme } = useTheme()
  useColorStore(theme) // Only destructure what you need
 // Only destructure what you need
  const isDark = theme === 'dark'

  const RADIAN = Math.PI / 180
  
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: CustomLabelProps) => {
    if (data[index].totalSales === 0) return null

    const radius = innerRadius + (outerRadius - innerRadius) * 0.7
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className={`text-xs font-medium ${isDark ? 'fill-slate-200' : 'fill-slate-800'}`}
      >
        {data[index]._id}
      </text>
    )
  }

  const totalSales = data.reduce((sum, item) => sum + item.totalSales, 0)

  return (
    <div className="w-full h-[400px] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Sales by Category
          </h3>
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Total: {totalSales} sales
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="totalSales"
            nameKey="_id"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
                stroke={isDark ? '#1e293b' : '#ffffff'}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value) => (
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {value}
              </span>
            )}
            iconSize={10}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="font-semibold text-slate-900 dark:text-white">
            {data.length}
          </div>
          <div className="text-slate-600 dark:text-slate-400">Categories</div>
        </div>
        <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="font-semibold text-slate-900 dark:text-white">
            {Math.max(...data.map(item => item.totalSales))}
          </div>
          <div className="text-slate-600 dark:text-slate-400">Top Category</div>
        </div>
      </div>
    </div>
  )
}
