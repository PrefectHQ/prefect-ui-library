<template>
  <p-tags-input v-model="internalValue" class="deployment-tags-input" placeholder="Search or enter new tag" v-bind="{ options, emptyMessage }" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useDeployments } from '@/compositions'
  import { DeploymentsFilter } from '@/models/Filters'
  import { unique } from '@/utilities/arrays'

  const props = defineProps<{
    selected: string[] | null | undefined,
    emptyMessage?: string,
    filter?: DeploymentsFilter,
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

  const { deployments } = useDeployments(() => props.filter ?? {})

  const options = computed(() => {
    const tags = deployments.value.flatMap(deployment => deployment.tags ?? [])

    return unique(tags).sort((tagA, tagB) => tagA.localeCompare(tagB))
  })
</script>

<style>
.deployment-tags-input {
  min-width: 128px;
}
</style>