<template>
  <template v-if="artifact">
    <router-link :to="routes.artifact(artifact.id)">
      <ArtifactCard condense interactive :artifact="artifact" />
    </router-link>
  </template>
  <template v-else>
    <p-loading-icon />
  </template>
</template>

<script lang="ts" setup>
  import { ArtifactCard } from '@/components'
  import { useArtifact, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    artifactId: string,
  }>()

  const routes = useWorkspaceRoutes()

  const { artifact } = useArtifact(() => props.artifactId)
</script>