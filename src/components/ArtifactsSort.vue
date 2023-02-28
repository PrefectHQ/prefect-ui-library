<template>
  <p-select v-model="internalValue" :options="artifactSortOptions" class="artifacts-sort" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { ArtifactSortValues, artifactSortOptions } from '@/types/SortOptionTypes'

  const props = defineProps<{
    modelValue?: ArtifactSortValues | null | undefined,
  }>()

  const emits = defineEmits<{
    (event: 'update:modelValue', value: ArtifactSortValues | null | undefined): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emits('update:modelValue', value)
    },
  })
</script>
