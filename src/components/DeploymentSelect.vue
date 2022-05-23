<template>
  <p-select v-model="model" :options="flowOptions" class="flow-select" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, withDefaults } from 'vue'
  import { deploymentsApiKey } from '@/services'
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

  const deploymentsApi = inject(deploymentsApiKey)
  const deploymentsSubscription = useSubscription(deploymentsApi.getDeployments, [props.filter])
  const deployments = computed(() => deploymentsSubscription.response ?? [])
  const flowOptions = computed(() => deployments.value.map(({ name, id }) => ({ label: name, value: id })))
</script>