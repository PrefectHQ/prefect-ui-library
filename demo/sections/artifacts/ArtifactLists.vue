<template>
  <ComponentPage title="ArtifactList">
    <ArtifactList :artifacts="artifacts" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import ArtifactList from '@/components/ArtifactList.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactsMock } from '@/demo/compositions/useArtifactsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const condense = ref(false)
  const artifacts = useArtifactsMock(20)
</script>