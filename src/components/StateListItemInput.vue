<template>
  <p-list-item-input v-model:selected="model" :value="value" class="state-list-item-input" :class="classes" disabled>
    <slot />
  </p-list-item-input>
</template>

<script lang="ts" setup>
  import { PListItemInput } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { StateType } from '@/models/StateType'

  type Selected = boolean | unknown[] | undefined

  const props = defineProps<{
    selected: Selected | null,
    value: unknown,
    stateType: StateType | null | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: Selected): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: Selected) {
      emit('update:selected', value)
    },
  })

  const classes = computed(() => `state-list-item-input--${props.stateType ?? 'unknown'}`)
</script>

<style>
.state-list-item-input--completed .list-item-input__checkbox { @apply
  bg-state-completed-500
}

.state-list-item-input--running .list-item-input__checkbox { @apply
  bg-state-running-500
}

.state-list-item-input--scheduled .list-item-input__checkbox { @apply
  bg-state-scheduled-500
}

.state-list-item-input--pending .list-item-input__checkbox { @apply
  bg-state-pending-500
}

.state-list-item-input--failed .list-item-input__checkbox { @apply
  bg-state-failed-500
}

.state-list-item-input--cancelled .list-item-input__checkbox { @apply
  bg-state-cancelled-500
}
</style>