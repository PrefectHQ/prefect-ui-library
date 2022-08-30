<template>
  <p-tag class="state-badge" :class="classes" :dismissible="dismissible">
    <StateIcon v-if="!stateWithNoType" :state-type="type" :shade="iconShade" class="state-badge__icon" />
    <span>{{ name }}</span>
  </p-tag>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import StateIcon from './StateIcon.vue'
  import { StateType } from '@/models/StateType'
  import { TailwindColor } from '@/types/tailwind'
  import { mapStateNameToStateType } from '@/utilities/state'

  const props = defineProps<{
    state: { name: string, type: StateType | null } | null,
    flat?: boolean,
    dismissible?: boolean,
  }>()

  const stateWithNoType = computed(() => props.state && !props.state.type)
  const type = computed(() => mapStateNameToStateType(props.state?.name).type)
  const name = computed(() => props.state?.name ?? 'Unknown')

  const classes = computed(() => [
    `state--${type.value}`, {
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

.state-badge__icon { @apply
  w-4
  h-4
}

.state-badge--flat { @apply
  p-0
  bg-transparent
  text-slate-700
}
</style>