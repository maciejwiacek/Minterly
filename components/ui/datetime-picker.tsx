'use client'

import * as React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface DateTimePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: (date: Date) => boolean
  className?: string
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = 'Pick date and time',
  disabled,
  className,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value
  )
  const [timeValue, setTimeValue] = React.useState<string>(() => {
    if (value) {
      return format(value, 'HH:mm')
    }
    return ''
  })

  React.useEffect(() => {
    setSelectedDate(value)
    if (value) {
      setTimeValue(format(value, 'HH:mm'))
    } else {
      setTimeValue('')
    }
  }, [value])

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date && timeValue) {
      const [hours, minutes] = timeValue.split(':')
      const newDateTime = new Date(date)
      newDateTime.setHours(parseInt(hours), parseInt(minutes))
      onChange?.(newDateTime)
    } else if (date) {
      onChange?.(date)
    }
  }

  const handleTimeChange = (time: string) => {
    setTimeValue(time)
    if (selectedDate && time) {
      const [hours, minutes] = time.split(':')
      const newDateTime = new Date(selectedDate)
      newDateTime.setHours(parseInt(hours), parseInt(minutes))
      onChange?.(newDateTime)
    }
  }

  const displayValue = selectedDate
    ? `${format(selectedDate, 'PPP')}${timeValue ? ` at ${timeValue}` : ''}`
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal bg-neutral-800/50 border-white/20 hover:bg-neutral-700/50 hover:border-white/30 h-12 text-base',
            !selectedDate && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0 bg-neutral-900 border-white/10'
        align='start'
      >
        <div className='border border-white/10 rounded-lg overflow-hidden'>
          {/* Calendar Section */}
          <div className='p-3'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={disabled}
              initialFocus
            />
          </div>

          {/* Separator */}
          <div className='border-t border-white/10' />

          {/* Time Section */}
          <div className='p-3'>
            <div className='flex items-center gap-2 mb-2'>
              <Clock className='w-4 h-4 text-cyan-400' />
              <span className='text-sm font-medium text-white'>Time</span>
            </div>
            <Input
              type='time'
              value={timeValue}
              onChange={(e) => handleTimeChange(e.target.value)}
              className='bg-neutral-800/50 border-white/20 text-white h-10'
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
