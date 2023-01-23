<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="empty-work-queue--icon " />
      <p-icon icon="DotsHorizontalIcon" class="empty-work-queue--icon " />
      <p-icon icon="DatabaseIcon" class="empty-work-queue--icon " />
    </template>

    <template #heading>
      Create a work queue to run your deployments
    </template>

    <template #description>
      Work queues organize runs into meaningful groups to be picked up by a corresponding agent process.
    </template>

    <template #actions>
      <DocumentationButton topic="workQueues" />
      <p-button v-if="can.create.work_queue" :to="routes.workQueueCreate()">
        Create Work Queue
        <p-icon icon="PlusIcon" class="empty-work-queue--link-icon" />
      </p-button>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>

<style>
.empty-work-queue--icon { @apply
  w-12
  h-12
}

.empty-work-queue--link-icon { @apply
  ml-2
  w-4
  h-4
}
</style>
