<template>
  <p-link :to="routes.artifactKey(artifactId)" class="flow-run-icon-text">
    <p-icon-text :icon="icon">
      <span>{{ artifactKey }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { computed, toRefs } from 'vue'
  import { useArtifact, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    artifactId: string,
  }>()

  const routes = useWorkspaceRoutes()
  const { artifactId } = toRefs(props)
  const { artifact } = useArtifact(artifactId)
  const artifactKey = computed(() => artifact.value?.key)

  const icon = computed<Icon>(() => {
    switch (artifact.value?.type) {
      case 'markdown':
        return 'DocumentTextIcon'
      case 'table':
        return 'TableIcon'
      case 'result':
        return 'CalculatorIcon'
      case 'unknown':
      default:
        return 'FingerPrintIcon'
    }
  })
</script>