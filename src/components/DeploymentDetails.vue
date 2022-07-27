<template>
  <div class="deployment-details">
    <p-key-value label="Flow" :alternate="alternate">
      <template #value>
        <FlowIconText :flow-id="deployment.flowId" />
      </template>
    </p-key-value>

    <p-key-value v-if="deployment.storageDocumentId" label="Storage" :alternate="alternate">
      <template #value>
        <StorageIconText :storage-document-id="deployment.storageDocumentId" />
      </template>
    </p-key-value>

    <p-key-value label="Schedule" :alternate="alternate">
      <template #value>
        <div class="deployment-details__schedule" :class="classes.schedule">
          <p-loading-icon v-if="updateScheduleLoading" class="deployment-details__schedule-loading-icon" />
          <ScheduleFieldset v-model="internalSchedule" :loading="updateScheduleLoading" />
        </div>
      </template>
    </p-key-value>


    <p-key-value label="Created" :value="formatDateTimeNumeric(deployment.created)" :alternate="alternate" />

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(deployment.updated)" :alternate="alternate" />

    <p-divider />

    <p-key-value label="Deployment ID" :value="deployment.id" :alternate="alternate" />

    <p-key-value label="Flow ID" :value="deployment.flowId" :alternate="alternate" />

    <p-key-value label="Storage Document ID" :value="deployment.storageDocumentId" :alternate="alternate" />

    <p-key-value
      label="Infrastructure Document ID"
      :value="deployment.infrastructureDocumentId"
      :alternate="alternate"
    />

    <p-key-value label="Tags" :alternate="alternate">
      <template #value>
        <template v-if="deployment.tags?.length">
          <p-tags :tags="deployment.tags" class="deployment-details__tags" />
        </template>
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric, showToast, PLoadingIcon } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import ScheduleFieldset from './ScheduleFieldset.vue'
  import FlowIconText from '@/components/FlowIconText.vue'
  import StorageIconText from '@/components/StorageIconText.vue'
  import { localization } from '@/localization'
  import { DeploymentFormValues, Schedule } from '@/models'
  import { Deployment } from '@/models/Deployment'
  import { deploymentsApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    deployment: Deployment,
    alternate?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const deploymentsApi = inject(deploymentsApiKey)
  const updateScheduleLoading = ref(false)

  const internalSchedule = computed({
    get() {
      return props.deployment.schedule
    },
    set(val: Schedule | null) {
      updateSchedule(val)
    },
  })

  const classes = computed(() => {
    return {
      schedule: { 'deployment-details__schedule--loading': updateScheduleLoading.value },
    }
  })

  const updateSchedule =  async (schedule: Schedule | null): Promise<void> => {
    const currentSchedule = props.deployment.schedule

    let successMessage, errorMessage

    if (currentSchedule && !schedule) {
      successMessage = localization.success.removeSchedule
      errorMessage = localization.error.removeSchedule
    } else if (currentSchedule && schedule) {
      successMessage = localization.success.updateSchedule
      errorMessage = localization.error.updateSchedule
    } else {
      successMessage = localization.success.createSchedule
      errorMessage = localization.error.createSchedule
    }

    updateScheduleLoading.value = true

    try {
      await deploymentsApi.updateDeployment(props.deployment.id, new DeploymentFormValues({ ...props.deployment, schedule: schedule }).getDeploymentRequest())
      emit('update')
      showToast(successMessage, 'success')
    } catch {
      showToast(errorMessage, 'error')
    } finally {
      updateScheduleLoading.value = false
    }
  }
</script>

<style>
.deployment-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.deployment-details__schedule { @apply
  relative
}

.deployment-details__schedule-loading-icon { @apply
  absolute
  text-prefect-500
  left-1/2
  top-1/2
  -translate-y-1/2
  -translate-x-1/2
  z-10
}

.deployment-details__schedule--loading { @apply
  !cursor-wait
  opacity-80
}

.deployment-details__tags { @apply
  mt-1
}
</style>