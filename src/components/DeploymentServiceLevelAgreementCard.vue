<template>
  <p-card class="deployment-service-level-agreement-card">
    <p-key-value label="Name" :value="serviceLevelAgreement.name" />
    <p-key-value label="Severity" :value="uppercase(serviceLevelAgreement.severity)" />
    <p-key-value v-if="serviceLevelAgreement.description" label="Description" :value="serviceLevelAgreement.description" />
    <p-key-value label="Duration" :value="`${serviceLevelAgreement.durationInSeconds()} seconds`" />
  </p-card>
</template>


<script lang="ts" setup>
  import { ServiceLevelAgreement } from '@/models/ServiceLevelAgreement'
  import { uppercase } from '@/utilities'

  defineProps<{
    serviceLevelAgreement: ServiceLevelAgreement,
  }>()
</script>

<style>
.deployment-service-level-agreement-card { @apply
  text-sm
  gap-y-2
  w-full
}
</style>

