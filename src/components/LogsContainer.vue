<template>
  <p-code multiline class="logs">
    <template v-for="(log, index) in logs" :key="log.id">
      <template v-if="showDivider(index)">
        <div class="logs__divider">
          <span class="logs__divider-time">{{ formatDateInTimeZone(log.timestamp) }}</span>
        </div>
      </template>
      <log-row :log="log" show-task-run-link />
    </template>
    <template v-if="empty">
      <slot name="empty">
        <div class="logs__empty">
          <p>No logs</p>
        </div>
      </slot>
    </template>
  </p-code>
</template>

<script lang="ts" setup>
  import { PCode } from '@prefecthq/prefect-design'
  import { isSameDay } from 'date-fns'
  import { computed, PropType } from 'vue'
  import LogRow from '@/components/LogRow.vue'
  import { Log } from '@/models/Log'
  import { formatDateInTimeZone } from '@/utilities/dates'

  const props = defineProps({
    logs: {
      type: Array as PropType<Log[]>,
      required: true,
    },
  })

  const empty = computed<boolean>(() => props.logs.length == 0)

  const showDivider = (index: number): boolean => {
    if (index == 0) {
      return true
    }

    const previous = props.logs[index - 1]
    const current = props.logs[index]

    return !isSameDay(previous.timestamp, current.timestamp)
  }
</script>

<style>
.logs { @apply
  grid
  gap-1
  text-xs
  overscroll-contain;
}

.logs__divider { @apply
  flex
  justify-center
  w-full
  bg-slate-700
  sticky
  -top-2;
}

.logs__divider:after { @apply
  absolute
  block
  h-[1px]
  left-0
  right-0
  top-1/2
  bg-slate-600;
  content: '';
}

.logs__divider-time { @apply
  bg-slate-700
  relative
  rounded
  px-2
  py-2
  text-center
  text-xs
  text-slate-500
  z-[1];
}
</style>