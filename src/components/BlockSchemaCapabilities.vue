<template>
  <component :is="element" class="block-schema-capabilities" :tags="tags" />
</template>

<script lang="ts" setup>
  import { PTags, PTagWrapper } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { BlockSchemaCapability } from '@/models/BlockSchema'
  import { capitalize } from '@/utilities'

  const props = defineProps<{
    capabilities: BlockSchemaCapability[],
    wrapper?: boolean,
  }>()

  const element = computed(() => props.wrapper ? PTagWrapper : PTags)
  const tags = computed(() => props.capabilities.map(capability => capitalize(capability)))
</script>