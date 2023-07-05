<template>
  <div>
    <h3>
      Base Job Template
    </h3>
    <p-tabs :tabs="['Defaults', 'Advanced']" class="overflow-auto">
      <template #defaults>
        <template v-if="variablesSchemaHasProperties">
          <p-message info class="work-pool-base-job-template-section__info_message ">
            The fields below control the default values for the base job template. These values can be overridden by deployments.
          </p-message>
          <SchemaFormFieldsWithValues
            v-model:values="currentDefaults"
            :schema="mappedVariablesSchema"
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
          <p-message info class="work-pool-base-job-template-section__info_message">
            This is the JSON representation of the base job template. A work pool's  job template controls infrastructure configuration for all flow runs in the work pool, and specifies the configuration that can be overridden by deployments.
            <br>
            <br>
            For more information on the structure of a work pool's base job template, check out
            <p-link :to="localization.docs.workPools">
              the docs.
            </p-link>.
          </p-message>
          <JsonInput v-model:model-value="localBaseJobTemplateJson" show-format-button @update:model-value="onLocalBaseJobTemplateJsonUpdate" />
        </div>
      </template>
    </p-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { isEqual } from 'lodash'
  import { computed, ref, watch } from 'vue'
  import { SchemaFormFieldsWithValues, JsonInput } from '@/components'
  import { localization } from '@/localization'
  import { getSchemaDefaultValues, mapper } from '@/services'
  import { Schema, SchemaProperties, SchemaValues, WorkerBaseJobTemplate } from '@/types'
  import { getSchemaWithoutDefaults, mapValues, stringify } from '@/utilities'


  const props = defineProps<{
    baseJobTemplate: WorkerBaseJobTemplate,
  }>()

  const emit = defineEmits<{
    (event: 'update:base-job-template', value: WorkerBaseJobTemplate): void,
  }>()

  const onLocalBaseJobTemplateJsonUpdate = (): void => {
    if (localBaseJobTemplate.value !== null) {
      emit('update:base-job-template', localBaseJobTemplate.value)
    }
  }

  const localBaseJobTemplateJson = ref<string>(stringify(props.baseJobTemplate))
  const localBaseJobTemplate = computed<WorkerBaseJobTemplate | null>(() => {
    try {
      return JSON.parse(localBaseJobTemplateJson.value)
    } catch (error) {
      if (error instanceof SyntaxError) {
        return null
      }
      throw error
    }
  })
  watch(() => props.baseJobTemplate, (template) => {
    if (!isEqual(template, localBaseJobTemplate.value)) {
      localBaseJobTemplateJson.value = stringify(template)
    }
  })
  const variablesSchema = computed<Schema>(() => props.baseJobTemplate.variables ?? {})
  const mappedVariablesSchema = computed<Schema>(() => mapper.map('SchemaResponse', getSchemaWithoutDefaults(variablesSchema.value), 'Schema'))
  const variablesSchemaProperties = computed<SchemaProperties>(() => variablesSchema.value.properties ?? {})
  const variablesSchemaHasProperties = computed<boolean>(() => Object.keys(variablesSchemaProperties.value).length > 0)
  const currentDefaults = computed<SchemaValues>({
    get() {
      const schema = mapper.map('SchemaResponse', variablesSchema.value, 'Schema')
      const defaults = getSchemaDefaultValues(schema)
      return defaults
    },
    set(values) {
      const newTemplate = {
        ...props.baseJobTemplate,
        variables: {
          ...props.baseJobTemplate.variables,
          properties: mapValues(variablesSchemaProperties.value, (key, value) => {
            return {
              ...value,
              default: values[key],
            }
          }),
        },
      }
      emit('update:base-job-template', newTemplate)
    },
  })
</script>

<style>
  .work-pool-base-job-template-section__advanced_tab { @apply
      overflow-auto
  }

  .work-pool-base-job-template-section__info_message { @apply
      mb-4
  }
</style>