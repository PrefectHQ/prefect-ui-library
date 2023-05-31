<template>
  <ComponentPage title="DashboardTimeSpanFilter">
    <DashboardTimeSpanFilter v-model:selected="selected" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { secondsInDay } from 'date-fns'
  import { ref } from 'vue'
  import DashboardTimeSpanFilter from '@/components/DashboardTimeSpanFilter.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const selected = ref(secondsInDay)
</script>
