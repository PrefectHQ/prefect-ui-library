<template>
  <PageHeading class="page-heading-artifact-key" :crumbs="crumbs">
    <template #actions>
      <ArtifactMenu :artifact="artifact" />
    </template>
  </PageHeading>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useComponent, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact, ArtifactCollection } from '@/models'

  const props = defineProps<{
    artifact: Artifact | ArtifactCollection,
  }>()

  const routes = useWorkspaceRoutes()

  const { ArtifactMenu } = useComponent()

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = [
      {
        text: localization.info.artifacts,
        to: routes.artifacts(),
      },
    ]

    if (props.artifact.key) {
      internalCrumbs.push({
        text: props.artifact.key,
      })
    }

    return internalCrumbs
  })
</script>