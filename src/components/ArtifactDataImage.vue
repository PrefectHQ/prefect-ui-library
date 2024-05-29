<template>
  <div class="artifact-data-image">
    <img loading="eager" :src="artifact.data">
    <br>
    <p>
      <span>Image URL: </span>
      <p-link :to="artifact.data">
        {{ artifact.data }}
      </p-link>
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { ImageArtifact } from '@/models'

  defineProps<{
    artifact: ImageArtifact,
  }>()
</script>

<style>
.artifact-data-image { @apply
  max-w-full
}
</style>
