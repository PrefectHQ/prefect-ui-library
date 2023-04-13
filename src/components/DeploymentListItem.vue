<template>
  <StateListItem class="deployment-list-item" :tags="tags" disabled>
    <template #name>
      <p-link :to="routes.deployment(deployment.id)">
        <p-heading :heading="5">
          {{ deployment.name }}
        </p-heading>
      </p-link>
    </template>

    <template #relationships>
      <template v-if="deployment.workPoolName">
        <div class="flow-run-list-item__relation">
          <span>{{ localization.info.workPool }}</span> <WorkPoolIconText :work-pool-name="deployment.workPoolName" />
        </div>
      </template>

      <template v-if="deployment.workQueueName">
        <div class="flow-run-list-item__relation">
          <span>{{ localization.info.workQueue }} </span> <WorkQueueIconText :work-queue-name="deployment.workQueueName" :work-pool-name="deployment.workPoolName" />
        </div>
      </template>
    </template>
  </StateListItem>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { StateListItem, WorkPoolIconText, WorkQueueIconText } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Deployment } from '@/models'

  const props = defineProps<{
    deployment: Deployment,
  }>()

  const routes = useWorkspaceRoutes()
  const tags = computed(() => props.deployment.tags ?? [])
</script>