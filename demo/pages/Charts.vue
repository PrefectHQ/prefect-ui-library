<template>
  <p-layout-default class="charts">
    <ScatterPlotSection />
    <RadarSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import RadarSection from '../sections/RadarSection.vue'
  import ScatterPlotSection from '../sections/ScatterPlotSection.vue'
</script>