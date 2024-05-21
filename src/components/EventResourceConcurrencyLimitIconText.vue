<template>
  <span v-if="show" class="event-resource-deployment-icon-text">
    <template v-if="id && concurrencyLimitName">
      Concurrency Limit
      <ResourceLink :resource="resource">
        <p-icon-text icon="QueueListIcon">
          <span>{{ concurrencyLimitName }}</span>
        </p-icon-text>
      </ResourceLink>
    </template>
    <template v-else>
      {{ resourceId }}
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref, toRefs } from 'vue'
  import ResourceLink from '@/components/ResourceLink.vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const api = useWorkspaceApi()
  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)

  const limitId = ref<string>(id.value ?? '')
  const concurrencyLimitSubscription = useSubscription(api.concurrencyV2Limits.getConcurrencyV2Limit, [limitId], {})
  const concurrencyLimit = computed(() => concurrencyLimitSubscription.response)
  const concurrencyLimitName = computed(() => name.value ?? concurrencyLimit.value?.name)
  const show = computed(() => isDefined(concurrencyLimitName.value) || concurrencyLimitSubscription.errored)
</script>