<template>
  <p-tag class="state-badge" :class="classes" :dismissible="dismissible">
    <StateIcon v-if="!stateWithNoType" :state-type="type" :shade="iconShade" class="state-badge__icon" />
    <span>{{ name }}</span>
  </p-tag>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import StateIcon from '@/components/StateIcon.vue'
  import { StateBadgeState } from '@/types/stateBadge'
  import { TailwindColor } from '@/types/tailwind'
  import { mapStateNameToStateType } from '@/utilities/state'

  const props = defineProps<{
    state: StateBadgeState | null,
    flat?: boolean,
    dismissible?: boolean,
  }>()

  const type = computed(() => props.state?.type ?? mapStateNameToStateType(props.state?.name).type)
  const stateWithNoType = computed(() => props.state && !type.value)
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
  !text-inherit
}

.state-badge--flat { @apply
  py-0
  bg-transparent
}
</style>