<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="Flow" class="w-12 h-12" />
      <p-icon icon="DotsHorizontalIcon" class="w-12 h-12" />
      <p-icon icon="DatabaseIcon" class="w-12 h-12" />
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
          <p-icon icon="PlusIcon" class="ml-2 w-4 h-4" />
        </p-button>
      </router-link>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'

  import { computed } from 'vue'
  const documentationLink = computed(() => 'https://orion-docs.prefect.io/concepts/work-queues/')
</script>