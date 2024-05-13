<template>
  <ExtraInfoModal title="Catchup">
    When catchup is set to true, the scheduler will submit any runs in a state state for execution. When catchup is set to false,
    the scheduler will only submit runs for execution that are scheduled to run in the future, cancelling and skipping any late runs.
  </ExtraInfoModal>
</template>

<script lang="ts" setup>
  import ExtraInfoModal from '@/components/ExtraInfoModal.vue'
</script>