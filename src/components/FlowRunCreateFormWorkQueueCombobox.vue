<template>
  <template v-if="!workPool?.isPushPool">
    <p-label :label="`Work Queue for ${workPoolName} (Optional)`" class="flow-run-create-form-work-queue-combobox">
      <WorkPoolQueueCombobox v-model:selected="workQueueName" :work-pool-name="workPoolName" />
    </p-label>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkPoolQueueCombobox from '@/components/WorkPoolQueueCombobox.vue'
  import { useWorkPool } from '@/compositions/useWorkPool'

  const props = defineProps<{
    workQueueName: string | null,
    workPoolName: string,
  }>()

  const emit = defineEmits<{
    'update:workQueueName': [string | null],
  }>()

  const { workPool } = useWorkPool(() => props.workPoolName)

  const workQueueName = computed({
    get() {
      return props.workQueueName
    },
    set(value) {
      emit('update:workQueueName', value)
    },
  })
</script>