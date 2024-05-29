<template>
  <p-content class="automation-action-run-deployment-parameters">
    <SchemaInputV2 v-model:values="parameters" :schema :errors :kinds="['none', 'json', 'jinja', 'workspace_variable']" skip-default-value-initialization>
      <template #default="{ kind, setKind }">
        <p-content secondary>
          <div class="automation-action-run-deployment-parameters__header">
            <h3 class="deployment-form__heading">
              Parameters
            </h3>
            <p-icon-button-menu small>
              <p-overflow-menu-item v-if="kind !== 'none'" label="Use form input" @click="setKind('none')" />
              <p-overflow-menu-item v-if="kind !== 'json'" label="Use JSON input" @click="setKind('json')" />
              <p-overflow-menu-item v-if="kind !== 'jinja'" label="Use Jinja input" @click="setKind('jinja')" />
            </p-icon-button-menu>
          </div>

          <template v-if="!dismissed">
            <p-message dismissible @dismiss="dismiss">
              Parameters defined for an automation action will be merged with the deployment's default parameters when the action is executed.
            </p-message>
          </template>
        </p-content>
      </template>
    </SchemaInputV2>
  </p-content>
</template>

<script lang="ts" setup>
  import { ValidationRule, useLocalStorage, useValidation } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { Deployment } from '@/models/Deployment'
  import { SchemaValuesV2, useSchemaValidationV2, SchemaInputV2, SchemaV2 } from '@/schemas'
  import { isRecord } from '@/utilities/object'
  import { timeout } from '@/utilities/time'

  const props = defineProps<{
    deployment: Deployment,
    values: SchemaValuesV2 | null | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:values', value: SchemaValuesV2): void,
  }>()

  const parameters = computed({
    get() {
      if (isRecord(props.values)) {
        return props.values
      }

      return {}
    },
    set(values) {
      emit('update:values', values)
    },
  })

  const schema = computed<SchemaV2>(() => {
    const schema = props.deployment.parameterOpenApiSchema
    const required: string[] = []
    const parametersProvidedByDeployment = Object.keys(props.deployment.parameters)

    schema.required?.forEach(parameter => {
      if (parametersProvidedByDeployment.includes(parameter)) {
        return
      }

      required.push(parameter)
    })

    return { ...schema, required }
  })

  const { errors, validate: validateParameters } = useSchemaValidationV2(schema, parameters)

  const isValidParameters: ValidationRule<SchemaValuesV2> = async (value, label, { signal, source, previousValue }) => {
    if (value === previousValue) {
      return
    }

    if (source === 'validator') {
      await timeout(5000, signal)
    }

    if (signal.aborted) {
      return
    }

    return await validateParameters()
  }

  useValidation(parameters, isValidParameters)

  const { value: dismissed, set: setDismissed } = useLocalStorage('automation-action-run-deployment-parameters-merge-message', false)

  function dismiss(): void {
    setDismissed(true)
  }
</script>

<style>
.automation-action-run-deployment-parameters__header { @apply
  flex
  items-center
  justify-between
}
</style>