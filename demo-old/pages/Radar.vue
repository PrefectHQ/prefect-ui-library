<template>
  <p-layout-default class="radar">
    <RadarNodeSection />
    <RadarSmallSection />
    <RadarSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import { PLayoutDefault } from '@prefecthq/prefect-design'
  import RadarNodeSection from '../sections/RadarNodeSection.vue'
  import RadarSection from '../sections/RadarSection.vue'
  import RadarSmallSection from '../sections/RadarSmallSection.vue'
</script>