<template>
  <div class="color-mode-select-option" :class="modeClass">
    <div class="color-mode-select-option__label">
      {{ mode ?? 'default' }}
    </div>
    <div class="color-mode-select-option__states">
      <template v-for="state in stateType" :key="state">
        <span class="color-mode-select-option__state" :class="stateClass(state)" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { stateType, StateType } from '@/models/StateType'
  import { ColorMode } from '@/types/ColorMode'
  import { getColorModeClass } from '@/utilities'

  const props = defineProps<{
    mode: ColorMode | null,
  }>()

  const modeClass = computed(() => getColorModeClass(props.mode))

  function stateClass(stateType: StateType): string {
    return `color-mode-select-option__state--${stateType}`
  }
</script>

<style>
.color-mode-select-option { @apply
  flex
  items-center
  justify-between
  gap-2
}

.color-mode-select-option__label { @apply
  capitalize
}

.color-mode-select-option__states { @apply
  flex
  items-center
  gap-1
}

.color-mode-select-option__state { @apply
  w-4
  h-4
  rounded-full
}

.color-mode-select-option__state--running {
  background-color: var(--state-running-500);
}

.color-mode-select-option__state--scheduled {
  background-color: var(--state-scheduled-500);
}

.color-mode-select-option__state--pending {
  background-color: var(--state-pending-500);
}

.color-mode-select-option__state--paused {
  background-color: var(--state-paused-500);
}

.color-mode-select-option__state--cancelled {
  background-color: var(--state-cancelled-500);
}

.color-mode-select-option__state--completed {
  background-color: var(--state-completed-500);
}

.color-mode-select-option__state--failed {
  background-color: var(--state-failed-500);
}

.color-mode-select-option__state--crashed {
  background-color: var(--state-crashed-500);
}
</style>