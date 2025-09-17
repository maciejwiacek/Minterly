'use client'

import EventCard from '@/features/events/components/event-card'
import { useFetchEvents } from '@/features/events/hooks/eventHooks'
import React from 'react'

function Events() {
  const { data: events, isLoading, isError } = useFetchEvents()

  if (isLoading) {
    return <div>Loading events...</div>
  }

  if (isError) {
    return <div>Error loading events. Please try again later.</div>
  }

  return (
    <div className='space-y-16'>
      <h1 className='text-5xl font-light text-center'>Your Events</h1>

      <div className='space-y-8'>
        {events && events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <div>No events found.</div>
        )}
      </div>
    </div>
  )
}

export default Events
