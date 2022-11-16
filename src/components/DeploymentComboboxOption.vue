<template>
  <div ref="element" class="deployment-combobox-option">
    <span v-if="visible && flowResponse" class="deployment-combobox-option--flow-name">
      {{ flowResponse.name }} >
    </span>
    {{ deploymentName }}
  </div>
</template>

<script lang="ts" setup>
  import { useVisibilityObserver, useSubscription } from '@prefecthq/vue-compositions'
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
  const flowSubscription = useSubscription(api.flows.getFlow, [flowId])
  const flowResponse = computed(() => flowSubscription.response ?? '')
</script>

<style>
.deployment-combobox-option--flow-name { @apply
  font-bold
}
</style>