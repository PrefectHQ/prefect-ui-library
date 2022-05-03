<template>
  <component :is="icon" class="state-icon" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { StateType } from '@/models/StateType'

  const props = defineProps<{
    state: StateType,
  }>()

  // eslint-disable-next-line vue/return-in-computed-property
  const icon = computed(() => {
    // eslint-disable-next-line default-case
    switch (props.state) {
      case 'CANCELLED':
      case 'COMPLETED':
      case 'RUNNING':
      case 'SCHEDULED':
      case 'PENDING':
      case 'FAILED':
        return null
    }
  })
</script>

<style>
/*  */
</style>