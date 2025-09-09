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
import { DateTimePicker } from '@/components/ui/datetime-picker'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Upload,
  Calendar as CalendarIcon,
  MapPin,
  Users,
  DollarSign,
  Plus,
  X,
} from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// Zod validation schema
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Event name is required')
      .min(3, 'Event name must be at least 3 characters'),
    description: z
      .string()
      .min(1, 'Description is required')
      .min(10, 'Description must be at least 10 characters'),
    startDateTime: z
      .date()
      .nullable()
      .refine((date) => date !== null, {
        message: 'Start date and time is required',
      }),
    endDateTime: z
      .date()
      .nullable()
      .refine((date) => date !== null, {
        message: 'End date and time is required',
      }),
    location: z.string().min(1, 'Location is required'),
    maxAttendees: z.string().optional(),
    ticketPrice: z.enum(['free', 'paid']),
    organizers: z
      .array(
        z.object({
          name: z.string().min(1, 'Organizer name is required'),
        })
      )
      .min(1, 'At least one organizer is required'),
    eventImage: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startDateTime && data.endDateTime) {
        return data.endDateTime > data.startDateTime
      }
      return true
    },
    {
      message: 'End date must be after start date',
      path: ['endDateTime'],
    }
  )

type FormValues = z.infer<typeof formSchema>

function CreateEvent() {
  const [eventImage, setEventImage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      startDateTime: null,
      endDateTime: null,
      location: '',
      maxAttendees: '',
      ticketPrice: 'free',
      organizers: [{ name: '' }],
      eventImage: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'organizers',
  })

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setEventImage(result)
        form.setValue('eventImage', result)
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
    append({ name: '' })
  }

  const removeOrganizer = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  const onSubmit = (values: FormValues) => {
    const eventData = {
      ...values,
      eventImage,
    }

    console.log('Event Data:', eventData)
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12'>
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
                    <Avatar className='w-48 h-48 ring-2 ring-white/10 ring-offset-4 ring-offset-background'>
                      <AvatarImage
                        src={eventImage || undefined}
                        alt='Event thumbnail'
                      />
                      <AvatarFallback className='text-6xl font-light bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white'>
                        <Upload className='w-16 h-16' />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Upload Area */}
                  <div className='flex-1 w-full'>
                    <div
                      className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 cursor-pointer ${
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
                      <Upload className='w-16 h-16 mx-auto mb-6 text-muted-foreground' />
                      <p className='text-xl font-light mb-3'>
                        Drop your POAP thumbnail here
                      </p>
                      <p className='text-base text-muted-foreground mb-6'>
                        or click to browse files
                      </p>
                      <p className='text-sm text-muted-foreground'>
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
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-medium'>
                        Event Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Enter your event name'
                          className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-lg'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Event Description */}
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-medium'>
                        Description *
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder='Describe your event in detail...'
                          className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 min-h-32 text-base'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Event Start and End DateTime */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                  {/* Start Date & Time */}
                  <FormField
                    control={form.control}
                    name='startDateTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-medium flex items-center gap-2'>
                          <CalendarIcon className='w-4 h-4 text-cyan-400' />
                          Start Date & Time *
                        </FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder='Pick start date and time'
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Date & Time */}
                  <FormField
                    control={form.control}
                    name='endDateTime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-medium flex items-center gap-2'>
                          <CalendarIcon className='w-4 h-4 text-cyan-400' />
                          End Date & Time *
                        </FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={field.value || undefined}
                            onChange={field.onChange}
                            placeholder='Pick end date and time'
                            disabled={(date) => {
                              const today = new Date(
                                new Date().setHours(0, 0, 0, 0)
                              )
                              const startDate = form.getValues('startDateTime')
                              if (startDate) {
                                return date < startDate
                              }
                              return date < today
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Location */}
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-medium flex items-center gap-2'>
                        <MapPin className='w-4 h-4 text-cyan-400' />
                        Location *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Event venue or address'
                          className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-base'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                {fields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={form.control}
                    name={`organizers.${index}.name`}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <div className='flex gap-3'>
                          <FormControl>
                            <Input
                              {...inputField}
                              placeholder={`Organizer ${index + 1} name`}
                              className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-base'
                            />
                          </FormControl>
                          {fields.length > 1 && (
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <FormField
                    control={form.control}
                    name='maxAttendees'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-medium flex items-center gap-2'>
                          <Users className='w-4 h-4 text-cyan-400' />
                          Max Attendees
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type='number'
                            placeholder='Leave empty for unlimited'
                            className='bg-neutral-800/50 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 h-12 text-base'
                            min='1'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Ticket Price */}
                  <FormField
                    control={form.control}
                    name='ticketPrice'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base font-medium flex items-center gap-2'>
                          <DollarSign className='w-4 h-4 text-cyan-400' />
                          Ticket Price
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className='bg-neutral-800/50 border-white/20 text-white hover:bg-neutral-700/50 hover:border-white/30 h-12 text-base'>
                              <SelectValue placeholder='Select ticket type' />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
        </Form>
      </div>
    </div>
  )
}

export default CreateEvent
