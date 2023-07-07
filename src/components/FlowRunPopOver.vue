<template>
  <PPopOver class="flow-run-pop-over" group="flow-run-pop-over" auto-close>
    <template #target="{ open }">
      <div class="flow-run-pop-over__trigger" @mouseover="open" />
    </template>

    <div class="flow-run-pop-over__content">
      <FlowRunPopoverContent :flow-run-id="flowRunId" />
    </div>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { PPopOver } from '@prefecthq/prefect-design'
  import FlowRunPopoverContent from '@/components/FlowRunPopOverContent.vue'

  defineProps<{
    flowRunId: string,
  }>()
</script>

<style>
.flow-run-pop-over { @apply
  absolute
  top-[-2px]
  left-[-2px]
  right-[-2px]
  bottom-[-2px]
  rounded-full
  overflow-hidden
  cursor-pointer
}

.flow-run-pop-over__trigger { @apply
  w-full
  h-full
}

.flow-run-pop-over__content { @apply
  p-2
  pointer-events-none
}
</style>