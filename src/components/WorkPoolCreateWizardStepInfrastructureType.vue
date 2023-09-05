<template>
  <p-content>
    <p-label label="Select the infrastructure you want to use to execute your flow runs" :message="error" :state="state" />
    <template v-for="{ label, value, logoUrl, description, isBeta } in options" :key="value">
      <p-card>
        <p-radio v-model="type" :value="value" :state="state" :label="label" @update:model-value="wizard.next()">
          <template #label>
            <div class="work-pool-create-wizard-step-infrastructure-type__infra_type_card_content_container">
              <LogoImage :url="logoUrl" :alt="label" size="md" class="block-type-card-preview__logo" />
              <div class="work-pool-create-wizard-step-infrastructure-type__infra_type_card_text_container">
                <p class="work-pool-create-wizard-step-infrastructure-type__infra_type_card_type_text">
                  {{ label }}<BetaBadge v-if="isBeta" class="work-pool-create-wizard-step-infrastructure-type__infra_type_card_beta_label" />
                </p>
                <p class="work-pool-create-wizard-step-infrastructure-type__infra_type_card_description_text">
                  {{ description }}
                </p>
              </div>
            </div>
          </template>
        </p-radio>
      </p-card>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@prefecthq/prefect-design'
  import { usePatchRef, useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { LogoImage, BetaBadge } from '@/components'
  import { WorkerCollectionItem } from '@/models'
  import { WorkPoolFormValues, WorkPoolTypeSelectOption } from '@/models/WorkPool'
  import { titleCase } from '@/utilities'


  const props = defineProps<{
    workPool: WorkPoolFormValues,
    workers: WorkerCollectionItem[],
  }>()

  const emit = defineEmits<{
    (event: 'update:workPool', value: WorkPoolFormValues): void,
  }>()

  const workPool = computed({
    get() {
      return props.workPool
    },
    set(value) {
      emit('update:workPool', value)
    },
  })

  const type = usePatchRef(workPool, 'type')

  const options = computed<WorkPoolTypeSelectOption[]>(() => {
    const options: WorkPoolTypeSelectOption[] = props.workers.map(({ type, logoUrl, description, documentationUrl, displayName, isBeta }) => ({
      label: displayName ?? titleCase(type!),
      value: type!,
      logoUrl: logoUrl!,
      description: description!,
      documentationUrl: documentationUrl!,
      isBeta: isBeta ?? false,
    }))

    return options.sort((optionA, optionB) => {
      if (optionA.isBeta && !optionB.isBeta) {
        return 1
      }
      if (!optionA.isBeta && optionB.isBeta) {
        return -1
      }
      return optionA.label.localeCompare(optionB.label)
    })
  })

  const { defineValidate, wizard } = useWizardStep()
  const { validate } = useValidationObserver()
  const { state, error } = useValidation(type, 'Work pool infrastructure type', value => {
    if (value) {
      return true
    }

    return 'Infrastructure type is required'
  })

  defineValidate(validate)
</script>

<style>
.work-pool-create-wizard-step-infrastructure-type__infra_type_card_content_container { @apply
  grid
  grid-flow-col
  mx-2
  gap-4
  items-center
}

.work-pool-create-wizard-step-infrastructure-type__infra_type_card_text_container { @apply
  flex
  flex-col
  gap-2
}

.work-pool-create-wizard-step-infrastructure-type__infra_type_card_beta_label { @apply
  ml-2
}

.work-pool-create-wizard-step-infrastructure-type__infra_type_card_type_text { @apply
  text-base
}

.work-pool-create-wizard-step-infrastructure-type__infra_type_card_description_text { @apply
  text-sm
  text-subdued
}
</style>
