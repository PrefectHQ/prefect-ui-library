<template>
  <ComponentPage title="TimeSpanFilter">
    <TimeSpanFilter v-model:selected="selected" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { secondsInDay } from 'date-fns'
  import { ref } from 'vue'
  import TimeSpanFilter from '@/components/TimeSpanFilter.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const selected = ref(secondsInDay)
</script>
