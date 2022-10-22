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
  import { computed } from 'vue'
  import LogLevelLabel from './LogLevelLabel.vue'
  import { useTaskRun } from '@/compositions'
  import { Log } from '@/models'
  import { formatTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    log: Log,
  }>()

  const taskRunId = computed(() => props.log.taskRunId)
  const taskRun = useTaskRun(taskRunId)
  const taskRunName = computed(() => taskRun.value?.name)
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