<template>
  <StateListItem v-model:selected="model" v-bind="{ value, tags, stateType }" :disabled="disabled || deleted" class="flow-run-list-item" :class="deleted ? 'flow-run-list-item__deleted' : '' ">
    <template #name>
      <FlowRouterLink :flow-id="flowRun.flowId" after=" / " />
      <template v-if="deleted">
        <span class="flow-run-list-item__link--disabled">{{ flowRun.name }}</span>
      </template>
      <router-link v-else class="flow-run-list-item__link" :to="flowRunRoute(flowRun.id)">
        <span>{{ flowRun.name }}</span>
      </router-link>
    </template>
    <template #meta>
      <StateBadge :state="flowRun.state" />
      <DurationIconText :duration="flowRun.duration" />
      <FlowRunStartTime :flow-run="flowRun" />
      <FlowRunTaskCount :flow-run="flowRun" />
    </template>
  </StateListItem>
</template>

<script lang="ts" setup>
  import { CheckboxModel } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import DurationIconText from './DurationIconText.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import FlowRunTaskCount from './FlowRunTaskCount.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { flowRunRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    selected: CheckboxModel | null,
    flowRun: FlowRun,
    disabled?: boolean,
    deleted?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: CheckboxModel): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: CheckboxModel) {
      emit('update:selected', value)
    },
  })
  const flowRunRoute = inject(flowRunRouteKey)

  const stateType = computed(() => props.flowRun.state?.type)
  const tags = computed(() => props.flowRun.tags)
  const value = computed(() => props.flowRun.id)
</script>

<style>
.flow-run-list-item__link,
.flow-run-list-item__link--disabled { @apply
  font-semibold
}

.flow-run-list-item__link { @apply
   text-prefect-500
}

.flow-run-list-item__deleted {
  filter: grayscale(100%);
}
</style>