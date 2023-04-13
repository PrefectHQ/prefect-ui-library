<template>
  <div class="flow-list-item-deployments">
    <div class="flow-list-item-deployments__header">
      header goes here
    </div>

    <template v-if="deploymentsSubscription.loading">
      <p-loading-icon />
    </template>

    <template v-else-if="deployments.length">
      <p-virtual-scroller
        :items="deployments"
        :item-estimate-height="60"
        item-key="id"
        @bottom="fetchMore"
      >
        <template #default="{ item: deployment }">
          <DeploymentListItem v-model:selected="selected" v-bind="{ deployment, disabled }" class="flow-list-item-deployments__deployment" />
        </template>
      </p-virtual-scroller>
    </template>

    <template v-else>
      no deployments go here
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { DeploymentListItem } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { DeploymentsFilter } from '@/models'

  const props = defineProps<{
    filter?: DeploymentsFilter,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const DEPLOYMENTS_DEFAULT_FILTER_LIMIT = 10

  const api = useWorkspaceApi()
  const deploymentsFilter = computed <[DeploymentsFilter]>(() => [
    {
      ...props.filter,
      sort: 'CREATED_DESC',
      limit: DEPLOYMENTS_DEFAULT_FILTER_LIMIT,
    },
  ])
  const deploymentsSubscription = useSubscription(
    api.deployments.getDeployments,
    deploymentsFilter,
  )
  const deployments = computed(() => deploymentsSubscription.response ?? [])

  const fetchMore = (): void => {
    // TODO: implement
  }

  const selected = ref([])
</script>

<style>
.flow-list-item-deployments {
  --virtual-scroller-item-gap: theme('spacing.4')
}

.flow-list-item-deployments__deployment { @apply
  rounded-l-none
}

.flow-list-item-deployments__deployment:last-child { @apply
  rounded-bl
}
</style>