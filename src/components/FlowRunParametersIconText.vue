<template>
  <p-icon-text v-bind="$attrs" icon="AdjustmentsVerticalIcon" class="flow-run-parameters-icon-text">
    <template v-if="hasParameters">
      <button type="button" class="flow-run-parameters-icon-text__button" @click="open">
        {{ parametersCount }} {{ toPluralString('parameter', parametersCount) }}
      </button>
    </template>
    <template v-else>
      <span class="flow-run-parameters-icon-text__none">0 parameters</span>
    </template>
  </p-icon-text>

  <p-modal v-model:show-modal="showModal" :title="`Flow run parameters for ${flowRun.name}`" auto-close>
    <p-code-highlight lang="json" :text="stringify(flowRun.parameters)" />
  </p-modal>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { FlowRun } from '@/models/FlowRun'
  import { stringify } from '@/utilities/json'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const parametersCount = computed(() => Object.keys(props.flowRun.parameters).length)
  const hasParameters = computed(() => parametersCount.value > 0)
  const { showModal, open } = useShowModal()
</script>

<style>
.flow-run-parameters-icon-text__none { @apply
  text-subdued
}

.flow-run-parameters-icon-text__button { @apply
  text-link
}
</style>