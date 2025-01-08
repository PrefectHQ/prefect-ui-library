<template>
  <p-card class="deployment-service-level-agreement-card">
    <p-key-value class="deployment-service-level-agreement-card__item" label="Name" :value="serviceLevelAgreement.name" />
    <p-key-value class="deployment-service-level-agreement-card__item" label="Type" :value="serviceLevelAgreement.getSlaType()" />
    <p-key-value class="deployment-service-level-agreement-card__item" label="Severity" :value="uppercase(serviceLevelAgreement.severity)" />
    <p-key-value v-if="serviceLevelAgreement.description" class="deployment-service-level-agreement-card__item" label="Description" :value="serviceLevelAgreement.description" />
    <p-key-value class="deployment-service-level-agreement-card__item" label="Duration" :value="secondsToString(serviceLevelAgreement.durationInSeconds())" />
  </p-card>
</template>


<script lang="ts" setup>
  import { ServiceLevelAgreement } from '@/models/ServiceLevelAgreement'
  import { uppercase } from '@/utilities'
  import { secondsToString } from '@/utilities/seconds'

  defineProps<{
    serviceLevelAgreement: ServiceLevelAgreement,
  }>()
</script>

<style>
.deployment-service-level-agreement-card { @apply
  text-sm
  w-full
}

.deployment-service-level-agreement-card__item { @apply
  py-1
}
</style>
