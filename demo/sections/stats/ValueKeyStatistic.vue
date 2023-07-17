<template>
  <ComponentPage title="ValueKeyStatistic" :demos="demos">
    <ValueKeyStatistic :value="100000" />

    <template #label>
      <ValueKeyStatistic :value="100000" label="Events" />
    </template>

    <template #meta>
      <ValueKeyStatistic :value="100000" label="Events" meta="88%" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ValueKeyStatistic from '@/components/ValueKeyStatistic.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Label' },
    { title: 'meta' },
  ]
</script>
