<template>
  <div class="create-flow-run-toast">
    <div class="create-flow-run-toast__message">
      <span class="create-flow-run-toast__message--emphasized">{{ flowRun.name }}</span> scheduled <template
        v-if="immediate"
      >
        to start
        <span class="create-flow-run-toast__message--emphasized">now</span>
      </template><template v-else>
        for <span class="create-flow-run-toast__message--emphasized">{{ startTime?.toLocaleString() }}</span>
      </template>
    </div>

    <p-button class="create-flow-run-toast__button" size="xs" @click="handleClick">
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
    flowRunRoute: (id: string) => Route,
    router: Router,
  }>()

  const router = ref(props.router)
  const handleClick = (): void => {
    router.value.push(props.flowRunRoute(props.flowRun.id))
  }
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