<template>
  <component :is="element" class="block-schema-capabilities" :tags="capabilities" />
</template>

<script lang="ts" setup>
  import { PTags, PTagWrapper } from '@prefecthq/prefect-design'
  import { computed } from 'vue'

  const props = defineProps<{
    capabilities: string[],
    wrapper?: boolean,
  }>()

  const element = computed(() => props.wrapper ? PTagWrapper : PTags)
</script>