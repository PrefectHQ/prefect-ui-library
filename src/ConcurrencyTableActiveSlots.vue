<template>
  <template v-if="hasAsctiveSlots">
    None
  </template>
  <template v-else>
    <p-link v-for="id in activeSlots" :key="id" class="concurrency-table-active-slots__link">
      {{ id }}
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    activeSlots: string[],
  }>()

  const hasAsctiveSlots = computed(()=> !props.activeSlots.length)
</script>

<style>
.concurrency-table-active-slots__link {
  @apply
  pr-8
}
</style>