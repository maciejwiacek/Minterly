export interface Event {
  id: number
  name: string
  description: string
  start_date: string
  max_attendees: number
  user_id: string
}

export interface CreateEventData {
  name: string
  description: string
  start_date: string
  max_attendees: number
}
