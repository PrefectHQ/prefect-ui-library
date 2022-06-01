<template>
  <p-layout-default class="charts">
    <ScatterPlotSection />
    <ActivityChartSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import ActivityChartSection from '../sections/ActivityChartSection.vue'
  import ScatterPlotSection from '../sections/ScatterPlotSection.vue'
</script>