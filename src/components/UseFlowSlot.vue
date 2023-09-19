<template>
  <slot v-if="flow" :flow="flow" />
</template>

<script lang="ts" setup>
  import { useFlow } from '@/compositions/useFlow'

  const props = defineProps<{
    flowId: string | null | undefined,
  }>()

  const { flow } = useFlow(() => props.flowId)
</script>