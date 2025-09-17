<template>
  <div class="run-graph" :class="classes.root">
    <div ref="stage" class="run-graph__stage" />
    <div class="run-graph__actions">
      <p-button title="Recenter graph (c)" icon="Target" flat @click="center" />
      <p-button title="Toggle fullscreen (f)" icon="ArrowsPointingOutIcon" flat @click="toggleFullscreen" />
      <RunGraphSettings />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    GraphItemSelection,
    RunGraphProps,
    ViewportDateRange
    , centerViewport, emitter, selectItem, setConfig, start, stop, updateViewportFromDateRange
  } from '@prefecthq/graphs'
  import { useKeyDown } from '@prefecthq/vue-compositions'
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  /* eslint-disable-next-line no-relative-import-paths/no-relative-import-paths */
  import RunGraphSettings from './RunGraphSettings.vue'
  import { eventTargetIsInput } from '@/utilities/eventTarget'

  // using the props object as a whole
  // eslint-disable-next-line vue/no-unused-properties
  const props = withDefaults(defineProps<RunGraphProps>(), {
    fullscreen: null,
    selected: null,
  })

  const emit = defineEmits<{
    (event: 'update:viewport', value: ViewportDateRange): void,
    (event: 'update:fullscreen', value: boolean): void,
    (event: 'update:selected', value: GraphItemSelection | null): void,
  }>()

  const stage = ref<HTMLDivElement>()

  const fullscreenInternal = ref(false)
  const fullscreenModel = computed({
    get() {
      return props.fullscreen ?? fullscreenInternal.value
    },
    set(value) {
      fullscreenInternal.value = value
      emit('update:fullscreen', value)
    },
  })

  watch(() => props.selected, selected => selectItem(selected))

  emitter.on('itemSelected', nodeId => emit('update:selected', nodeId))

  watch(() => props.viewport, viewport => updateViewportFromDateRange(viewport))
  watch(() => props.config, config => setConfig(config))

  const classes = computed(() => ({
    root: {
      'run-graph--fullscreen': fullscreenModel.value,
    },
  }))

  emitter.on('viewportDateRangeUpdated', range => emit('update:viewport', range))

  function center(): void {
    centerViewport({ animate: true })
  }

  function toggleFullscreen(): void {
    fullscreenModel.value = !fullscreenModel.value
  }

  onMounted(() => {
    if (!stage.value) {
      throw new Error('Stage does not exist')
    }

    start({
      stage: stage.value,
      config: props.config,
    })
  })

  onBeforeUnmount(() => {
    stop()
  })

  useKeyDown(['c', 'f', 'Escape'], shortcutHandler)

  function shortcutHandler(event: KeyboardEvent): void {
    if (eventTargetIsInput(event.target) || event.metaKey || event.ctrlKey) {
      return
    }

    switch (event.key) {
      case 'c':
        center()
        break
      case 'f':
        toggleFullscreen()
        break
      case 'Escape':
        if (fullscreenModel.value) {
          toggleFullscreen()
        }
        break
    }
  }
</script>

<style>
.run-graph {
  position: relative;
}

.run-graph--fullscreen {
  position: fixed;
  height: 100vh !important;
  width: 100vw !important;
  left: 0;
  top: 0;
}

.run-graph__stage,
.run-graph__stage > canvas {
  width: 100%;
  height: 100%;
}

.run-graph__actions {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
