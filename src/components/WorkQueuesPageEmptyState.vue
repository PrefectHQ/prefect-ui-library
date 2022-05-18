<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="empty-work-queue--icon " />
      <p-icon icon="DotsHorizontalIcon" class="empty-work-queue--icon " />
      <p-icon icon="DatabaseIcon" class="empty-work-queue--icon " />
    </template>

    <template #heading>
      Create a queue to get started
    </template>

    <template #description>
      Work queues choose the criteria for flow runs to be picked up by a corresponding agent process, which runs in your execution environment.
    </template>

    <template #actions>
      <router-link to="/queues/new">
        <p-button>
          Create Queue
          <p-icon icon="PlusIcon" class="empty-work-queue--link-icon" />
        </p-button>
      </router-link>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
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