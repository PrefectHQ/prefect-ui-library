<template>
  <p-select v-model="model" :options="options" class="artifact-type-select" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { ArtifactType, artifactTypes } from '@/models'
  import { capitalize } from '@/utilities'

  const props = defineProps<{
    selected: string | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })

  const options: (SelectOption & { value: ArtifactType | null })[] = [
    { label: 'All', value: null },
    ...artifactTypes.map((type) => ({ label: capitalize(type), value: type })),
  ].sort((alpha, beta) => alpha.label.localeCompare(beta.label))
</script>