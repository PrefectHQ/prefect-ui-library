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
      <!-- TODO: This should link to a task run page -->
      <div v-if="showTaskRunLink && log.taskRunId && taskRunName">
        {{ taskRunName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { formatTimeNumeric } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import LogLevelLabel from './LogLevelLabel.vue'
  import { ILog } from '@/models'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    log: ILog,
    showTaskRunLink?: boolean,
  }>()

  const taskRunsApi = inject(taskRunsApiKey)
  const subscription = useSubscription(taskRunsApi.getTaskRun, [props.log.taskRunId])
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