<template>
  <p-form>
    <JsonView class="tmp" :value="JSON.stringify(schema)" />

    <p-content>
      <template v-for="(property, key) in properties" :key="key">
        <PydanticFormProperty :property="property" :schema="normalizedSchema" />
      </template>
    </p-content>
  </p-form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'
  import { computed } from 'vue'
  import JsonView from './JsonView.vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { PydanticTypeDefinition } from '@/types/Pydantic'
  import { normalizePydanticTypeDefinitionProperties } from '@/utilities'


  const props = defineProps<{
    modelValue?: Record<string, unknown>,
    schema: PydanticTypeDefinition,
  }>()

  const { handleSubmit, handleReset, isSubmitting, meta, errors, submitCount } = useForm()

  const properties = computed(() => {
    return normalizedSchema.value.properties ?? {}
  })

  const normalizedSchema = computed(() => {
    return normalizePydanticTypeDefinitionProperties(props.schema)
  })
</script>

<style>
.tmp {
  max-height: 300px;
  overflow: auto;
}
</style>