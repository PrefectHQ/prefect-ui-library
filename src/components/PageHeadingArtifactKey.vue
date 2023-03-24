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
  import ArtifactMenu from '@/components/ArtifactMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { pluralize } from '@/utilities'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const routes = useWorkspaceRoutes()

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = [
      {
        text: pluralize(localization.info.artifact),
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