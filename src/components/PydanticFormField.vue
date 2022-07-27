<template>
  <p-label :label="label" :message="errorMessage" :description="message" :state="meta">
    <template v-if="property.description" #description>
      {{ property.description }}
    </template>

    <component
      :is="fieldComponent.component"
      v-if="fieldComponent"
      v-model="internalValue"
      :placeholder="fieldComponent.defaultValue"
      v-bind="{ ...fieldComponent.attrs }"
    >
      <template v-for="(content, key) in fieldComponent?.slots" #[key]>
        {{ content }}
      </template>
    </component>
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
    // Technically this is always passed as part of the form recursion
    // eslint-disable-next-line vue/no-unused-properties
    level?: number,
  }>()

  const fieldComponent = computed(() => getComponentFromPydanticTypeDefinition(props.property))

  const fieldLabel = computed(() => props.propKey.split('.').pop())
  const label = computed(() => {
    return props.property.title ?? fieldLabel.value ?? ''
  })
  const message = computed(() => fieldComponent.value ? undefined : "This field has a type 'None' and cannot be modified.")

  const { value: internalValue, errorMessage, meta } = useField(props.propKey, fieldComponent.value?.validators)
</script>
