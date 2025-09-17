import { Calendar, MapPin, User, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Event } from '../types/event'

interface EventCardProps {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  // Calculate spots remaining (assuming no attendees table for now)
  const spotsRemaining = event.max_attendees - 0 // TODO: Calculate actual spots taken

  // Format the date
  const formattedDate = new Date(event.start_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <Card className='w-full bg-card/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10'>
      <CardContent className='p-12'>
        <div className='flex items-center gap-16'>
          {/* Left side - Large circular image */}
          <div className='flex-shrink-0 relative'>
            <Avatar className='w-40 h-40 ring-2 ring-white/10 ring-offset-4 ring-offset-background'>
              <AvatarImage src={''} alt={event.name} className='object-cover' />
              <AvatarFallback className='text-5xl font-light bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 text-white'>
                {event.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {/* Subtle glow effect */}
            <div className='absolute inset-0 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10' />
          </div>

          {/* Right side - Event details */}
          <div className='flex-1 space-y-8'>
            {/* Category and Title */}
            <div className='space-y-4'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20'>
                <span className='text-sm font-medium text-cyan-400 uppercase tracking-wider'>
                  Event
                </span>
              </div>

              <h2 className='text-4xl font-light text-foreground leading-tight tracking-tight'>
                {event.name}
              </h2>

              {event.description && (
                <p className='text-muted-foreground/80 text-lg leading-relaxed max-w-2xl'>
                  {event.description}
                </p>
              )}
            </div>

            {/* Event details grid */}
            <div className='grid grid-cols-2 gap-8'>
              {/* Date */}
              <div className='flex items-center gap-4 text-base'>
                <Calendar className='w-5 h-5 text-muted-foreground' />
                <div>
                  <span className='text-xs text-muted-foreground uppercase tracking-wide block'>
                    Date
                  </span>
                  <span className='text-foreground font-light'>
                    {formattedDate}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className='flex items-center gap-4 text-base'>
                <MapPin className='w-5 h-5 text-muted-foreground' />
                <div>
                  <span className='text-xs text-muted-foreground uppercase tracking-wide block'>
                    Location
                  </span>
                  <span className='text-foreground font-light'>
                    {event.user_id || 'No location provided'}
                  </span>
                </div>
              </div>

              {/* Organizer */}
              <div className='flex items-center gap-4 text-base'>
                <User className='w-5 h-5 text-muted-foreground' />
                <div>
                  <span className='text-xs text-muted-foreground uppercase tracking-wide block'>
                    Organizer
                  </span>
                  <span className='text-foreground font-light'>
                    {event.user_id || 'No organizer provided'}
                  </span>
                </div>
              </div>

              {/* Spots available */}
              <div className='flex items-center gap-4 text-base'>
                <Users className='w-5 h-5 text-muted-foreground' />
                <div>
                  <span className='text-xs text-muted-foreground uppercase tracking-wide block'>
                    Availability
                  </span>
                  <span className='text-foreground font-light'>
                    {spotsRemaining} spots available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard
