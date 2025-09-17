<template>
  <p-pop-over
    class="run-graph-settings"
    auto-close
    :placement="placement"
  >
    <template #target="{ toggle }">
      <p-button
        aria-label="Run Graph Options"
        icon="CogIcon"
        flat
        @click="toggle"
      />
    </template>

    <p-overflow-menu class="run-graph-settings__menu">
      <p-label label="Layout">
        <p-radio-group :model-value="selectedLayoutOption" :options="layoutOptions" @update:model-value="setSelectedLayoutOption">
          <template #label="{ option }">
            {{ option.label }}
          </template>
        </p-radio-group>
      </p-label>
      <template v-if="layout.isTemporal() || layout.isLeftAligned()">
        <p-divider />
        <p-label label="Scaling">
          <div class="flex items-center gap-2">
            <p-button title="Decrease scale (-)" small icon="MinusIcon" @click="decreaseScale" />
            <p-button title="Increase scale (+)" small icon="PlusIcon" @click="increaseScale" />
            <p-button small @click="resetScale">
              Reset
            </p-button>
          </div>
        </p-label>
      </template>
      <p-divider />
      <p-checkbox :model-value="hideEdges" label="Hide dependency arrows" @update:model-value="setHideEdges" />
      <p-checkbox :model-value="hideArtifacts" label="Hide artifacts" @update:model-value="setHideArtifacts" />
      <p-checkbox :model-value="hideEvents" label="Hide events" @update:model-value="setHideEvents" />
    </p-overflow-menu>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import {
    DEFAULT_HORIZONTAL_SCALE_MULTIPLIER,
    HorizontalMode,
    isHorizontalMode,
    isVerticalMode,
    VerticalMode
    , layout, resetHorizontalScaleMultiplier, setDisabledArtifacts, setDisabledEdges, setDisabledEvents, setHorizontalMode, setHorizontalScaleMultiplier, setVerticalMode
  } from '@prefecthq/graphs'
  import { CheckboxModel, PButton, positions, PPopOver, SelectModelValue } from '@prefecthq/prefect-design'
  import { useKeyDown } from '@prefecthq/vue-compositions'
  import { ref } from 'vue'
  import { eventTargetIsInput } from '@/utilities/eventTarget'

  type Option<T extends string> = {
    value: T,
    label: string,
  }

  const placement = [positions.topRight, positions.bottomRight, positions.topLeft, positions.bottomLeft]

  type LayoutOption = `${HorizontalMode}_${VerticalMode}`

  function isLayoutOption(value: string): value is LayoutOption {
    const [horizontal, vertical] = value.split('_')

    return isHorizontalMode(horizontal) && isVerticalMode(vertical)
  }

  const layoutOptions: Option<LayoutOption>[] = [
    {
      label: 'Temporal dependency',
      value: 'temporal_nearest-parent',
    }, {
      label: 'Temporal sequence',
      value: 'temporal_waterfall',
    }, {
      label: 'Dependency grid',
      value: 'dependency_nearest-parent',
    }, {
      label: 'Sequential grid',
      value: 'dependency_waterfall',
    }, {
      label: 'Comparative duration',
      value: 'left-aligned_duration-sorted',
    },
  ]

  const selectedLayoutOption = ref<LayoutOption>(`${layout.horizontal}_${layout.vertical}`)

  function setSelectedLayoutOption(value: SelectModelValue): void {
    if (typeof value !== 'string' || !isLayoutOption(value)) {
      return
    }

    selectedLayoutOption.value = value

    const [horizontal, vertical] = value.split('_') as [HorizontalMode, VerticalMode]

    setHorizontalMode(horizontal)
    setVerticalMode(vertical)
  }

  const hideEdges = ref(layout.disableEdges)

  function setHideEdges(value: CheckboxModel): void {
    hideEdges.value = Boolean(value)
    setDisabledEdges(hideEdges.value)
  }

  const hideArtifacts = ref(layout.disableArtifacts)

  function setHideArtifacts(value: CheckboxModel): void {
    hideArtifacts.value = Boolean(value)
    setDisabledArtifacts(hideArtifacts.value)
  }

  const hideEvents = ref(layout.disableEvents)

  function setHideEvents(value: CheckboxModel): void {
    hideEvents.value = Boolean(value)
    setDisabledEvents(hideEvents.value)
  }

  function increaseScale(): void {
    const multiplier = DEFAULT_HORIZONTAL_SCALE_MULTIPLIER + 1
    const scale = layout.horizontalScaleMultiplier * multiplier

    setHorizontalScaleMultiplier(scale)
  }

  function decreaseScale(): void {
    const multiplier = Math.abs(DEFAULT_HORIZONTAL_SCALE_MULTIPLIER - 1)
    const scale = layout.horizontalScaleMultiplier * multiplier

    setHorizontalScaleMultiplier(scale)
  }

  useKeyDown(['-', '='], shortcutHandler)

  function shortcutHandler(event: KeyboardEvent): void {
    if (eventTargetIsInput(event.target) || event.metaKey || event.ctrlKey) {
      return
    }

    switch (event.key) {
      case '-':
        decreaseScale()
        break
      case '=':
        increaseScale()
        break
    }
  }

  function resetScale(): void {
    resetHorizontalScaleMultiplier()
  }
</script>

<style>
.run-graph-settings {
  display: inline-block;
}

.run-graph-settings__menu {
  padding: 0.5rem;
}
</style>