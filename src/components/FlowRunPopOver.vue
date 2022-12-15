<template>
  <PPopOver ref="popover" class="flow-run-pop-over">
    <template #target>
      <div ref="trigger" class="flow-run-pop-over__trigger" @mouseover="open" />
    </template>

    <div ref="content" class="flow-run-pop-over__content">
      <FlowRunPopoverContent :flow-run-id="flowRunId" />
    </div>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { PPopOver } from '@prefecthq/prefect-design'
  import { onMounted, onUnmounted, ref } from 'vue'
  import FlowRunPopoverContent from '@/components/FlowRunPopOverContent.vue'

  defineProps<{
    flowRunId: string,
  }>()

  const popover = ref<InstanceType<typeof PPopOver>>()
  const trigger = ref<HTMLDivElement>()
  const content = ref<HTMLDivElement>()

  onMounted(() => {
    document.addEventListener('mouseover', mouseover)
    document.addEventListener('click', click)
  })

  onUnmounted(() => {
    document.removeEventListener('mouseover', mouseover)
    document.removeEventListener('click', click)
  })

  function open(): void {
    if (popover.value) {
      popover.value.open()
    }
  }

  function click(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (!popover.value || !content.value) {
      return
    }

    if (content.value.contains(target)) {
      return
    }

    popover.value.close()
  }

  function mouseover(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (!popover.value || !trigger.value) {
      return
    }

    if (trigger.value.contains(target) || !target.classList.contains('flow-run-pop-over__trigger')) {
      return
    }

    popover.value.close()
  }
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
</style>