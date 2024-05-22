import { useRouteQueryParam } from '@prefecthq/vue-compositions'
import { secondsInWeek } from 'date-fns/constants'
import { computed, ref, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapper } from '@/services/Mapper'
import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'
import { formatDateTimeNumeric, dateFunctions, parseDateTimeNumeric } from '@/utilities'

type UseWorkspaceEventsFilterArgs = {
  limit?: number,
  startDate?: Ref<Date> | Date,
  endDate?: Ref<Date> | Date,
  workspaces?: Ref<string[]> | string[],
  users?: Ref<string[]> | string[],
  events?: Ref<string[]> | string[],
  eventId?: Ref<string[]> | string[],
}

export function useWorkspaceEventsFilter(filters: UseWorkspaceEventsFilterArgs): Ref<WorkspaceEventsFilter> {

  const limit = ref(filters.limit)
  const startDate = ref(filters.startDate)
  const endDate = ref(filters.endDate)
  const workspaces = ref(filters.workspaces)
  const users = ref(filters.users)
  const events = ref(filters.events)
  const eventId = ref(filters.eventId)

  return computed<WorkspaceEventsFilter>(() => {
    const { startDate: since, endDate: until } = mapper.map('DateRangeSelectValue', { type: 'span', seconds: -secondsInWeek }, 'DateRange')

    const response: WorkspaceEventsFilter = {
      occurred: {
        since,
        until,
      },
    }

    if (limit.value) {
      response.limit = limit.value
    }

    if (startDate.value) {
      response.occurred.since = startDate.value
    }

    if (endDate.value) {
      response.occurred.until = endDate.value
    }

    if (workspaces.value) {
      response.scope ??= {}

      response.scope.workspace = workspaces.value
    }

    if (users.value) {
      response.related ??= {}

      const userList = ref<string[][]>([])
      users.value.forEach(user => userList.value.push([user, 'actor']))

      response.related.resourcesInRoles = userList.value
      response.related.role = ['actor']
    }

    if (events.value) {
      response.event ??= {}

      response.event.name = events.value
    }

    if (eventId.value) {
      response.id ??= {}

      response.id.id = eventId.value
    }

    return response
  })
}


type AuditLogFiltersInRoute = {
  'start-date'?: string,
  'end-date'?: string,
  'workspaces'?: string[],
  'users'?: string[],
  'events'?: string[],
}

type EventFilters = {
  startDate?: Date,
  endDate?: Date,
  workspaces?: string[],
  users?: string[],
  events?: string[],
}

type UseWorkspaceEventsFilterFromRoute = {
  startDate: Ref<Date>,
  endDate: Ref<Date>,
  workspaces: Ref<string[]>,
  users: Ref<string[]>,
  events: Ref<string[]>,
  filter: Ref<WorkspaceEventsFilter>,
  hasFilters: Ref<boolean>,
  setFilters: (filters: EventFilters) => Promise<void>,
  updateFilters: (filters: EventFilters) => Promise<void>,
  clearFilters: () => Promise<void>,
}

export function useWorkspaceEventsFilterFromRoute(): UseWorkspaceEventsFilterFromRoute {
  const router = useRouter()
  const route = useRoute()

  const defaultStartDate = formatDateTimeNumeric(dateFunctions.subDays(dateFunctions.startOfToday(), 7))
  const startDateParam = useRouteQueryParam('start-date', defaultStartDate)

  const startDate = computed({
    get() {
      return parseDateTimeNumeric(startDateParam.value)
    },
    set(value) {
      startDateParam.value = formatDateTimeNumeric(value)
    },
  })

  const defaultEndDate = formatDateTimeNumeric(dateFunctions.addDays(dateFunctions.endOfToday(), 1))
  const endDateParam = useRouteQueryParam('end-date', defaultEndDate)

  const endDate = computed({
    get() {
      return parseDateTimeNumeric(endDateParam.value)
    },
    set(value) {
      endDateParam.value = formatDateTimeNumeric(value)
    },
  })

  const workspaces = useRouteQueryParam('workspaces', [])

  const users = useRouteQueryParam('users', [])

  const events = useRouteQueryParam('events', [])

  const filter = useWorkspaceEventsFilter({ startDate, endDate, workspaces, users, events })

  const hasFilters = computed(() => {
    return !!workspaces.value.length ||
      !!users.value.length ||
      !!events.value.length ||
      startDateParam.value !== defaultStartDate ||
      endDateParam.value !== defaultEndDate
  })

  function getQuery(filters: EventFilters): AuditLogFiltersInRoute {
    const query: AuditLogFiltersInRoute = {}

    if (filters.startDate) {
      const formatted = formatDateTimeNumeric(filters.startDate)

      if (formatted !== defaultStartDate) {
        query['start-date'] = formatted
      }
    }

    if (filters.endDate) {
      const formatted = formatDateTimeNumeric(filters.endDate)

      if (formatted !== defaultEndDate) {
        query['end-date'] = formatted
      }
    }

    return query
  }

  async function setFilters(filters: EventFilters): Promise<void> {
    const query = getQuery(filters)

    await router.push({ query })
  }

  async function updateFilters(filters: EventFilters): Promise<void> {
    const query = getQuery(filters)

    await router.push({ query: { ...route.query, ...query } })
  }

  async function clearFilters(): Promise<void> {
    await router.push({ query: {} })
  }

  return {
    startDate,
    endDate,
    workspaces,
    users,
    events,
    filter,
    hasFilters,
    setFilters,
    updateFilters,
    clearFilters,
  }
}

export type useTimeScopedWorkspaceEventsFilterArgs = Omit<UseWorkspaceEventsFilterArgs, 'endDate'>

export function useTimeScopedWorkspaceEventsFilter(filters: useTimeScopedWorkspaceEventsFilterArgs): Ref<WorkspaceEventsFilter> {
  const refs = { ...filters }
  const startDate = ref(refs.startDate ? refs.startDate : dateFunctions.startOfToday())
  const endDate = ref(dateFunctions.addDays(startDate.value, 1))

  return useWorkspaceEventsFilter({ endDate, ...refs })
}