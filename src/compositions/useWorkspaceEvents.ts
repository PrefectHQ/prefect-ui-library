import { SubscriptionOptions, UseSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import merge from 'lodash.merge'
import { computed, ComputedRef, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceEvent } from '@/models/workspaceEvent'
import { WorkspaceEventsApi } from '@/services/workspaceEventsApi'
import { Getter } from '@/types/reactivity'
import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'

export type UseWorkspaceEvents = {
  events: ComputedRef<WorkspaceEvent[]>,
  subscription: UseSubscription<WorkspaceEventsApi['getEvents']>,
}

export function useWorkspaceEvents(filter: MaybeRefOrGetter<WorkspaceEventsFilter | null | undefined>, options?: SubscriptionOptions): UseWorkspaceEvents {
  const api = useWorkspaceApi()

  const parameters: Getter<[WorkspaceEventsFilter] | null> = () => {
    const value = toValue(filter)

    if (!value) {
      return null
    }

    return [merge({}, value)]
  }

  const parametersRef = toRef(parameters)
  const subscription = useSubscriptionWithDependencies(api.events.getEvents, parametersRef, options)
  const events = computed(() => subscription.response?.events ?? [])

  return {
    subscription,
    events,
  }
}