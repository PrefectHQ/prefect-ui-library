<template>
  <p-content class="work-pool-create-wizard-step-infrastructure-type">
    <p-label label="Select the infrastructure you want to use to execute your flow runs" :message="error" :state="state" />
    <template v-for="{ label, value, logoUrl, description, isBeta } in workerOptions" :key="value">
      <p-radio v-model="type" :value="value" :state="state" :label="label" class="work-pool-create-wizard-step-infrastructure-type__radio">
        <template #label>
          <div class="work-pool-create-wizard-step-infrastructure-type__content">
            <LogoImage v-if="logoUrl" :url="logoUrl" :alt="label" size="md" class="block-type-card-preview__logo" />
            <div class="work-pool-create-wizard-step-infrastructure-type__text">
              <p class="work-pool-create-wizard-step-infrastructure-type__type">
                {{ label }}<BetaBadge v-if="isBeta" class="work-pool-create-wizard-step-infrastructure-type__beta-label" />
              </p>
              <p class="work-pool-create-wizard-step-infrastructure-type__description">
                {{ description }}
              </p>
            </div>
          </div>
        </template>
      </p-radio>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { useWizardStep } from '@prefecthq/prefect-design'
  import { usePatchRef, useSubscription, useValidation, useValidationObserver } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { LogoImage, BetaBadge } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { WorkerCollectionWorker } from '@/models'
  import { WorkPoolFormValues, WorkPoolTypeSelectOption } from '@/models/WorkPool'
  import { isNotNullish, titleCase } from '@/utilities'

  const props = defineProps<{
    workPool: WorkPoolFormValues,
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

  const api = useWorkspaceApi()
  const workersSubscription = useSubscription(api.collections.getWorkerCollectionWorkers, [])
  const workers = computed(() => workersSubscription.response ?? [])

  const workerOptions = computed<WorkPoolTypeSelectOption[]>(() => {
    const filteredWorkers: (WorkerCollectionWorker & { type: string })[] = workers.value.filter(({ type }) => isNotNullish(type))

    const options: WorkPoolTypeSelectOption[] = filteredWorkers.map(({ type, logoUrl, description, documentationUrl, displayName, isBeta }) => ({
      label: displayName ?? titleCase(type),
      value: type,
      logoUrl: logoUrl,
      description: description,
      documentationUrl: documentationUrl,
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

  const { defineValidate } = useWizardStep()
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
.work-pool-create-wizard-step-infrastructure-type { @apply
  gap-4
}

.work-pool-create-wizard-step-infrastructure-type__radio { @apply
  p-4
}

.work-pool-create-wizard-step-infrastructure-type__content { @apply
  grid
  grid-flow-col
  mx-2
  gap-4
  items-center
}

.work-pool-create-wizard-step-infrastructure-type__text { @apply
  flex
  flex-col
  gap-2
}

.work-pool-create-wizard-step-infrastructure-type__beta-label { @apply
  ml-2
}

.work-pool-create-wizard-step-infrastructure-type__type { @apply
  text-base
}

.work-pool-create-wizard-step-infrastructure-type__description { @apply
  text-sm
  text-foreground-200
}
</style>
