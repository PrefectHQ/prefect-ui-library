<template>
  <div class="log-row">
    <div class="log-row__leading">
      <log-level-label :level="log.level" />
    </div>

    <div class="log-row__content">
      {{ log.message }}
    </div>

    <div class="log-row__trailing">
      <div>
        {{ formatTimeNumeric(log.timestamp) }}
      </div>
      <div v-if="taskRunName">
        {{ taskRunName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { formatTimeNumeric } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import LogLevelLabel from './LogLevelLabel.vue'
  import { Log } from '@/models'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    log: Log,
  }>()

  const taskRunsApi = inject(taskRunsApiKey)
  const args = computed<Parameters<typeof taskRunsApi.getTaskRun> | null>(() => {
    if (props.log.taskRunId === null) {
      return null
    }

    return [props.log.taskRunId]
  })
  const subscription = useSubscriptionWithDependencies(taskRunsApi.getTaskRun, args)
  const taskRunName = computed(() => subscription.response?.name)
</script>

<style>
.log-row { @apply
  flex w-full py-2;
}

.log-row__leading { @apply
  w-[84px] select-none;
}

.log-row__content { @apply
  flex-1 select-auto whitespace-pre-wrap;
}

.log-row__trailing { @apply
  text-xs text-slate-500 shrink-0 text-right;
}
</style>