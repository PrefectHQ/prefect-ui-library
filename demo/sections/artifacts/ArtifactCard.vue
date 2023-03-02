<template>
  <ComponentPage title="ArtifactDescription" :demos="demos">
    <template #description>
      <p-checkbox v-model="condense" label="Condense" />
    </template>

    <template v-for="demo in demos" #[demo.slot] :key="demo.title">
      <ArtifactCard :artifact="demo.artifact" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactMock } from '@/demo/compositions/useArtifactsMock'
  import { artifactTypes } from '@/models/Artifact'
  import { snakeCase } from '@/utilities'

  const condense = ref(false)

  const demos = artifactTypes.map((type) => ({
    slot: snakeCase(type),
    title: type,
    artifact: useArtifactMock({ type }),
  }))
</script>
