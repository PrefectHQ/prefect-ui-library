<template>
  <span class="state-badge" :class="classes">
    <state-icon :state-type="type" :shade="iconShade" class="w-4 h-4" />
    {{ state.name }}
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import StateIcon from './StateIcon.vue'
  import { StateType } from '@/models'
  import { IState } from '@/models/State'
  import { TailwindColor } from '@/types/tailwind'

  const props = defineProps<{
    state: IState,
    flat?: boolean,
  }>()

  const stateBackgroundShades: Record<StateType, TailwindColor> = {
    completed: 50,
    cancelled: 100,
    failed: 50,
    pending: 300,
    running: 100,
    scheduled: 100,
  }

  const stateTextShades: Record<StateType, TailwindColor> = {
    completed: 600,
    cancelled: 600,
    failed: 700,
    pending: 800,
    running: 700,
    scheduled: 700,
  }

  const type = computed(() => props.state.type)

  const classes = computed(() => ({
    [`text-state-${type.value}-${stateTextShades[type.value]}`]: !props.flat,
    [`bg-state-${type.value}-${stateBackgroundShades[type.value]}`]: !props.flat,
    'state-badge--flat': props.flat,
  }))

  const iconShade = computed<TailwindColor>(() => props.flat ? 500 : 700)
</script>

<style>
.state-badge { @apply
  flex
  gap-1
  items-center
  text-xs
  font-semibold
  rounded-full
  py-0.5
  px-2.5
}

.state-badge--flat { @apply
  p-0
}
</style>