<template>
  <p-layout-default class="radar">
    <RadarNodeSection />
    <MiniRadarSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import MiniRadarSection from '../sections/MiniRadarSection.vue'
  import RadarNodeSection from '../sections/RadarNodeSection.vue'
</script>