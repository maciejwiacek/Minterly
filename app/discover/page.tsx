'use client'

import { useInsertEvent } from '@/features/events/hooks/eventHooks'
import { useAuth } from '@clerk/nextjs'
import React from 'react'

function Discover() {
  const { userId } = useAuth()
  const { mutate: createEvent, isPending } = useInsertEvent()

  const handleCreateEvent = () => {
    if (!userId) {
      alert('You must be logged in to create an event.')
      return
    }

    createEvent({
      name: 'Test Event',
      description: 'Test Description',
      start_date: new Date().toISOString(),
      max_attendees: 10,
    })
  }

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-6'>Discover Events</h1>
      <div className='space-y-4'>
        <button
          onClick={handleCreateEvent}
          disabled={isPending}
          className='px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 disabled:opacity-50 transition-all duration-200'
        >
          {isPending ? 'Creating Event...' : 'Create Example Event'}
        </button>
      </div>
    </div>
  )
}

export default Discover
