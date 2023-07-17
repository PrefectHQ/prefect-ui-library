<template>
  <ComponentPage title="SimpleTimeSpanFilter">
    <SimpleTimeSpanFilter v-model:selected="selected" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { secondsInDay } from 'date-fns'
  import { ref } from 'vue'
  import SimpleTimeSpanFilter from '@/components/SimpleTimeSpanFilter.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const selected = ref(secondsInDay)
</script>
