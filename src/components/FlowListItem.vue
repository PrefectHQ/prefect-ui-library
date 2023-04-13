<template>
  <div class="flow-list-item-container">
    <StateListItem v-bind="attrs" class="flow-list-item" :tags="tags">
      <template #name>
        <p-link :to="routes.flow(flow.id)">
          <p-heading :heading="5">
            {{ flow.name }}
          </p-heading>
        </p-link>
      </template>
    </StateListItem>

    <template v-if="deploymentsSubscription.loading">
      <p-loading-icon />
    </template>

    <template v-else-if="deployments.length">
      {{ deployments }}
    </template>

    <template v-else>
      No deployments
    </template>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'FlowListItem',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, useAttrs } from 'vue'
  import { StateListItem } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { Flow } from '@/models'

  const props = defineProps<{
    flow: Flow,
  }>()

  const attrs = useAttrs()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const deploymentsSubscription = useSubscription(
    api.deployments.getDeployments,
    [
      {
        flows: {
          id: [props.flow.id],
        },
      },
    ],
  )
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const tags = computed(() => deployments.value.map((deployment) => deployment.tags ?? []).flat())
</script>

<style>
.flow-list-item { @apply
  rounded-b-none
}
</style>