<template>
  <div class="automation-action-description-run-deployment" v-bind="$attrs">
    <template v-if="action.deploymentId">
      <span class="automation_action-description-run-deployment__deployment">Run deployment: <DeploymentIconText :deployment-id="action.deploymentId" /></span>

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
  </div>

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
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import { stringify } from '@/utilities'

  defineOptions({
    inheritAttrs: false,
  })

  defineProps<{
    action: AutomationActionRunDeployment,
  }>()

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

.automation_action-description-run-deployment__deployment { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>