<template>
  <p-tag-wrapper class="block-schema-capabilities" :tags="tags" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { BlockSchemaCapability } from '@/models/BlockSchema'
  import { capitalize } from '@/utilities'

  const props = defineProps<{
    capabilities: BlockSchemaCapability[],
  }>()

  const tags = computed(() => props.capabilities.map(capability => capitalize(capability)))
</script>