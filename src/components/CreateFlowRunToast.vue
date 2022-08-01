<template>
  <div class="create-flow-run-toast">
    <div class="create-flow-run-toast__message">
      <span class="create-flow-run-toast__message--emphasized">{{ runName }}</span> scheduled <template
        v-if="immediate"
      >
        to start
        <span class="create-flow-run-toast__message--emphasized">now</span>
      </template><template v-else>
        for <span
          class="create-flow-run-toast__message--emphasized"
        >{{ startTime?.toLocaleString() }}</span>
      </template>
    </div>

    <p-button class="create-flow-run-toast__button" size="xs" @click="handleClick">
      View run
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
    immediate?: boolean,
    startTime?: Date,
  }>()

  const runName = computed(() => {
    return titleCase(props.flowRun.name!)
  })

  const router = ref(props.routerProp)
  const handleClick = (): Promise<void | NavigationFailure | undefined> => router.value.push(props.flowRunRoute)
</script>

<style>
.create-flow-run-toast { @apply
  flex
  justify-between
  items-center
}

.create-flow-run-toast__message--emphasized { @apply
  font-semibold
}

.create-flow-run-toast__button { @apply
  mx-1
  inline-block
  grow
  whitespace-nowrap
}
</style>