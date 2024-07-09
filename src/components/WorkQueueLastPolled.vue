<template>
  <FormattedDate v-if="lastPolled" :date="lastPolled" format="numeric" class="work-queue-last-polled" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FormattedDate from '@/components/FormattedDate.vue'
  import { useWorkQueueStatus } from '@/compositions'

  const props = defineProps<{
    workQueueId: string,
  }>()

  const workQueueId = computed(() => props.workQueueId)
  const { workQueueStatus } = useWorkQueueStatus(workQueueId)
  const lastPolled = computed(() => workQueueStatus.value?.lastPolled)
</script>