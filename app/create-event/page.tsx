'use client'
import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Upload,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  DollarSign,
  Plus,
  X,
} from 'lucide-react'
import { format } from 'date-fns'

function CreateEvent() {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: undefined as Date | undefined,
    location: '',
    maxAttendees: '',
    ticketPrice: 'free',
  })

  const [organizers, setOrganizers] = useState<string[]>([''])
  const [eventImage, setEventImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEventImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const addOrganizer = () => {
    setOrganizers([...organizers, ''])
  }

  const removeOrganizer = (index: number) => {
    if (organizers.length > 1) {
      setOrganizers(organizers.filter((_, i) => i !== index))
    }
  }

  const updateOrganizer = (index: number, value: string) => {
    const newOrganizers = [...organizers]
    newOrganizers[index] = value
    setOrganizers(newOrganizers)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Event Data:', { ...eventData, organizers, eventImage })
    // Handle form submission
  }

  return (
    <div className='min-h-screen py-16'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-light tracking-tight mb-4'>
            Create Event
          </h1>
          <p className='text-muted-foreground text-lg'>
            Design your next unforgettable experience
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-12'>
          {/* Event Image Upload */}
          <Card className='bg-card/30 backdrop-blur-sm border border-white/10'>
            <CardHeader className='pb-8'>
              <CardTitle className='text-2xl font-light flex items-center gap-3'>
                <Upload className='w-6 h-6 text-cyan-400' />
                Event Thumbnail
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='flex flex-col lg:flex-row items-center gap-8'>
                {/* Image Preview */}
                <div className='flex-shrink-0'>
                  <Avatar className='w-32 h-32 ring-2 ring-white/10 ring-offset-4 ring-offset-background'>
                    <AvatarImage
                      src={eventImage || undefined}
                      alt='Event thumbnail'
                    />
                    <AvatarFallback className='text-4xl font-light bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white'>
                      <Upload className='w-12 h-12' />
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Upload Area */}
                <div className='flex-1 w-full'>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
                      dragActive
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className='w-12 h-12 mx-auto mb-4 text-muted-foreground' />
                    <p className='text-lg font-light mb-2'>
                      Drop your POAP thumbnail here
                    </p>
                    <p className='text-sm text-muted-foreground mb-4'>
                      or click to browse files
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Recommended: 500x500px PNG, circular design
                    </p>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      className='hidden'
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleImageUpload(e.target.files[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className='bg-card/30 backdrop-blur-sm border border-white/10'>
            <CardHeader className='pb-8'>
              <CardTitle className='text-2xl font-light'>
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-8'>
              {/* Event Name */}
              <div className='space-y-3'>
                <Label htmlFor='eventName' className='text-base font-medium'>
                  Event Name *
                </Label>
                <Input
                  id='eventName'
                  value={eventData.name}
                  onChange={(e) =>
                    setEventData({ ...eventData, name: e.target.value })
                  }
                  placeholder='Enter your event name'
                  className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-lg'
                  required
                />
              </div>

              {/* Event Description */}
              <div className='space-y-3'>
                <Label
                  htmlFor='eventDescription'
                  className='text-base font-medium'
                >
                  Description *
                </Label>
                <Textarea
                  id='eventDescription'
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                  placeholder='Describe your event in detail...'
                  className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 min-h-32 text-base'
                  required
                />
              </div>

              {/* Date and Location Row */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Event Date */}
                <div className='space-y-3'>
                  <Label className='text-base font-medium flex items-center gap-2'>
                    <CalendarIcon className='w-4 h-4 text-cyan-400' />
                    Event Date *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        className='w-full justify-start text-left font-normal bg-neutral-800/50 border-white/20 hover:bg-neutral-700/50 hover:border-white/30 h-12 text-base'
                      >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {eventData.date
                          ? format(eventData.date, 'PPP')
                          : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0 bg-neutral-900 border-white/10'>
                      <Calendar
                        mode='single'
                        selected={eventData.date}
                        onSelect={(date) =>
                          setEventData({ ...eventData, date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Location */}
                <div className='space-y-3'>
                  <Label
                    htmlFor='location'
                    className='text-base font-medium flex items-center gap-2'
                  >
                    <MapPin className='w-4 h-4 text-cyan-400' />
                    Location *
                  </Label>
                  <Input
                    id='location'
                    value={eventData.location}
                    onChange={(e) =>
                      setEventData({ ...eventData, location: e.target.value })
                    }
                    placeholder='Event venue or address'
                    className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-base'
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizers */}
          <Card className='bg-card/30 backdrop-blur-sm border border-white/10'>
            <CardHeader className='pb-8'>
              <CardTitle className='text-2xl font-light flex items-center gap-3'>
                <Users className='w-6 h-6 text-cyan-400' />
                Organizers
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {organizers.map((organizer, index) => (
                <div key={index} className='flex gap-3'>
                  <Input
                    value={organizer}
                    onChange={(e) => updateOrganizer(index, e.target.value)}
                    placeholder={`Organizer ${index + 1} name`}
                    className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-base'
                    required={index === 0}
                  />
                  {organizers.length > 1 && (
                    <Button
                      type='button'
                      variant='outline'
                      size='icon'
                      onClick={() => removeOrganizer(index)}
                      className='h-12 w-12 border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40'
                    >
                      <X className='w-4 h-4' />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type='button'
                variant='outline'
                onClick={addOrganizer}
                className='w-full border-white/20 text-white hover:bg-white/5 hover:border-white/40 h-12'
              >
                <Plus className='w-4 h-4 mr-2' />
                Add Another Organizer
              </Button>
            </CardContent>
          </Card>

          {/* Event Settings */}
          <Card className='bg-card/30 backdrop-blur-sm border border-white/10'>
            <CardHeader className='pb-8'>
              <CardTitle className='text-2xl font-light'>
                Event Settings
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Max Attendees */}
                <div className='space-y-3'>
                  <Label
                    htmlFor='maxAttendees'
                    className='text-base font-medium flex items-center gap-2'
                  >
                    <Users className='w-4 h-4 text-cyan-400' />
                    Max Attendees
                  </Label>
                  <Input
                    id='maxAttendees'
                    type='number'
                    value={eventData.maxAttendees}
                    onChange={(e) =>
                      setEventData({
                        ...eventData,
                        maxAttendees: e.target.value,
                      })
                    }
                    placeholder='Leave empty for unlimited'
                    className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-base'
                    min='1'
                  />
                </div>

                {/* Ticket Price */}
                <div className='space-y-3'>
                  <Label className='text-base font-medium flex items-center gap-2'>
                    <DollarSign className='w-4 h-4 text-cyan-400' />
                    Ticket Price
                  </Label>
                  <Select
                    value={eventData.ticketPrice}
                    onValueChange={(value) =>
                      setEventData({ ...eventData, ticketPrice: value })
                    }
                  >
                    <SelectTrigger className='bg-neutral-800/50 border-white/20 text-white hover:bg-neutral-700/50 hover:border-white/30 h-12 text-base'>
                      <SelectValue placeholder='Select ticket type' />
                    </SelectTrigger>
                    <SelectContent className='bg-neutral-900 border-white/10'>
                      <SelectItem
                        value='free'
                        className='text-white hover:bg-neutral-800'
                      >
                        Free Event
                      </SelectItem>
                      <SelectItem
                        value='paid'
                        disabled
                        className='text-gray-500'
                      >
                        Paid Event (Coming Soon)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className='flex justify-center pt-8'>
            <Button
              type='submit'
              className='bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-none px-12 py-6 text-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25'
            >
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent
