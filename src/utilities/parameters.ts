import { computed, ref, Ref } from 'vue'
import { SchemaProperties, SchemaValues } from '@/types/schemas'

export function mergeParametersObjects(
  flowRunParameters: SchemaValues | Ref<SchemaValues>,
  deploymentParameters: SchemaProperties | Ref<SchemaProperties>,
): string {
  const flowRunParamRef = ref(flowRunParameters)
  const deploymentParamRef = ref(deploymentParameters)

  const parametersVault = ref(flowRunParamRef.value)

  for (const [key, value] of Object.entries(deploymentParamRef.value)) {
    if (!Object.keys(parametersVault.value).includes(key)) {
      parametersVault.value[key] = value?.default
    }
  }

  const parameters = computed(() => Object.keys(parametersVault.value).length !== 0 ? JSON.stringify(parametersVault.value, undefined, 2) : '{}')

  return parameters.value
}