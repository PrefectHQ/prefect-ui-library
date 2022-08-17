<template>
  <p-label class="schema-form-input" :label="label" :message="errorMessage" :state="meta">
    <template v-if="property.description" #description>
      <p>{{ property.description }}</p>

      <template v-if="isNullType">
        <p>This field has a type 'None' and cannot be modified.</p>
      </template>
    </template>

    <template v-if="field">
      <component
        :is="field.component"
        v-model="propValue"
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
  const label = computed(() => props.property.title ?? '')
  const isNullType = computed(() => props.property.type === 'null')

  const { value: propValue, errorMessage, meta } = useField(props.propKey, field.value?.validators)
</script>