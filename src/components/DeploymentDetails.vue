<template>
  <div class="deployment-details">
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

    <p-key-value label="Schedules" :alternate="alternate" class="items-stretch">
      <template #value>
        <DeploymentSchedulesFieldset :deployment="deployment" :schedules="deployment.schedules" @create="createDeploymentSchedule" @update="emit('update')" />
      </template>
    </p-key-value>
    <slot />

    <p-divider />

    <p-key-value v-if="can.access.deploymentStatus" label="Status" :alternate="alternate">
      <template #value>
        <DeploymentStatusBadge :deployment="deployment" />
      </template>
    </p-key-value>

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
  import { showToast } from '@prefecthq/prefect-design'
  import { BlockIconText, DeploymentStatusBadge, DeploymentSchedulesFieldset } from '@/components'
  import { useWorkspaceApi, useCan } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment, DeploymentScheduleCompatible } from '@/models'
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

  const createDeploymentSchedule = async (updatedSchedule: DeploymentScheduleCompatible): Promise<void> => {
    if (updatedSchedule.active === null || !updatedSchedule.schedule) {
      showToast('Must provide a schedule and indicate if it should be active or not.', 'error')
      return
    }

    try {
      await api.deploymentSchedules.createDeploymentSchedule(props.deployment.id, { active: updatedSchedule.active, schedule: updatedSchedule.schedule, jobVariables: updatedSchedule.jobVariables, catchup: updatedSchedule.catchup ?? null, maxActiveRuns: updatedSchedule.maxActiveRuns })
      showToast(localization.success.updateDeploymentSchedule, 'success')
      emit('update')
    } catch (error) {
      showToast(localization.error.updateDeploymentSchedule, 'error')
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
  text-live
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
