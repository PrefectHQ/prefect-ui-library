<template>
  <SchemaInput
    v-model="internalVariableDefaults"
    :schema="baseJobTemplate.schema"
  >
    <template #button-group>
      <!-- We don't want to allow JSON input for this schema input but want to get the benefits of the v-model form -->
      <p-message info>
        <p-markdown-renderer :text="localization.info.baseJobTemplateDefaults" />
      </p-message>
    </template>

    <template #empty>
      <p-message warning>
        <p-markdown-renderer :text="localization.info.baseJobTemplateVariablesEmpty" />
      </p-message>
    </template>
  </SchemaInput>
</template>


<script lang="ts" setup>
  import { usePatchRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import SchemaInput from '@/components/SchemaInput.vue'
  import { localization } from '@/localization'
  import { BaseJobTemplate } from '@/models'

  const props = defineProps<{
    baseJobTemplate: BaseJobTemplate,
  }>()

  const emit = defineEmits<{
    (event: 'update:baseJobTemplate', value: BaseJobTemplate): void,
  }>()

  const internalBaseJobTemplate = ref<BaseJobTemplate>(props.baseJobTemplate)
  const baseJobTemplate = computed({
    get() {
      return internalBaseJobTemplate.value
    },
    set(value) {
      internalBaseJobTemplate.value.jobConfiguration = value.jobConfiguration
      internalBaseJobTemplate.value.variables = value.variables
      emit('update:baseJobTemplate', internalBaseJobTemplate.value)
    },
  })

  const internalVariableDefaults = usePatchRef(baseJobTemplate, 'defaultValues')
</script>