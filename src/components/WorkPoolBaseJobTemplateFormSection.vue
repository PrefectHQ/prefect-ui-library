<template>
  <h3>
    Base Job Template
    <BetaBadge />
  </h3>
  <p-tabs v-model:selected="tab" :tabs="tabs" class="overflow-auto">
    <template #defaults>
      <template v-if="variablesSchemaHasProperties">
        <p-message info>
          The fields below control the default values for the base job template. These values can be
          overridden by deployments.
        </p-message>
        <SchemaFormFieldsWithValues
          :values="currentDefaults"
          :schema="variablesSchema"
          @update:values="onDefaultValuesUpdate"
        />
      </template>
      <template v-else>
        <p-message warning>
          This work pool's base job template does not have any customizations. To add customizations,
          edit the base job template directly with the <b>Advanced</b> tab.
        </p-message>
      </template>
    </template>
    <template #advanced>
      <p-message info>
        This is the JSON representation of the base job template. A work pool's based job template
        controls infrastructure configuration for all flow runs in the work pool, and specifies the
        configuration that can be overridden by deployments.
        <br>
        <br>
        For more information on the structure of a work pool's base job template, check out
        <p-link :to="localization.docs.workPools">
          the docs.
        </p-link>.
      </p-message>
      <JsonInput :model-value="baseJobTemplateJson" show-format-button @update:model-value="onJsonUpdate" />
    </template>
  </p-tabs>
</template>

<script lang="ts" setup>
  import { isEqual, cloneDeep } from 'lodash'
  import { computed, ref, watch } from 'vue'
  import { SchemaFormFieldsWithValues, BetaBadge, JsonInput } from '@/components'
  import { useTabs } from '@/compositions'
  import { localization } from '@/localization'
  import { mapper } from '@/services'
  import { Schema, SchemaProperty, SchemaValues, WorkerBaseJobTemplate } from '@/types'
  import { getSchemaDefaults, getSchemaWithoutDefaults } from '@/utilities'


  const props = defineProps<{
    baseJobTemplate: WorkerBaseJobTemplate,
  }>()

  const emit = defineEmits<{
    (e: 'update:base-job-template', json: WorkerBaseJobTemplate): void,
  }>()

  const computedTabs = computed(() => [
    { label: 'Defaults' },
    { label: 'Advanced' },
  ])

  const { tab, tabs } = useTabs(computedTabs)

  const onJsonUpdate = (json: string): void => {
    localBaseJobTemplateJson.value = json
    try {
      emit('update:base-job-template', JSON.parse(json))
    } catch (ex) {
      // don't emit if the local value is not valid JSON
    }
  }

  const onDefaultValuesUpdate = (values: SchemaValues): void => {
    const { baseJobTemplate } = props
    const keys = Object.keys(baseJobTemplate.variables?.properties ?? {})

    const newTemplate = {
      ...baseJobTemplate,
      variables: {
        ...baseJobTemplate.variables,
        properties: keys.reduce<Record<string, SchemaProperty>>((acc, key) => {
          acc[key] = {
            ...baseJobTemplate.variables?.properties?.[key],
            default: values[key],
          }
          return acc
        }, {}),
      },
    }

    emit('update:base-job-template', newTemplate)
  }

  const localBaseJobTemplateJson = ref<string | null>(null)
  const baseJobTemplateJson = computed<string>(() => localBaseJobTemplateJson.value ?? JSON.stringify(props.baseJobTemplate, null, 2))
  watch(() => props.baseJobTemplate, (prev, current) => {
    if (localBaseJobTemplateJson.value !== null) {
      try {
        // Check to see if the base job template has been changed by the parent component
        // cloneDeep is used to unwrap the proxy
        if (isEqual(JSON.parse(baseJobTemplateJson.value), cloneDeep(current))) {
          // Clear the local value to use the parent's value
          localBaseJobTemplateJson.value = null
        }
      } catch (ex) {
        // If the JSON is invalid, keep the local value
      }
    }
  })
  const variablesSchema = computed<Schema>(() => mapper.map('SchemaResponse', getSchemaWithoutDefaults(props.baseJobTemplate.variables ?? {}), 'Schema'))
  const variablesSchemaHasProperties = computed<boolean>(() => Object.keys(variablesSchema.value.properties ?? {}).length > 0)
  const currentDefaults = computed<SchemaValues>(() => getSchemaDefaults(props.baseJobTemplate.variables ?? {}))
</script>