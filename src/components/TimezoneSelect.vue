<template>
  <p-select v-model="internalValue" :options="options" />
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import { timezones } from '@/utilities'


  const internalValue = ref('Local')
  const options: SelectOption[] = timezones.map((timezone) => ({ label: timezone, value: timezone }))
</script>