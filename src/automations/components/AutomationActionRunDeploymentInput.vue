<template>
  <p-content class="automation-action-run-deployment">
    <p-label label="Deployment To Run">
      <template #default="{ id }">
        <AutomationDeploymentCombobox :id="id" :selected="deploymentId" @update:selected="setDeploymentId" />
      </template>
    </p-label>

    <template v-if="deployment && deployment.id === deploymentId">
      <!--
        The key makes sure the same schema form doesn't get reused for different deployment.
        If the component is reused you can end up with parameters from the last schema merging with
        parameters from the current schema. Possibly a bug in the schemaV2 form.
      -->
      <AutomationActionRunDeploymentParameters :key="deploymentId" v-model:values="parameters" :deployment="deployment" />
      <FlowRunJobVariableOverridesLabeledInput :model-value="jobVariables" @update:model-value="updateJobVariables" />
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import AutomationActionRunDeploymentParameters from '@/automations/components/AutomationActionRunDeploymentParameters.vue'
  import AutomationDeploymentCombobox from '@/automations/components/AutomationDeploymentCombobox.vue'
  import { AutomationActionRunDeployment } from '@/automations/types/actions'
  import FlowRunJobVariableOverridesLabeledInput from '@/components/FlowRunJobVariableOverridesLabeledInput.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { Deployment } from '@/models/Deployment'
  import { SchemaValues } from '@/schemas/types/schemaValues'
  import { isString } from '@/utilities'
  import { stringify } from '@/utilities/json'

  const props = defineProps<{
    action: Partial<AutomationActionRunDeployment>,
  }>()

  const emit = defineEmits<{
    (event: 'update:action', value: Partial<AutomationActionRunDeployment>): void,
  }>()

  const api = useWorkspaceApi()
  const parametersMap = new Map<string, SchemaValues>()

  const deploymentId = computed(() => props.action.deploymentId ?? null)
  const deployment = ref<Deployment>()

  async function setDeploymentId(deploymentId: unknown): Promise<void> {
    if (!isString(deploymentId)) {
      return
    }

    deployment.value = await api.deployments.getDeployment(deploymentId)
    const parameters = getParametersForDeployment(deploymentId) ?? { ...deployment.value.parameters }

    emit('update:action', { ...props.action, deploymentId, parameters })
  }

  const parameters = computed({
    get() {
      return props.action.parameters ?? {}
    },
    set(parameters) {
      setParametersForDeployment(deploymentId.value, parameters)
      emit('update:action', { ...props.action, parameters })
    },
  })

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

  onMounted(() => {
    if (deploymentId.value) {
      setDeploymentId(deploymentId.value)

      if (props.action.parameters) {
        setParametersForDeployment(deploymentId.value, props.action.parameters)
      }
    }
  })
</script>