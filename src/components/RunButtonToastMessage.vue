<template>
  <div class="run-toast-message">
    <span class="run-toast-message__name">{{ runName }}</span> Scheduled
    <p-button class="run-toast-message__button" size="xs" @click="handleClick">
      <span>Go To Run</span>
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { computed, ref } from '@vue/reactivity'
  import { NavigationFailure, RouteLocationRaw, Router } from 'vue-router'
  import { FlowRun } from '@/models/FlowRun'
  import {  titleCase } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
    flowRunRoute: RouteLocationRaw,
    routerProp: Router,
  }>()

  const runName = computed(() => {
    return titleCase(props.flowRun.name!)
  })

  const router = ref(props.routerProp)
  const handleClick = (): Promise<void | NavigationFailure | undefined> => router.value.push(props.flowRunRoute)
</script>

<style>
.run-toast-message__name { @apply
  font-semibold
}

.run-toast-message__button { @apply
  mx-1
}
</style>