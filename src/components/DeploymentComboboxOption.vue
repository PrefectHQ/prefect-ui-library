<template>
  <div class="deployment-combobox-option">
    <span v-if="flowResponse" class="deployment-combobox-option--flow-name">
      {{ flowResponse.name }} >
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
  const flowId = computed(() => props.flowId)
  const flowSubscription = useSubscription(api.flows.getFlow, [flowId])
  const flowResponse = computed(() => flowSubscription.response ?? '')
</script>

<style>
.deployment-combobox-option--flow-name { @apply
  font-bold
}
</style>