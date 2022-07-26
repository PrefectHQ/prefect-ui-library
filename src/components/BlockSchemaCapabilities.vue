<template>
  <component :is="element" class="block-schema-capabilities" :tags="capabilitiesSorted" />
</template>

<script lang="ts" setup>
  import { PTags, PTagWrapper } from '@prefecthq/prefect-design'
  import { computed } from 'vue'

  const props = defineProps<{
    capabilities: string[],
    wrapper?: boolean,
  }>()

  const element = computed(() => props.wrapper ? PTagWrapper : PTags)
  const capabilitiesSorted = computed(() => props.capabilities.slice().sort((alpha, beta) => alpha.localeCompare(beta)))
</script>