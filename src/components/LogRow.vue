<template>
  <div class="log-row">
    <div class="log-row__leading">
      <LogLevelLabel :level="log.level" />
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
      <div v-if="log.name" class="log-row__logger">
        {{ log.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import LogLevelLabel from '@/components/LogLevelLabel.vue'
  import { useTaskRun } from '@/compositions'
  import { Log } from '@/models'
  import { formatTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    log: Log,
  }>()

  const taskRunId = computed(() => props.log.taskRunId)
  const { taskRun } = useTaskRun(taskRunId)
  const taskRunName = computed(() => taskRun.value?.name)
</script>

<style>
.log-row { @apply
  grid
  py-2;
  grid-template-columns: 84px minmax(0, 1fr) 150px;
}

@media (max-width: 768px) {
  .log-row { @apply
  grid
  py-2;
  grid-template-columns: none;
  grid-template-rows: 20px minmax(0, 1fr) 50px;
}
}

.log-row__leading { @apply
  select-none;
}

.log-row__content { @apply
  flex-1
  select-auto
  whitespace-pre-wrap
  break-words
}

.log-row__trailing { @apply
  text-xs
  text-subdued
  shrink-0
  text-right
  pl-1
  truncate
}

.log-row__logger { @apply
  font-black
  break-all
  whitespace-normal
}
</style>