<template>
  <ComponentPage title="StatisticKeyValue" :demos="demos">
    <StatisticKeyValue :value="100000" />

    <template #label>
      <StatisticKeyValue :value="100000" label="Events" />
    </template>

    <template #meta>
      <StatisticKeyValue :value="100000" label="Events" meta="88%" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import StatisticKeyValue from '@/components/StatisticKeyValue.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Label' },
    { title: 'meta' },
  ]
</script>
