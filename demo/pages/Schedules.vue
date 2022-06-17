<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Schedules
      </h1>
    </template>

    <ScheduleDisplaySection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import ScheduleDisplaySection from '../sections/ScheduleDisplaySection.vue'
</script>