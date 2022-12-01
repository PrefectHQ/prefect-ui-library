<template>
  <template v-if="hasAsctiveSlots">
    None
  </template>
  <template v-else>
    <p-link v-for="id in activeSlots" :key="id" class="concurrency-table-active-slots__link" :to="taskRunRoute(id)">
      {{ id }}
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { taskRunRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    activeSlots: string[],
  }>()

  const hasAsctiveSlots = computed(()=> !props.activeSlots.length)
  const taskRunRoute = inject(taskRunRouteKey)
</script>

<style>
.concurrency-table-active-slots__link {
  @apply
  pr-8
}
</style>