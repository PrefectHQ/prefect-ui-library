<template>
  <p-list-item class="deployment-service-level-agreement-card">
    <p-key-value class="deployment-service-level-agreement-card__item" label="Name" :value="serviceLevelAgreement.name" />
    <p-key-value class="deployment-service-level-agreement-card__item" label="Type" :value="serviceLevelAgreement.getDisplaySlaType()" />
    <p-key-value class="deployment-service-level-agreement-card__item" label="Severity" :value="uppercase(serviceLevelAgreement.severity)" />
    <p-key-value v-if="serviceLevelAgreement.description" class="deployment-service-level-agreement-card__item" label="Description" :value="serviceLevelAgreement.description" />
    <template v-for="kv in serviceLevelAgreement.getSlaDefinitionKeyValuePairs()" :key="kv.key">
      <p-key-value class="deployment-service-level-agreement-card__item" :label="kv.key" :value="kv.value" />
    </template>
  </p-list-item>
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
  w-full
}

.deployment-service-level-agreement-card__item { @apply
  py-1
}
</style>
