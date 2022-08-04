<template>
  <div class="toast-flow-run-create">
    <div class="toast-flow-run-create__message">
      <span class="toast-flow-run-create__message--emphasized">{{ flowRun.name }}</span> scheduled <template
        v-if="immediate"
      >
        to start
        <span class="toast-flow-run-create__message--emphasized">now</span>
      </template><template v-else>
        for <span class="toast-flow-run-create__message--emphasized">{{ startTime?.toLocaleString() }}</span>
      </template>
    </div>

    <p-button class="toast-flow-run-create__button" size="xs" @click="handleClick">
      View run
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import { Router } from 'vue-router'
  import { FlowRun } from '@/models/FlowRun'
  import { Route } from '@/router'

  const props = defineProps<{
    flowRun: FlowRun,
    immediate?: boolean,
    startTime?: Date,
    // TODO: This pattern is bad, we should investigate dependency injection in the toast subapp
    flowRunRoute: (id: string) => Route,
    router: Router,
  }>()

  const router = ref(props.router)
  const handleClick = (): void => {
    router.value.push(props.flowRunRoute(props.flowRun.id))
  }
</script>

<style>
.toast-flow-run-create { @apply
  flex
  justify-between
  items-center
}

.toast-flow-run-create__message--emphasized { @apply
  font-semibold
}

.toast-flow-run-create__button { @apply
  mx-1
  inline-block
  grow
  whitespace-nowrap
}
</style>