<template>
  <ComponentPage title="ArtifactTimeline">
    <template #description>
      <div class="artifact-timeline__header">
        <p-select v-model="type" :options="typeOptions" />
        <p-button small @click="addArtifact">
          Add Artifact
        </p-button>
      </div>
    </template>
    <ArtifactTimeline :artifact-key="key" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ArtifactTimeline from '@/components/ArtifactTimeline.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactsMock } from '@/demo/compositions/useArtifactsMock'
  import { data } from '@/demo/utilities/data'
  import { ArtifactType, artifactTypes } from '@/index'
  import { mocker } from '@/services'


  const type = ref<ArtifactType>('table')
  const typeOptions = ref([...artifactTypes])
  const key = `${mocker.create('adjective')}-${mocker.create('noun')}`

  useArtifactsMock(20, { key, type: 'table' })

  const addArtifact = (): void => {
    const [lastArtifact] = data.artifacts.getAll().sort((a, b) => b.created.getTime() - a.created.getTime())
    const created = mocker.create('date', [lastArtifact.created, new Date()])

    const artifact = mocker.create('artifact', [
      {
        key,
        type: type.value,
        created,
      },
    ])

    data.artifacts.create(artifact)
  }
</script>

<style>
.artifact-timeline__header { @apply
  flex
  items-center
  justify-end
  mb-4
  gap-4
}
</style>