<template>
  <DemoSection heading="Selects">
    <DemoSubSection heading="Flows">
      <FlowSelect v-model:selected="selectedFlow" />
    </DemoSubSection>
    <DemoSubSection heading="Deployments">
      <DeploymentSelect v-model:selected="selectedDeployment" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentSelect from '@/components/DeploymentSelect.vue'
  import FlowSelect from '@/components/FlowSelect.vue'

  const selectedFlow = ref('')
  const selectedDeployment = ref('')
</script>