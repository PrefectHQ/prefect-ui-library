<template>
  <p-tags-input
    v-model="internalValue"
    :placeholder="localization.info.addTagPlaceholder"
    :options="options"
    :empty-message="localization.info.all"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useDeployments } from '@/compositions'
  import { localization } from '@/localization'
  import { DeploymentsFilter } from '@/models/Filters'

  const props = defineProps<{
    selected: string[] | null | undefined,
    filter?: DeploymentsFilter,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string[] | null): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  const filter = computed<DeploymentsFilter>(() => {
    return {
      ...props.filter,
    }
  })

  const { deployments } = useDeployments(filter)
  const tagList = computed(() => deployments.value?.flatMap(deployment => deployment.tags ?? []))
  const options = computed(() => [...new Set(tagList.value)])
</script>