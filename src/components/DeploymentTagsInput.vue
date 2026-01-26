<template>
  <p-tags-input v-model="internalValue" class="deployment-tags-input" placeholder="Search or enter new tag" v-bind="{ options, emptyMessage }" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useDeployments } from '@/compositions'
  import { Deployment } from '@/models'
  import { DeploymentsFilter } from '@/models/Filters'
  import { unique } from '@/utilities/arrays'

  const props = defineProps<{
    selected: string[] | null | undefined,
    emptyMessage?: string,
    filter?: DeploymentsFilter,
    /** When provided, tags are extracted from these deployments instead of making an API call */
    deployments?: Deployment[],
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string[] | null): void,
  }>()

  const emptyMessage = computed(() => props.emptyMessage ?? 'All tags')

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  // Only fetch deployments if not provided via props
  const { deployments: fetchedDeployments } = useDeployments(() => {
    if (props.deployments) {
      return null
    }
    return props.filter ?? {}
  })

  const allDeployments = computed(() => props.deployments ?? fetchedDeployments.value)

  const options = computed(() => {
    const tags = allDeployments.value.flatMap(deployment => deployment.tags ?? [])

    return unique(tags).sort((tagA, tagB) => tagA.localeCompare(tagB))
  })
</script>

<style>
.deployment-tags-input {
  min-width: 128px;
}
</style>