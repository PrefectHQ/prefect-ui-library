<template>
  <p-tags-input v-model="tags" class="flow-run-create-form-tags" :options="options" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Deployment } from '@/models/Deployment'

  const props = defineProps<{
    deployment: Deployment,
    tags: string[],
  }>()

  const emit = defineEmits<{
    'update:tags': [string[]],
  }>()

  const tags = computed({
    get() {
      return props.tags
    },
    set(value) {
      emit('update:tags', value)
    },
  })

  // makes sure the user cannot unselect the tags present on the deployment itself
  const options = computed(() => props.deployment.tags?.map((tag) => ({ label: tag, value: tag, disabled: true })))
</script>