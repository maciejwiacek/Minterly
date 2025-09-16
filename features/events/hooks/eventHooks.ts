import { createClient } from '@/lib/supabase/client'
import { useQuery } from '@tanstack/react-query'

const supabase = createClient()

const fetchEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
    throw new Error('Failed to fetch events')
  }

  return data
}

export const useFetchEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  })
}
