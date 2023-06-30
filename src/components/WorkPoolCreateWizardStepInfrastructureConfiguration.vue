<template>
  <p-content class="work-pool-create-wizard-step-infrastructure-configuration">
    <template v-if="typeIsPrefectAgent">
      <p-markdown-renderer :text="localization.info.workPoolInfrastructureConfigurationAgent" />
    </template>
    <template v-else>
      <p-markdown-renderer :text="localization.info.workPoolInfrastructureConfigurationInstructions" />

      <WorkPoolBaseJobTemplateFormSection v-model:work-pool="internalWorkPool" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import WorkPoolBaseJobTemplateFormSection from '@/components/WorkPoolBaseJobTemplateFormSection.vue'
  import { localization } from '@/localization'
  import { WorkPoolFormValues } from '@/models'

  const props = defineProps<{
    workPool: WorkPoolFormValues,
  }>()

  const emit = defineEmits<{
    (event: 'update:workPool', value: WorkPoolFormValues): void,
  }>()

  const internalWorkPool = computed({
    get() {
      return props.workPool
    },
    set(value) {
      emit('update:workPool', value)
    },
  })

  const typeIsPrefectAgent = computed(() => props.workPool.type === 'prefect-agent')
</script>