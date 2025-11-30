'use client'

import * as React from 'react'
import { CalendarIcon, X, Check, ChevronDown } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn, formatDateTime } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { PopoverClose } from '@radix-ui/react-popover'
import { Badge } from '@/components/ui/badge'

export function CalendarDateRangePicker({
  defaultDate,
  setDate,
  className,
}: {
  defaultDate?: DateRange
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  className?: string
}) {
  const [calendarDate, setCalendarDate] = React.useState<DateRange | undefined>(
    defaultDate
  )

  const handleApply = () => {
    setDate(calendarDate)
  }

  const handleClear = () => {
    setCalendarDate(undefined)
    setDate(undefined)
  }

  const hasSelection = calendarDate?.from && calendarDate?.to

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'group relative h-12 w-full justify-between px-4 text-left font-normal transition-all duration-200',
              'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700',
              'hover:border-slate-300 dark:hover:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
              !calendarDate && 'text-slate-500 dark:text-slate-400'
            )}
          >
            <div className='flex items-center gap-3 flex-1 min-w-0'>
              <div className='flex items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors'>
                <CalendarIcon className='h-4 w-4 text-blue-600 dark:text-blue-400' />
              </div>
              
              <div className='flex flex-col min-w-0 flex-1'>
                <span className='text-sm font-medium text-slate-700 dark:text-slate-300 truncate'>
                  {calendarDate?.from ? (
                    calendarDate.to ? (
                      <>
                        {formatDateTime(calendarDate.from).dateOnly} - {formatDateTime(calendarDate.to).dateOnly}
                      </>
                    ) : (
                      formatDateTime(calendarDate.from).dateOnly
                    )
                  ) : (
                    'Select date range'
                  )}
                </span>
                <span className='text-xs text-slate-500 dark:text-slate-400 truncate'>
                  {hasSelection ? `${Math.ceil(((calendarDate.to?.getTime() || 0) - (calendarDate.from?.getTime() || 0)) / (1000 * 60 * 60 * 24))} days selected` : 'Choose start and end dates'}
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2 ml-2'>
              {hasSelection && (
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 text-xs px-2 py-1">
                  Selected
                </Badge>
              )}
              <ChevronDown className='h-4 w-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors' />
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent
          className='w-auto p-0 border-slate-200 dark:border-slate-700 shadow-xl bg-white dark:bg-slate-800'
          align='end'
          sideOffset={8}
        >
          {/* Calendar Section */}
          <div className='p-4 border-b border-slate-100 dark:border-slate-700'>
            <Calendar
              mode='range'
              defaultMonth={defaultDate?.from}
              selected={calendarDate}
              onSelect={setCalendarDate}
              numberOfMonths={2}
              className='rounded-md'
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-slate-900 dark:text-slate-100",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-slate-200 dark:border-slate-700 rounded-md flex items-center justify-center",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-slate-500 dark:text-slate-400 rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-50 dark:[&:has([aria-selected])]:bg-blue-900/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors",
                day_selected: "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700",
                day_today: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100",
                day_outside: "text-slate-400 dark:text-slate-600 opacity-50",
                day_disabled: "text-slate-400 dark:text-slate-600 opacity-50",
                day_range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-900 dark:aria-selected:bg-blue-900/30 dark:aria-selected:text-blue-100",
                day_hidden: "invisible",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50'>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={!hasSelection}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
            
            <div className="flex items-center gap-2">
              <PopoverClose asChild>
                <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-600">
                  Cancel
                </Button>
              </PopoverClose>
              <PopoverClose asChild>
                <Button 
                  onClick={handleApply}
                  disabled={!hasSelection}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400 transition-colors"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

