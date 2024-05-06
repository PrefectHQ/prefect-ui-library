<template>
  <p-combobox v-model="internalValue" v-bind="{ options, multiple }" :empty-message="emptyMessage ?? 'All events'" allow-unknown-value>
    <template #combobox-options-empty>
      No events
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { endOfHour, subWeeks } from 'date-fns'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
    emptyMessage?: string,
    filter?: WorkspaceEventsFilter,
    multiple?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emit('update:selected', value)
    },
  })

  const api = useWorkspaceApi()
  const defaultUntil = endOfHour(new Date())
  const defaultSince = subWeeks(defaultUntil, 1)
  const filter = computed<WorkspaceEventsFilter>(() => ({
    ...props.filter,
    occurred: {
      since: defaultSince,
      until: defaultUntil,
      ...props.filter?.occurred,
    },
  }))
  const eventsSubscription = useSubscription(api.events.getEventsCount, ['event', filter])
  const events = computed(() => eventsSubscription.response ?? [])

  function getEventPrefixValues(values: string[]): string[] {
    const prefixes = new Set<string>()

    values.forEach(value => {
      const parts = value.split('.')

      for (let index = 1; index < parts.length; index++) {
        const prefix = parts.slice(0, index).join('.')

        prefixes.add(prefix)
      }
    })

    return Array.from(prefixes).filter(prefix => {
      const matches = values.filter(value => value.startsWith(`${prefix}.`)).length

      return matches > 1 && matches < values.length
    }).map(value => `${value}.*`)
  }

  const options = computed<SelectOption[]>(() => {
    const values = events.value.map(event => event.label)
    const prefixes = getEventPrefixValues(values)
    const allEventNames = [...values, ...prefixes].sort(sortAlphabetically)

    return allEventNames.map(event => {
      return {
        value: event,
        label: event,
      }
    })
  })

  function sortAlphabetically(optionA: string, optionB: string): number {
    return optionA.localeCompare(optionB)
  }
</script>