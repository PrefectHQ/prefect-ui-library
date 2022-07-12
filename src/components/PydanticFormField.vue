<template>
  <p-label :label="property.title ?? propKey" :message="errors?.[0]" :state="meta">
    <component
      :is="fieldComponent.component"
      v-if="fieldComponent"
      v-model="internalValue"
      v-bind="{ ...fieldComponent.attrs }"
    >
      <template v-for="(content, key) in fieldComponent?.slots" #[key]>
        {{ content }}
      </template>
    </component>

    <template v-else>
      <span class="pydantic-form-field__none">This parameter has a type 'None' and cannot be modified.</span>
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { PydanticTypeDefinition } from '@/types/Pydantic'
  import { getComponentFromPydanticTypeDefinition } from '@/utilities'

  const props = defineProps<{
    propKey: string,
    property: PydanticTypeDefinition,
  }>()

  const fieldComponent = computed(() => getComponentFromPydanticTypeDefinition(props.property))

  const { value: internalValue, errors, meta } = useField(props.property.title ?? 'id', fieldComponent.value?.validators, { initialValue: fieldComponent.value?.defaultValue })
</script>

<style>
.pydantic-form-field__none {
  @apply
  text-slate-500
}
</style>