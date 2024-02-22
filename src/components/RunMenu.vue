<template>
  <p-pop-over ref="popOver" class="run-menu" auto-close :placement="placement" @keydown.esc="esc">
    <template #target="{ toggle }">
      <p-button
        ref="runButton"
        class="run-menu__run-button"
        icon-append="PlayIcon"
        :disabled="deployment.deprecated"
        @click="toggle"
      >
        Run
      </p-button>
    </template>
    <p-overflow-menu class="run-menu__overflow-menu" @click="close">
      <DeploymentQuickRunOverflowMenuItem :deployment="deployment" :open-modal="openParametersModal" />
      <DeploymentCustomRunOverflowMenuItem :deployment="deployment" />
    </p-overflow-menu>
  </p-pop-over>
  <QuickRunParametersModal v-model:showModal="showParametersModalV1" :deployment="deployment" />
  <QuickRunParametersModalV2 v-model:showModal="showParametersModalV2" :deployment="deployment" />
</template>

<script lang="ts" setup>
  import { PPopOver, PButton, positions } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import {
    DeploymentCustomRunOverflowMenuItem,
    DeploymentQuickRunOverflowMenuItem,
    QuickRunParametersModal
  } from '@/components'
  import QuickRunParametersModalV2 from '@/components/QuickRunParametersModalV2.vue'
  import { useCan, useShowModal } from '@/compositions'
  import { Deployment } from '@/models'

  defineProps<{
    deployment: Deployment,
  }>()

  const popOver = ref<InstanceType<typeof PPopOver>>()
  const runButton = ref<InstanceType<typeof PButton>>()
  const placement = [positions.bottomRight, positions.bottomLeft, positions.topRight, positions.topLeft]
  const can = useCan()

  const { showModal: showParametersModalV1, open: openParametersModalV1 } = useShowModal()
  const { showModal: showParametersModalV2, open: openParametersModalV2 } = useShowModal()


  function openParametersModal(): void {
    if (can.access.schemasV2) {
      openParametersModalV2()
      return
    }

    openParametersModalV1()
  }

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
</style>

