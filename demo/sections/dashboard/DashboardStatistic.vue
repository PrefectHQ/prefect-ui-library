<template>
  <ComponentPage title="DashboardStatistic" :demos="demos">
    <DashboardStatistic :value="100000" />

    <template #label>
      <DashboardStatistic :value="100000" label="Events" />
    </template>

    <template #meta>
      <DashboardStatistic :value="100000" label="Events" meta="88%" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import DashboardStatistic from '@/components/DashboardStatistic.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Label' },
    { title: 'meta' },
  ]
</script>
