<template>
  <PPopOver class="flow-run-pop-over" group="flow-run-pop-over" auto-close :placement="placement">
    <template #target="{ open }">
      <div class="flow-run-pop-over__trigger" @mouseover="open" />
    </template>

    <div class="flow-run-pop-over__content">
      <FlowRunPopoverContent :flow-run-id="flowRunId" />
    </div>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { PPopOver, positions } from '@prefecthq/prefect-design'
  import FlowRunPopoverContent from '@/components/FlowRunPopOverContent.vue'

  defineProps<{
    flowRunId: string,
  }>()

  const placement = [positions.top, positions.bottom, positions.right, positions.left]
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