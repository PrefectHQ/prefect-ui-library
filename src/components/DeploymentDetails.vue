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
        <div class="deployment-details__schedule-row">
          <div v-if="_deployment.schedule" class="deployment-details__schedule">
            {{ _deployment.schedule.toString({ verbose: true }) }}
          </div>

          <div class="deployment-details__schedule-buttons">
            <ScheduleFormModal :schedule="_deployment.schedule" @submit="updateSchedule">
              <template #default="{ open }">
                <p-button size="xs" class="deployment-details__schedule-button" inset @click="open">
                  <p-icon icon="PencilIcon" class="deployment-details__schedule-button-icon" />
                  {{ _deployment.schedule ? 'Edit' : 'Add' }}
                </p-button>
              </template>
            </ScheduleFormModal>

            <p-button
              v-if="_deployment.schedule"
              size="xs"
              class="deployment-details__schedule-button"
              inset
              @click="removeSchedule"
            >
              <p-icon icon="TrashIcon" class="deployment-details__schedule-button-icon" />
              Remove
            </p-button>
          </div>
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
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { ref, computed } from 'vue'
  import FlowIconText from '@/components/FlowIconText.vue'
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
  import StorageIconText from '@/components/StorageIconText.vue'
  import { Schedule } from '@/models'
  import { Deployment } from '@/models/Deployment'

  const props = defineProps<{
    deployment: Deployment,
    alternate?: boolean,
  }>()

  const _deployment = ref(props.deployment)

  const updateSchedule = (schedule: Schedule | null): void => {
    // do nothing
    _deployment.value.schedule = schedule
  }
  const removeSchedule = (): void => {
    _deployment.value.schedule = null
    // do nothing
  }
</script>

<style>
.deployment-details { @apply
  flex
  flex-col
  gap-3
  items-start
}

.deployment-details__schedule-tag,
.deployment-details__schedule-button { @apply
  max-w-fit
}

.deployment-details__schedule-row { @apply
  flex
  gap-2
  flex-col
}

.deployment-details__schedule-buttons { @apply
  flex
  gap-2
}

.deployment-details__schedule-button-icon { @apply
  w-3
  h-3
}

.deployment-details__schedule-tag { @apply
  bg-slate-500
  text-white
  cursor-pointer
}

.deployment-details__schedule-tag .p-tag__dismiss { @apply
  text-slate-100
  hover:text-slate-900
}

.deployment-details__tags { @apply
  mt-1
}
</style>