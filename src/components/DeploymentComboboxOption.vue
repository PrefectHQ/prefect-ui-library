<template>
  <div ref="element" class="deployment-combobox-option">
    <span v-if="visible && flowResponse" class="deployment-combobox-option--flow-name">
      {{ flowResponse.name }} >
    </span>
    {{ deploymentName }}
  </div>
</template>

<script lang="ts" setup>
  import { useVisibilityObserver, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const props = defineProps<{
    flowId: string,
    deploymentName?: string,
  }>()

  const api = useWorkspaceApi()
  const element = ref<HTMLDivElement>()
  const { visible } = useVisibilityObserver(element, { disconnectWhenVisible: true })


  const flowId = computed(() => props.flowId)
  const flowArgs = computed<Parameters<typeof api.flows.getFlow> | null>(() => {
    if (!visible.value) {
      return null
    }
    return [flowId.value]
  })

  const flowSubscription = useSubscriptionWithDependencies(api.flows.getFlow, flowArgs)
  const flowResponse = computed(() => flowSubscription.response ?? null)
</script>
