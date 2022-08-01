<template>
  <DemoSection heading="Run Button">
    <RunButton :deployment="deployment" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import RunButton from '@/components/RunButton.vue'
  import { mocker } from '@/services'

  const deployment = ref(mocker.create('deployment'))
</script>