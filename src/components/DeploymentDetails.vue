<template>
  <div class="deployment-details">
    <p-key-value label="Flow" :alternate="alternate">
      <template #value>
        <FlowIconText :flow-id="deployment.flowId" />
      </template>
    </p-key-value>

    <p-key-value v-if="deployment.workPoolName" label="Work Pool" :alternate="alternate">
      <template #value>
        <WorkPoolIconText :work-pool-name="deployment.workPoolName!" />
      </template>
    </p-key-value>

    <p-key-value v-if="deployment.workQueueName && !workPool?.isPushPool" label="Work Queue" :alternate="alternate">
      <template #value>
        <WorkQueueIconText :work-queue-name="deployment.workQueueName!" :work-pool-name="deployment.workPoolName" />
      </template>
    </p-key-value>

    <p-key-value v-if="deployment.storageDocumentId" label="Storage" :alternate="alternate">
      <template #value>
        <BlockIconText :block-document-id="deployment.storageDocumentId" />
      </template>
    </p-key-value>

    <p-key-value v-if="deployment.infrastructureDocumentId" label="Infrastructure" :alternate="alternate">
      <template #value>
        <BlockIconText :block-document-id="deployment.infrastructureDocumentId" />
      </template>
    </p-key-value>

    <p-key-value label="Schedule" :alternate="alternate" :value="deployment.schedule?.toString({ verbose: true })">
      <template v-if="!deployment.deprecated" #value>
        <div class="deployment-details__schedule" :class="classes.schedule">
          <p-loading-icon v-if="updateScheduleLoading" class="deployment-details__schedule-loading-icon" />
          <ScheduleFieldset v-model="internalSchedule" :loading="updateScheduleLoading" />
        </div>
      </template>
    </p-key-value>

    <slot />

    <p-divider />

    <p-key-value label="Created" :value="formatDateTimeNumeric(deployment.created)" :alternate="alternate" />

    <template v-if="deployment.createdBy">
      <p-key-value label="Created By" :value="deployment.createdBy.displayValue" :alternate="alternate" />
    </template>

    <p-key-value label="Last Updated" :value="formatDateTimeNumeric(deployment.updated)" :alternate="alternate" />

    <template v-if="deployment.updatedBy">
      <p-key-value label="Updated By" :value="deployment.updatedBy.displayValue" :alternate="alternate" />
    </template>

    <p-key-value label="Entrypoint" :value="deployment.entrypoint" :alternate="alternate" />

    <p-key-value label="Path" :value="deployment.path" :alternate="alternate" />

    <p-divider />

    <template v-if="can.read.flow">
      <p-key-value label="Flow ID" :value="deployment.flowId" :alternate="alternate" />
    </template>

    <p-key-value label="Deployment ID" :value="deployment.id" :alternate="alternate" />

    <p-key-value label="Deployment Version" :value="deployment.version" :alternate="alternate" />

    <p-key-value label="Storage Document ID" :value="deployment.storageDocumentId" :alternate="alternate" />

    <p-key-value
      label="Infrastructure Document ID"
      :value="deployment.infrastructureDocumentId"
      :alternate="alternate"
    />

    <p-key-value label="Tags" :alternate="alternate">
      <template v-if="deployment.tags?.length" #value>
        <p-tags :tags="deployment.tags!" class="deployment-details__tags" />
      </template>
    </p-key-value>
  </div>
</template>

<script lang="ts" setup>
  import { showToast, PLoadingIcon } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import { BlockIconText, WorkPoolIconText, FlowIconText, ScheduleFieldset, WorkQueueIconText } from '@/components'
  import { useWorkspaceApi, useCan, useWorkPool } from '@/compositions'
  import { localization } from '@/localization'
  import { Schedule, Deployment } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    deployment: Deployment,
    alternate?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const updateScheduleLoading = ref(false)

  const { workPool } = useWorkPool(props.deployment.workPoolName ?? '')

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

  const updateSchedule = async (schedule: Schedule | null): Promise<void> => {
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
      await api.deployments.updateDeployment(props.deployment.id, { schedule })

      emit('update')
      showToast(successMessage, 'success')
    } catch (error) {
      console.error(error)
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
  text-primary-500
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