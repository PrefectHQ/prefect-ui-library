<template>
  <p-tags-input
    v-model="internalValue"
    :placeholder="localization.info.addTagPlaceholder"
    :options="tags"
    :empty-message="localization.info.all"
  />
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue'
  import { useDeployments } from '@/compositions'
  import { localization } from '@/localization'
  import { DeploymentsFilter } from '@/models/Filters'
  import { unique } from '@/utilities'

  const props = defineProps<{
    selected: string[] | null | undefined,
    filter?: DeploymentsFilter,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string[] | null): void,
  }>()

  const { filter = {} } = toRefs(props)

  const internalValue = computed({
    get() {
      return props.selected ?? null
    },
    set(value) {
      emits('update:selected', value)
    },
  })

  const { deployments } = useDeployments(filter)
  const tags = computed(() => unique(deployments.value?.flatMap(deployment => deployment.tags ?? []) ?? []))
</script>