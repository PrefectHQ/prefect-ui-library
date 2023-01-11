<template>
  <p-tag v-if="workPoolLateRunsCount" class="workers-late-indicator">
    {{ workPoolLateRunsCount }} {{ toPluralString('Late run', workPoolLateRunsCount) }}
  </p-tag>
</template>

<script lang="ts">
  export default {
    name: 'WorkersLateIndicator',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { toPluralString } from '@/utilities'

  const props = defineProps<{
    workPoolName: string,
    workPoolQueueNames?: string[],
  }>()

  const workPoolQueueNames = computed(() => props.workPoolQueueNames ?? [])

  const api = useWorkspaceApi()
  const { workPoolName } = toRefs(props)

  const workPoolLateRunsSubscription = useSubscription(api.workPools.getWorkPoolLateRuns, [workPoolName.value, { workPoolQueueNames: workPoolQueueNames.value }], { interval: 30000 })
  const workPoolLateRunsCount = computed(() => workPoolLateRunsSubscription.response?.length)
</script>

<style>
.workers-late-indicator { @apply
  bg-state-scheduled-100
  text-state-scheduled-700
}
</style>