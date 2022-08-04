<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Forms
      </h1>
    </template>

    <ValidationSection />
    <DeploymentFormSection />
    <ParametersFormSection />
    <ScheduleFormsSection />
    <WorkQueueFormSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import DeploymentFormSection from '../sections/DeploymentFormSection.vue'
  import ParametersFormSection from '../sections/ParametersFormSection.vue'
  import ScheduleFormsSection from '../sections/ScheduleFormsSection.vue'
  import ValidationSection from '../sections/ValidationSection.vue'
  import WorkQueueFormSection from '../sections/WorkQueueFormSection.vue'
</script>