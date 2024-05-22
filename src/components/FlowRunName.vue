<template>
  <span v-if="flowRunId" class="flow-run-name">
    <template v-if="stateType">
      <p-tooltip :text="stateName ?? stateType">
        <StateIcon :state-type="stateType" />
      </p-tooltip>
    </template>

    <p-link :to="routes.flowRun(flowRunId)">
      {{ flowRunName ?? flowRunId }}
    </p-link>
  </span>
</template>

<script lang="ts" setup>
  import { StateIcon } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
  import { StateType } from '@/models'
  import { PrefectStateNames } from '@/types/states'
  const routes = useWorkspaceRoutes()

  defineProps<{
    flowRunId?: string | null,
    flowRunName?: string | null,
    stateType?: StateType | null,
    stateName?: PrefectStateNames | null,
  }>()
</script>

<style>
.flow-run-name { @apply
  inline-flex
  items-center
  gap-1
}
</style>