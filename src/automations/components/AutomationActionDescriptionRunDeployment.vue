<template>
  <p-content class="automation-action-description-run-deployment" v-bind="$attrs">
    <template v-if="action.deploymentId">
      <template v-if="deployment">
        <span>Run <p-link :to="routes.deployment(deployment.id)">{{ deployment.name }}</p-link> deployment</span>
      </template>

      <p-button small @click="openParametersModal">
        Show parameters
      </p-button>

      <template v-if="action.jobVariables">
        <p-button small @click="openJobVariablesModal">
          Show job variables
        </p-button>
      </template>
    </template>

    <template v-else>
      <span>Run deployment inferred from the triggering event</span>
    </template>
  </p-content>

  <p-modal v-model:show-modal="showParametersModal" title="Parameters">
    <p-code-highlight :text="stringify(action.parameters)" lang="json" />
  </p-modal>

  <p-modal v-model:show-modal="showJobVariablesModal" title="Job Variables">
    <p-code-highlight :text="stringify(action.jobVariables)" lang="json" />
  </p-modal>
</template>

<script lang="ts" setup>
  import { useBoolean } from '@prefecthq/vue-compositions'
  import { AutomationActionRunDeployment } from '@/automations/types/actions'
  import { useDeployment, useWorkspaceRoutes } from '@/compositions'
  import { stringify } from '@/utilities'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    action: AutomationActionRunDeployment,
  }>()

  const routes = useWorkspaceRoutes()
  const { deployment } = useDeployment(() => props.action.deploymentId)
  const { value: showParametersModal, setTrue: openParametersModal } = useBoolean()
  const { value: showJobVariablesModal, setTrue: openJobVariablesModal } = useBoolean()
</script>

<style>
.automation-action-description-run-deployment { @apply
  flex
  flex-wrap
  gap-2
  items-center
}
</style>