<template>
  <p-code multiline class="logs">
    <p-virtual-scroller :items="logs" @bottom="emit('bottom')">
      <template #default="{ item: log, index }">
        <template v-if="showDivider(index)">
          <div class="logs__divider">
            <span class="logs__divider-time">{{ formatDate(log.timestamp) }}</span>
          </div>
        </template>

        <LogRow :log="log" />
      </template>
    </p-virtual-scroller>
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
  import { computed } from 'vue'
  import LogRow from '@/components/LogRow.vue'
  import { Log } from '@/models/Log'
  import { formatDate } from '@/utilities/dates'
  import { isSameDay } from '@/utilities/timezone'

  const props = defineProps<{
    logs: Log[],
  }>()

  const emit = defineEmits<{
    (event: 'bottom'): void,
  }>()

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
  text-sm
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