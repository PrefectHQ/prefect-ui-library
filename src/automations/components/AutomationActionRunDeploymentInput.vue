<template>
  <p-content class="automation-action-run-deployment">
    <p-label label="Deployment To Run">
      <template #default="{ id }">
        <AutomationDeploymentCombobox :id="id" v-model:selected="deploymentId" />
      </template>
    </p-label>

    <template v-if="deployment">
      <AutomationActionRunDeploymentParameters v-model:values="parameters" :deployment="deployment" />
      <FlowRunJobVariableOverridesLabeledInput v-if="can.access.flowRunInfraOverrides" :model-value="jobVariables" @update:model-value="updateJobVariables" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import AutomationActionRunDeploymentParameters from '@/automations/components/AutomationActionRunDeploymentParameters.vue'
  import AutomationDeploymentCombobox from '@/automations/components/AutomationDeploymentCombobox.vue'
  import { AutomationActionRunDeployment } from '@/automations/types/actions'
  import FlowRunJobVariableOverridesLabeledInput from '@/components/FlowRunJobVariableOverridesLabeledInput.vue'
  import { useDeployment } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { SchemaValues } from '@/schemas/types/schemaValues'
  import { stringify } from '@/utilities/json'

  const props = defineProps<{
    action: Partial<AutomationActionRunDeployment>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionRunDeployment>): void,
  }>()

  const can = useCan()
  const parametersMap = new Map<string, SchemaValues>()

  const deploymentId = computed({
    get() {
      return props.action.deploymentId ?? null
    },
    set(deploymentId) {
      const parameters = getParametersForDeployment(deploymentId)

      emit('update:action', { ...props.action, deploymentId, parameters })
    },
  })

  const parameters = computed({
    get() {
      return props.action.parameters ?? {}
    },
    set(parameters) {
      if (props.action.parameters !== parameters) {
        setParametersForDeployment(deploymentId.value, parameters)
        emit('update:action', { ...props.action, parameters })
      }
    },
  })


  const { deployment } = useDeployment(deploymentId)

  function getParametersForDeployment(deploymentId: string | null): SchemaValues | null {
    if (deploymentId !== null) {
      return parametersMap.get(deploymentId) ?? null
    }

    return null
  }

  function setParametersForDeployment(deploymentId: string | null, values: SchemaValues | null): void {
    if (deploymentId !== null && values !== null) {
      parametersMap.set(deploymentId, values)
    }
  }

  const jobVariables = ref(stringify(props.action.jobVariables ?? {}))

  watch(props.action, () => jobVariables.value = stringify(props.action.jobVariables ?? {}))

  function updateJobVariables(value: string): void {
    // always update the controlled state so that the user can see the content they entered
    // and validation will trigger
    jobVariables.value = value
    try {
      const parsedJobVariables = JSON.parse(value)
      emit('update:action', { ...props.action, jobVariables: parsedJobVariables })
    } catch (error) {
      // validation for this field is handled by the FlowRunJobVariableOverridesLabeledInput component
    }
  }
</script>