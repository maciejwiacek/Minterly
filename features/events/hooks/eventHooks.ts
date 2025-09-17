import { useSupabaseClient } from '@/lib/supabase/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@clerk/nextjs'
import type { CreateEventData } from '../types/event'
import { fetchEvents, insertEvent } from './eventHooks.utils'

export const useFetchEvents = () => {
  const supabase = useSupabaseClient()

  return useQuery({
    queryKey: ['events'],
    queryFn: () => fetchEvents(supabase),
  })
}

export const useInsertEvent = () => {
  const supabase = useSupabaseClient()
  const { session, isLoaded } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['insertEvent'],
    mutationFn: (eventData: CreateEventData) => {
      if (!session || !isLoaded) {
        throw new Error('User must be authenticated to create events')
      }
      if (!session.user?.id) {
        throw new Error('User ID not available')
      }
      return insertEvent(supabase, eventData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}
