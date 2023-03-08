<template>
  <div class="artifact-data-result">
    <template v-for="[key, value] in data" :key="key">
      <p-key-value :label="key" :value="value" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { ResultArtifact } from '@/models'

  const props = defineProps<{
    artifact: ResultArtifact,
  }>()

  const data = computed(() => Object.entries(props.artifact.data))
</script>

<style>
.artifact-data-result { @apply
  max-w-full
  overflow-auto
}
</style>