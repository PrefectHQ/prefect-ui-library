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
        <div class="deployment-details_schedule-row">
          <span v-if="schedule" class="deployment-details__schedule">
            {{ schedule.toString({ verbose: true }) }}
          </span>

          <ScheduleFormModal :schedule="schedule" @submit="updateSchedule">
            <template #default="{ open }">
              <p-button size="xs" class="deployment-details__schedule-button" inset @click="open">
                <p-icon icon="PencilIcon" class="deployment-details__schedule-button-icon" />
                {{ schedule ? 'Edit' : 'Add' }}
              </p-button>
            </template>
          </ScheduleFormModal>

          <p-button v-if="schedule" size="xs" class="deployment-details__schedule-button" inset @click="removeSchedule">
            <p-icon icon="TrashIcon" class="deployment-details__schedule-button-icon" />
            Remove
          </p-button>
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
  import { computed } from 'vue'
  import FlowIconText from '@/components/FlowIconText.vue'
  import ScheduleFormModal from '@/components/ScheduleFormModal.vue'
  import StorageIconText from '@/components/StorageIconText.vue'
  import { Deployment } from '@/models/Deployment'

  const props = defineProps<{
    deployment: Deployment,
    alternate?: boolean,
  }>()

  const schedule = computed(() => props.deployment.schedule)

  const updateSchedule = (): void => {
    // do nothing
  }
  const removeSchedule = (): void => {
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
  items-center
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