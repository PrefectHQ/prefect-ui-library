<template>
  <div class="toast-message">
    <span class="toast-message__name">{{ runName }}</span> Scheduled
    <p-button size="xs" @click="handleClick">
      <span>Go To Run</span>
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { computed } from '@vue/reactivity'
  import { NavigationFailure, RouteLocationRaw, Router } from 'vue-router'
  import { FlowRun } from '@/models/FlowRun'
  import {  titleCase } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
    flowRunRoute: RouteLocationRaw,
    router: Router,
  }>()


  const runName = computed(() => {
    return titleCase(props.flowRun.name!)
  })
  // eslint-disable-next-line vue/no-mutating-props
  const handleClick = (): Promise<void | NavigationFailure | undefined> => props.router.push(props.flowRunRoute)
</script>

<style>
.toast-message__name { @apply
  font-semibold
}
</style>