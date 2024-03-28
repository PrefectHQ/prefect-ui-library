<template>
  <WorkQueueCombobox v-model:selected="internalSelected" empty-message="Infer Work Queue" class="automation-work-queue-combobox" :work-pool-filter="workPoolFilter">
    <template #option="{ option }">
      <template v-if="option.value === null">
        Infer Work Queue
      </template>
    </template>
  </WorkQueueCombobox>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkQueueCombobox from '@/components/WorkQueueCombobox.vue'
  import { WorkPoolFilter } from '@/models/Filters'

  const props = defineProps<{
    selected: string | string[] | null,
    workPoolIds?: string[],
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const workPoolFilter = computed<WorkPoolFilter>(() => {
    if (!props.workPoolIds?.length) {
      return {}
    }
    return { id: props.workPoolIds }
  })

  const internalSelected = computed({
    get() {
      return props.selected
    },
    set(selected: string | string[] | null) {
      emit('update:selected', selected)
    },
  })
</script>