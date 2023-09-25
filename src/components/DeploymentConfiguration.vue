<template>
  <p-content class="deployment-configuration">
    <p-heading heading="4">
      Job Variables
    </p-heading>
    <CopyableWrapper v-if="deployment" :text-to-copy="overrides">
      <p-code-highlight lang="json" :text="overrides" class="workspace-deployment__infra-overrides" />
    </CopyableWrapper>

    <p-heading heading="4">
      Pull Steps
    </p-heading>
    <CopyableWrapper :text-to-copy="pullSteps">
      <p-code-highlight lang="json" :text="pullSteps" />
    </CopyableWrapper>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { Deployment } from '@/models/Deployment'
  import { stringify } from '@/utilities/json'

  const props = defineProps<{
    deployment: Deployment,
  }>()


  const overrides = computed(() => props.deployment.infrastructureOverrides ? stringify(props.deployment.infrastructureOverrides) : '{}')

  const pullSteps = computed(() => props.deployment.pullSteps ? stringify(props.deployment.pullSteps) : '[]')
</script>