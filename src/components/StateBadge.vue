<template>
  <span class="state-badge" :class="classes">
    <state-icon :state-type="state?.type" :shade="iconShade" class="w-4 h-4" />
    {{ name }}
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import StateIcon from './StateIcon.vue'
  import { IState } from '@/models/State'
  import { TailwindColor } from '@/types/tailwind'

  const props = defineProps<{
    state: IState | null,
    flat?: boolean,
  }>()

  const type = computed(() => props.state?.type ?? 'unknown')
  const name = computed(() => props.state?.name ?? 'Unknown')

  const classes = computed(() => [
    `state-badge--${type.value}`, {
      'state-badge--flat': props.flat,
    },
  ])

  const iconShade = computed<TailwindColor>(() => props.flat ? 500 : 700)
</script>

<style>
.state-badge { @apply
  inline-flex
  gap-1
  items-center
  text-xs
  font-semibold
  rounded-full
  py-0.5
  px-2.5
}

.state-badge--completed { @apply
  bg-state-completed-50
  text-state-completed-600
}

.state-badge--running { @apply
  bg-state-running-100
  text-state-running-700
}

.state-badge--scheduled { @apply
  bg-state-scheduled-100
  text-state-scheduled-700
}

.state-badge--pending { @apply
  bg-state-pending-300
  text-state-pending-800
}

.state-badge--failed { @apply
  bg-state-failed-50
  text-state-failed-700
}

.state-badge--cancelled { @apply
  bg-state-cancelled-100
  text-state-cancelled-600
}

.state-badge--unknown { @apply
  bg-slate-300
  text-slate-700
}

.state-badge--flat { @apply
  p-0
  bg-transparent
  text-slate-700
}
</style>