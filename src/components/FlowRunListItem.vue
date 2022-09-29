<template>
  <StateListItem v-model:selected="model" v-bind="{ value, disabled: deleted, tags, stateType }" class="flow-run-list-item" :class="deleted ? 'deleted' : '' ">
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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, watchEffect } from 'vue'
  import { RouterLink } from 'vue-router'
  import DurationIconText from './DurationIconText.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import FlowRunTaskCount from './FlowRunTaskCount.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { flowRunRouteKey } from '@/router'
  import { flowRunsApiKey } from '@/services/FlowRunsApi'
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


  /// /
  // const flowRunsApi = inject(flowRunsApiKey)
  // const flowRunSubscription =  useSubscription(flowRunsApi.getFlowRun, [props.flowRun.id])
  // const exist = computed(() => flowRunSubscription.response ? 'i exist' : 'i don\'t exist')

  watchEffect(() => {
    console.log(props.deleted)
  })
</script>

<style>
.flow-run-list-item__link,
.flow-run-list-item__link--disabled { @apply
  font-semibold
}

.flow-run-list-item__link { @apply
   text-prefect-500
}

.deleted {
filter: grayscale(100%);
}
</style>