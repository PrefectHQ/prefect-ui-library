<template>
  <DemoSection heading="Schedule Modal">
    <p-key-value label="Schedule" :value="schedule" />

    <p-button @click="showScheduleFormModal = true">
      Show schedule modal
    </p-button>
    <ScheduleFormModal v-model:showModal="showScheduleFormModal" @submit="updateSchedule" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
  import { Schedule  } from '@/models'

  const schedule = ref<Schedule | null>(null)
  const showScheduleFormModal = ref(false)
  const updateSchedule = (formSchedule: Schedule | null): void => {
    schedule.value = formSchedule
  }
</script>