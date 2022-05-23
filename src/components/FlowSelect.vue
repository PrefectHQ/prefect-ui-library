<template>
  <p-select v-model="model" :options="flowOptions" class="flow-select" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, withDefaults } from 'vue'
  import { flowsApiKey } from '@/services'
  import { UnionFilters } from '@/types/UnionFilters'
  import { inject } from '@/utilities'

  const props = withDefaults(defineProps<{
    selected: string | null | undefined,
    filter?: UnionFilters,
  }>(), {
    filter: () => ({}),
  })

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? ''
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })

  const flowsApi = inject(flowsApiKey)
  const flowsSubscription = useSubscription(flowsApi.getFlows, [props.filter])
  const flows = computed(() => flowsSubscription.response ?? [])
  const flowOptions = computed(() => flows.value.map(({ name, id }) => ({ label: name, value: id })))
</script>