<template>
  <DemoSection heading="Schedule Modal">
    <p-key-value label="Schedule" :value="schedule" />

    <ScheduleFormModal @submit="updateSchedule">
      <template #default="{ open }">
        <p-button @click="open">
          Show schedule modal
        </p-button>
      </template>
    </ScheduleFormModal>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
  import { Schedule  } from '@/models'

  const schedule = ref<Schedule | null>(null)
  const updateSchedule = (formSchedule: Schedule | null): void => {
    schedule.value = formSchedule
  }
</script>