<template>
  <ComponentPage title="FlowRunStateTypeTab">
    <FlowRunStateTypeTab :filter="myFlowRunsFilter" />
  </ComponentPage>
</template>

<script lang="ts" setup>

  import { ref } from 'vue';
  import { secondsInDay } from 'date-fns';
  import ComponentPage from '@/demo/components/ComponentPage.vue';
  import {FlowRunStateTypeTab} from "@/components"; // Adjust the import path if needed
  import { useFlowRunsMock } from "@/demo/compositions/useFlowRunsMock";


  const selected = ref(secondsInDay);
 const myFlowRunsFilter = {
    flowRuns: {
      state: {
        type: ['running', 'pending','failed'],
      },

    },

  };

 function getFlowRuns() {
  const selectedStateTypes = myFlowRunsFilter.flowRuns.state.type;
  const flowRunsData = useFlowRunsMock(7);

  // Filter flow runs based on their state type matching the selected tab
  const filteredFlowRuns = flowRunsData.filter((flowrun) => {
    // Perform a type check to ensure flowrun.state is not null before making the comparison
    if (flowrun.state !== null) {
      // Convert flowrun.state to a string before comparison
      const stateAsString = flowrun.state.toString();
      return selectedStateTypes.includes(stateAsString);
    }
    return false; // If flowrun.state is null, exclude it from the filtered result
  });

  return filteredFlowRuns;
}



</script>
