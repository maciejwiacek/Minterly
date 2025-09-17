import { SupabaseClient } from '@supabase/supabase-js'
import { CreateEventData, Event } from '../types/event'

export const fetchEvents = async (
  supabase: SupabaseClient
): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true })
  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`)
  }
  return data || []
}

export const insertEvent = async (
  supabase: SupabaseClient,
  eventData: CreateEventData
): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .insert(eventData)
    .select()
  if (error) {
    throw new Error(`Failed to insert event: ${error.message}`)
  }
  return data || []
}
