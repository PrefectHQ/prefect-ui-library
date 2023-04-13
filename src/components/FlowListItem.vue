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

    <FlowListItemDeployments :filter="deploymentsFilter" />
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
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, useAttrs } from 'vue'
  import { FlowListItemDeployments, StateListItem } from '@/components'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { DeploymentsFilter, Flow } from '@/models'

  const props = defineProps<{
    flow: Flow,
    filter?: DeploymentsFilter,
  }>()

  const attrs = useAttrs()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const deploymentsFilter = computed<DeploymentsFilter>(() => {
    const filter = {
      ...props.filter,
      flows: {
        id: [props.flow.id],
      },
    }

    return filter
  })
  const deploymentsSubscriptionArgs = computed<[DeploymentsFilter]>(() => [deploymentsFilter.value])
  const deploymentsSubscription = useSubscriptionWithDependencies(
    api.deployments.getDeployments,
    deploymentsSubscriptionArgs,
  )
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const tags = computed(() => deployments.value.map((deployment) => deployment.tags ?? []).flat())
</script>

<style>
.flow-list-item { @apply
  rounded-b-none
}
</style>