<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="DatabaseIcon" class="worker-pools-page-empty-state__icon" />
    </template>

    <template #heading>
      Create a worker pool to get started
    </template>

    <template #description>
      Worker pools are API objects with rich configuration that are used to organize and configure worker processes running in potentially remote location
    </template>

    <template #actions>
      <DocumentationButton topic="workerPools" />
      <router-link v-if="can.create.worker_pool" :to="routes.workerPoolCreate()">
        <p-button>
          Create Worker Pool
          <p-icon icon="PlusIcon" class="worker-pools-page-empty-state__link-icon" />
        </p-button>
      </router-link>
    </template>
  </p-empty-state>
</template>

  <script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import { RouterLink } from 'vue-router'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const can = useCan()
  const routes = useWorkspaceRoutes()
    </script>

  <style>
    .worker-pools-page-empty-state__icon { @apply
    w-12
    h-12;
    }

    .worker-pools-page-empty-state__link-icon { @apply
    ml-2
    w-4
    h-4;
    }
  </style>