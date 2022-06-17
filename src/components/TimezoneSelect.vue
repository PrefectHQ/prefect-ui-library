<template>
  <p-select v-model="internalValue" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { ref } from 'vue'

  const internalValue = ref('Local')
  const options: SelectOption[] = []
</script>