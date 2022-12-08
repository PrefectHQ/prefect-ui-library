<template>
  <p-pop-over ref="popOver" class="run-menu" auto-close :placement="placement" @keydown.esc="esc">
    <template #target="{ toggle }">
      <p-button
        ref="runButton"
        class="run-menu__run-button"
        inset
        :disabled="deployment.deprecated"
        @click="toggle"
      >
        Run
        <p-icon class="run-menu__run-icon" icon="PlayIcon" solid />
      </p-button>
    </template>
    <p-overflow-menu class="run-menu__overflow-menu" @click="close">
      <DeploymentQuickRunOverflowMenuItem :deployment="deployment" />
      <DeploymentCustomRunOverflowMenuItem :deployment-id="deployment.id" />
    </p-overflow-menu>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { PPopOver, PButton, positions } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import { DeploymentQuickRunOverflowMenuItem, DeploymentCustomRunOverflowMenuItem } from '@/components'
  import { Deployment } from '@/models'

  defineProps<{
    deployment: Deployment,
  }>()

  const popOver = ref<InstanceType<typeof PPopOver>>()
  const runButton = ref<InstanceType<typeof PButton>>()
  const placement = [positions.bottomRight, positions.bottomLeft, positions.topRight, positions.topLeft]

  function close(): void {
    if (popOver.value) {
      popOver.value.close()
    }
  }

  function esc(): void {
    close()

    if (runButton.value?.el) {
      runButton.value.el.focus()
    }
  }
</script>

<style>
.run-menu { @apply
  inline-block
}

.run-menu__overflow-menu { @apply
  max-w-xs
  my-2
}

.run-menu__run-icon { @apply
  w-5
  h-5
}
</style>

