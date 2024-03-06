<template>
  <JsonInput
    v-model="modelValue"
    show-line-numbers
    :min-lines="3"
    class="job-variable-overrides-input"
    show-format-button
  />
</template>

<script setup lang="ts">
  import JsonInput from '@/components/JsonInput.vue'

  const modelValue = defineModel<string>()
</script>

<style>
.job-variable-overrides-input { @apply
  min-h-[2.5rem]
  min-w-full
  resize-y
}
</style>

