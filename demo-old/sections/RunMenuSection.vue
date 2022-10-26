<template>
  <DemoSection heading="Run Menu">
    <RunMenu :deployment="deployment" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import RunMenu from '@/components/RunMenu.vue'
  import { mocker } from '@/services'

  const deployment = ref(mocker.create('deployment'))
</script>