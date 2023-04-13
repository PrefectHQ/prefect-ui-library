<template>
  <StateListItem class="flow-list-item">
    hello
  </StateListItem>
</template>

<script lang="ts" setup>
  import { StateListItem } from '@/components'
</script>

<style>
.flow-list-item { @apply
  flex
  flex-col
  gap-y-2
  text-base
}
</style>