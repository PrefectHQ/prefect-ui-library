<template>
  <div class="toast-message">
    <span class="toast-message__name">{{ runName }}</span> Scheduled
    <router-link>
      <p-button size="xs" @click="handleClick">
        <span>Go To Run</span>
      </p-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { computed } from '@vue/reactivity'
  import { NavigationFailure, RouteLocationRaw, useRouter } from 'vue-router'
  import { FlowRun } from '@/models/FlowRun'
  import {  titleCase } from '@/utilities'


  const router = useRouter()

  const props = defineProps<{
    flowRun: FlowRun,
    flowRunRoute: RouteLocationRaw,
  }>()


  const runName = computed(() => {
    return titleCase(props.flowRun.name!)
  })
  const handleClick = (): Promise<void | NavigationFailure | undefined> => router.push(props.flowRunRoute)
</script>

<style>
.toast-message__name { @apply
  font-semibold
}
</style>