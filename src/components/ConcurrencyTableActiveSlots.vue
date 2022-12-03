<template>
  <template v-if="!taskRunCount">
    <p-link :to="routes.concurrencyLimit(concurrencyLimit.id)">
      None
    </p-link>
  </template>
  <template v-else>
    <p-link :to="routes.concurrencyLimit(concurrencyLimit.id)">
      {{ taskRunCount }}
    </p-link>
  </template>
</template>

  <script lang="ts" setup>
  import { computed } from 'vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { ConcurrencyLimit } from '@/models'

  const props = defineProps<{
    concurrencyLimit: ConcurrencyLimit,
  }>()

  const taskRunCount = computed(()=> props.concurrencyLimit.activeSlots?.length)
  const routes = useWorkspaceRoutes()
  </script>
