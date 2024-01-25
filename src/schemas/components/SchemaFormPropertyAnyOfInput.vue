<template>
  <span>TODO</span>
</template>

<script lang="ts" setup>
  import { SchemaProperty } from '@/schemas/types/schema'
  import { Require } from '@/types/utilities'

  defineProps<{
    property: Require<SchemaProperty, 'anyOf'>,
  }>()
</script>