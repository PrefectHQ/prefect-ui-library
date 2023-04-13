<template>
  <div class="flow-list-item-deployments">
    <p-layout-table sticky>
      <template #header-start>
        <div class="flow-list-item-deployments__header">
          header goes here
        </div>
      </template>

      <template v-if="deploymentsSubscription.loading">
        <p-loading-icon />
      </template>

      <template v-else-if="deployments.length">
        deployments go here
      </template>

      <template v-else>
        no deployments go here
      </template>
    </p-layout-table>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { DeploymentsFilter } from '@/models'

  const props = defineProps<{
    filter?: DeploymentsFilter,
  }>()

  const emit = defineEmits<{
    (event: 'update'): void,
  }>()

  const api = useWorkspaceApi()
  const deploymentsSubscription = useSubscription(
    api.deployments.getDeployments,
    [props.filter],
  )
  const deployments = computed(() => deploymentsSubscription.response ?? [])
</script>