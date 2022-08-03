import { Ref } from 'vue'

type Parameters = Record<string, unknown>
type ParametersTypes = Record<keyof Parameters, string>

interface ParametersReturnValue {
  parameters: Parameters,
  parameterTypes: ParametersTypes,
}

export function useParameters(sourceRef: Ref<Parameters>): ParametersReturnValue {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const parameterValues: Parameters = sourceRef.value
  const parameterTypes: ParametersTypes = {}

  Object.keys(parameterValues).forEach((key: keyof typeof parameterTypes) => {
    const parameter = parameterValues[key]
    if (typeof parameter == 'string' && Date.parse(parameter)) {
      parameterValues[key] = new Date(parameter)
    }

    parameterTypes[key] = typeof parameter
  })

  return {
    parameters: parameterValues,
    parameterTypes,
  }
}