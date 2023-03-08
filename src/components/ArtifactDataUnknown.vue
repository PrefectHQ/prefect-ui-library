<template>
  <div class="artifact-data-unknown">
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { UnknownArtifact } from '@/models'

  const props = defineProps<{
    artifact: UnknownArtifact,
  }>()

  const data = computed(() => props.artifact.data)
</script>

<style>
.artifact-data-unknown { @apply
  max-w-full
  overflow-auto
}
</style>