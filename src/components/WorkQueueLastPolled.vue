<template>
  <span v-if="lastPolled" class="work-queue-last-polled">
    {{ formatDateTimeNumeric(lastPolled) }}
  </span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { formatDateTimeNumeric } from '@/utilities'

  const props = defineProps<{
    workQueueId: string,
  }>()

  const api = useWorkspaceApi()
  const workQueueStatusSubscription = useSubscription(api.workQueues.getWorkQueueStatus, [props.workQueueId])
  const workQueueStatus = computed(() => workQueueStatusSubscription.response)
  const lastPolled = computed(()=> workQueueStatus.value?.lastPolled)
</script>