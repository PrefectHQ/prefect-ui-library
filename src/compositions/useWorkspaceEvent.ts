import { UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRefOrGetter, computed, toValue } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceEvent } from '@/models/workspaceEvent'
import { WorkspaceEventsApi } from '@/services/workspaceEventsApi'

export type UseWorkspaceEvent = {
  event: ComputedRef<WorkspaceEvent | undefined>,
  subscription: UseSubscription<WorkspaceEventsApi['getEvent']>,
}

export function useWorkspaceEvent(id: MaybeRefOrGetter<string | null | undefined>, occurred: MaybeRefOrGetter<Date | null | undefined>): UseWorkspaceEvent {
  const filter = computed<null | [string, Date]>(() => {
    const eventId = toValue(id)
    const eventDate = toValue(occurred)

    if (!eventId || !eventDate) {
      return null
    }

    return [eventId, eventDate]
  })

  const api = useWorkspaceApi()
  const subscription = useSubscriptionWithDependencies(api.events.getEvent, filter)
  const event = computed(() => subscription.response)

  return {
    event,
    subscription,
  }
}