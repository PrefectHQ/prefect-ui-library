<template>
  <p-tags-input v-model="internalValue" empty-message="All tags" :options="options" :muliple="multiple" />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'

  const api = useWorkspaceApi()

  const props = defineProps<{
    selected: string[],
    multiple?: boolean,
  }>()

  const emits = defineEmits<{
    (event: 'update:selected', value: string[]): void,
  }>()

  const internalValue = computed({
    get() {
      return props.selected
    },
    set(value: string[]) {
      emits('update:selected', value)
    },
  })

  const deploymentsSubscription = useSubscription(api.deployments.getDeployments, [{}])
  const deployments = computed(() => deploymentsSubscription.response ?? [])
  const tagList = computed(() => deployments.value.flatMap(deployment => deployment.tags ?? []))
  const options = computed(() => [...new Set(tagList.value)])
</script>