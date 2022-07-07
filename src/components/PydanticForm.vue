<template>
  <p-form>
    <JsonView class="tmp" :value="JSON.stringify(schema)" />

    <template v-for="(property, key) in properties" :key="key">
      <PydanticFormProperty :property="property" :schema="schema" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'
  import { computed } from 'vue'
  import JsonView from './JsonView.vue'
  import PydanticFormProperty from './PydanticFormProperty.vue'
  import { PydanticTypeDefinition } from '@/types/Pydantic'


  const props = defineProps<{
    modelValue?: Record<string, unknown>,
    schema: PydanticTypeDefinition,
  }>()

  const { handleSubmit, handleReset, isSubmitting, meta, errors, submitCount } = useForm()

  const properties = computed(() => {
    return props.schema.properties ?? {}
  })
</script>

<style>
.tmp {
  max-height: 300px;
  overflow: auto;
}
</style>