<template>
  <ComponentPage title="FlowRunStateTypeTab">
    <FlowRunStateTypeTab />
  </ComponentPage>
</template>

<script lang="ts" setup>

  import ComponentPage from '@/demo/components/ComponentPage.vue';
  import {FlowRunStateTypeTab} from "@/components"; // Adjust the import path if needed
  import { useFlowRunsMock } from "@/demo/compositions/useFlowRunsMock";

useFlowRunsMock(5);

</script>
