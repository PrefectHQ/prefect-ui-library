<template>
  <div class="flow-run-state-type-empty">
    <template v-if="component">
      <component :is="component" class="flow-run-state-type-empty__img" />
    </template>

    <p class="flow-run-state-type-empty__message">
      {{ description }}
    </p>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import FlowRunStateTypeEmptyAwaitingImage from '@/components/FlowRunStateTypeEmptyAwaitingImage.vue'
  import FlowRunStateTypeEmptyBadTerminalImage from '@/components/FlowRunStateTypeEmptyBadTerminalImage.vue'
  import FlowRunStateTypeEmptyGoodTerminalImage from '@/components/FlowRunStateTypeEmptyGoodTerminalImage.vue'
  import FlowRunStateTypeEmptyLiveImage from '@/components/FlowRunStateTypeEmptyLiveImage.vue'
  import { StateType } from '@/models'
  import { MaybeArray } from '@/types'
  import { asArray } from '@/utilities'

  const props = defineProps<{
    stateType: MaybeArray<StateType>,
  }>()

  const states = computed(() => asArray(props.stateType))

  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'disjunction' })
  const description = computed(() => {
    const statesString = formatter.format(states.value)

    return `You currently have 0 ${statesString} runs.`
  })

  const component = computed(() => {
    if (states.value.includes('failed')) {
      return FlowRunStateTypeEmptyBadTerminalImage
    }

    if (states.value.includes('running')) {
      return FlowRunStateTypeEmptyLiveImage
    }

    if (states.value.includes('completed')) {
      return FlowRunStateTypeEmptyGoodTerminalImage
    }

    if (states.value.includes('scheduled')) {
      return FlowRunStateTypeEmptyAwaitingImage
    }

    return null
  })
</script>

<style>
.flow-run-state-type-empty { @apply
  flex
  flex-col
  items-center
  gap-8
  my-20
}

.flow-run-state-type-empty__img { @apply
  h-32
}

.flow-run-state-type-empty__message { @apply
  text-lg
  text-center
  max-w-xs
}
</style>