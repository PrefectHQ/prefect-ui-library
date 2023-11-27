<template>
  <span class="flow-run-name">
    <template v-if="flowRun">
      <FlowRunIconText :flow-run-id="flowRun.id" />
      <template v-if="flowRun.state">
        <p-tooltip :text="flowRun.state.name">
          <StateIcon :state-type="flowRun.state.type" :class="stateIconClass" />
        </p-tooltip>
      </template>
    </template>
    <template v-else>
      <span class="flow-run-name__none">{{ localization.info.none }}</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { FlowRunIconText, StateIcon } from '@/components'
  import { localization } from '@/localization'
  import { FlowRun } from '@/models'

  const props = defineProps<{
    flowRun?: FlowRun,
  }>()

  const stateIconClass = computed(() => props.flowRun?.state ? `state-text--${props.flowRun.state.type}` : '')
</script>

<style>
.flow-run-name { @apply
  inline-flex
  items-center
  gap-1
}

.flow-run-name__none { @apply
  text-subdued
}
</style>