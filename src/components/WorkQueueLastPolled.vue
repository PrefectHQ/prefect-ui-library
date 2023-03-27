<template>
  <span v-if="lastPolled" class="work-queue-last-polled">
    {{ formatDateTimeNumeric(lastPolled) }}
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useWorkQueueStatus } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities'

  const props = defineProps<{
    workQueueId: string,
  }>()

  const workQueueId = computed(() => props.workQueueId)
  const { workQueueStatus } = useWorkQueueStatus(workQueueId)
  const lastPolled = computed(() => workQueueStatus.value?.lastPolled)
</script>