<template>
  <h3>
    Base Job Template
    <BetaBadge />
  </h3>
  <p-tabs :tabs="['Defaults', 'Advanced']" class="overflow-auto">
    <template #defaults>
      <template v-if="variablesSchemaHasProperties">
        <p-message info>
          The fields below control the default values for the base job template. These values can be overridden by deployments.
        </p-message>
        <SchemaFormFieldsWithValues
          :values="currentDefaults"
          :schema="variablesSchema"
          @update:values="onDefaultValuesUpdate"
        />
      </template>
      <template v-else>
        <p-message warning>
          This work pool's base job template does not have any customizations. To add customizations, edit the base job template directly with the <b>Advanced</b> tab.
        </p-message>
      </template>
    </template>
    <template #advanced>
      <div class="work-pool-base-job-template-section__advanced_tab">
        <p-message info>
          This is the JSON representation of the base job template. A work pool's based job template controls infrastructure configuration for all flow runs in the work pool, and specifies the configuration that can be overridden by deployments.
          <br>
          <br>
          For more information on the structure of a work pool's base job template, check out
          <p-link :to="localization.docs.workPools">
            the docs.
          </p-link>.
        </p-message>
        <JsonInput :model-value="localBaseJobTemplateJson" show-format-button @update:model-value="onJsonUpdate" />
      </div>
    </template>
  </p-tabs>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { SchemaFormFieldsWithValues, BetaBadge, JsonInput } from '@/components'
  import { localization } from '@/localization'
  import { mapper } from '@/services'
  import { Schema, SchemaValues, WorkerBaseJobTemplate } from '@/types'
  import { getSchemaDefaults, getSchemaWithoutDefaults, mapValues, merge, stringify } from '@/utilities'


  const props = defineProps<{
    baseJobTemplate: WorkerBaseJobTemplate,
    type: string,
  }>()

  const emit = defineEmits<{
    (e: 'update:base-job-template', value: WorkerBaseJobTemplate): void,
  }>()

  const onJsonUpdate = (json: string): void => {
    localBaseJobTemplateJson.value = json
    try {
      emit('update:base-job-template', JSON.parse(json))
    } catch (ex) {
      if (ex instanceof SyntaxError) {
        // Ignore syntax errors
      } else {
        throw ex
      }
    }
  }

  const onDefaultValuesUpdate = (values: SchemaValues): void => {
    const { baseJobTemplate } = props

    const newTemplate = {
      ...baseJobTemplate,
      variables: {
        ...baseJobTemplate.variables,
        properties: mapValues(baseJobTemplate.variables?.properties ?? {}, (key, value) => {
          return {
            ...value,
            default: values[key],
          }
        }),
      },
    }
    localBaseJobTemplateJson.value = stringify(newTemplate)
    emit('update:base-job-template', newTemplate)
  }

  const localBaseJobTemplateJson = ref<string>(stringify(props.baseJobTemplate))
  watch(() => props.type, (current, previous) => {
    if (previous !== current) {
      localBaseJobTemplateJson.value = stringify(props.baseJobTemplate)
    }
  })
  const variablesSchema = computed<Schema>(() => mapper.map('SchemaResponse', getSchemaWithoutDefaults(props.baseJobTemplate.variables ?? {}), 'Schema'))
  const variablesSchemaHasProperties = computed<boolean>(() => Object.keys(variablesSchema.value.properties ?? {}).length > 0)
  const currentDefaults = computed<SchemaValues>(() => getSchemaDefaults(props.baseJobTemplate.variables ?? {}))
</script>

<style>
  .work-pool-base-job-template-section__advanced_tab { @apply
      overflow-auto
  }
</style>