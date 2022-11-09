<template>
  <div>
    <span class="font-bold">
      {{ flow.name }} >
    </span>
    {{ deploymentName }}
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    flowId: string,
    deploymentName?: string,
  }>()

  const api = useWorkspaceApi()
  const flowSubscription = useSubscription(api.flows.getFlow, [props.flowId])
  const flow = computed(() => flowSubscription.response ?? [])
</script>