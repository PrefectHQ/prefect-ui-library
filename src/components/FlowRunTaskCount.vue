<template>
  <div ref="el" class="flow-run-task-count">
    <template v-if="tasksCount.response">
      <p-icon-text icon="Task">
        {{ tasksCount.response }} task {{ toPluralString('run', tasksCount.response) }}
      </p-icon-text>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useIntersectionObserver, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import { FlowRun } from '@/models/FlowRun'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { inject, toPluralString } from '@/utilities'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const visible = ref(false)
  const el = ref<HTMLDivElement>()

  const isScheduled = computed(() => props.flowRun.stateType == 'scheduled')

  function intersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.value = entry.isIntersecting
      }
    })
  }

  const { observe } = useIntersectionObserver(intersect)

  onMounted(() => {
    observe(el)
  })

  const taskRunsApi = inject(taskRunsApiKey)

  const tasksCountFilter = computed<Parameters<typeof taskRunsApi.getTaskRunsCount> | null>(() => {
    if (!visible.value || isScheduled.value) {
      return null
    }

    return [
      {
        flow_runs: {
          id: {
            any_: [props.flowRun.id],
          },
        },
      },
    ]
  })

  const tasksCount = useSubscriptionWithDependencies(taskRunsApi.getTaskRunsCount, tasksCountFilter)
</script>