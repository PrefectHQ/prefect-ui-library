<template>
  <div>
    <span v-if="flowName != null || flowName != ''" class="font-bold">
      {{ flowName }} >
    </span>
    {{ deploymentName }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useFlow } from '@/compositions'

  const props = defineProps<{
    flowId: string,
    deploymentName: string,
  }>()

  const flowName = computed(() => {
    return useFlow(props.flowId).value?.name
  })
</script>