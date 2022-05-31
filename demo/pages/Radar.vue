<template>
  <p-layout-default class="radar">
    <RadarNodeSection />
    <RadarSmallSection />
  </p-layout-default>
</template>

<script lang="ts" setup>
  import RadarNodeSection from '../sections/RadarNodeSection.vue'
  import RadarSmallSection from '../sections/RadarSmallSection.vue'
</script>