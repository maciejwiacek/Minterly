import React from 'react'
import EventCard from '@/components/event-card'

function Events() {
  return (
    <div className='space-y-16'>
      <h1 className='text-5xl font-light text-center'>Your Events</h1>

      <div className='space-y-8'>
        <EventCard
          title='Web Development Workshop'
          description='Master modern web development with React, Next.js, and cutting-edge tools in this comprehensive workshop.'
          location='Tech Hub, Downtown'
          date='March 15, 2024'
          organizer='Sarah Johnson'
          spotsTaken={18}
          totalSpots={25}
          category='Development'
          imageUrl='https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=300&fit=crop&crop=center'
        />

        <EventCard
          title='Startup Networking Night'
          description='Connect with entrepreneurs, investors, and innovators who are shaping the future of technology and business.'
          location='Innovation Center'
          date='March 20, 2024'
          organizer='Mike Chen'
          spotsTaken={47}
          totalSpots={50}
          category='Networking'
        />

        <EventCard
          title='AI & Machine Learning Conference'
          description='Explore the cutting-edge frontiers of artificial intelligence and machine learning with industry experts.'
          location='Convention Center'
          date='March 25, 2024'
          organizer='Dr. Emily Rodriguez'
          spotsTaken={145}
          totalSpots={150}
          category='Technology'
        />
      </div>
    </div>
  )
}

export default Events
