<template>
  <p-label :label="label" :message="errorMessage" :description="message" :state="meta">
    <template v-if="property.description" #description>
      {{ property.description }}
    </template>

    <template v-if="field">
      <component
        :is="field.component"
        v-model="internalValue"
        :placeholder="field.defaultValue"
        v-bind="{ ...field.attrs }"
      >
        <template v-for="(content, key) in field?.slots" #[key]>
          {{ content }}
        </template>
      </component>
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { SchemaProperty } from '@/types/schemas'
  import { getComponentFromPydanticTypeDefinition } from '@/utilities'

  const props = defineProps<{
    propKey: string,
    property: SchemaProperty,
    // Technically this is always passed as part of the form recursion
    // eslint-disable-next-line vue/no-unused-properties
    level?: number,
  }>()

  const field = computed(() => getComponentFromPydanticTypeDefinition(props.property))
  const fieldLabel = computed(() => props.propKey.split('.').pop())
  const label = computed(() => props.property.title ?? fieldLabel.value ?? '')
  const message = computed(() => field.value ? undefined : "This field has a type 'None' and cannot be modified.")

  const { value: internalValue, errorMessage, meta } = useField(props.propKey, field.value?.validators)
</script>
