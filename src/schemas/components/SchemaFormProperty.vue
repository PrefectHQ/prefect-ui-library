<template>
  <p-label class="schema-form-property" :label="label">
    <template v-if="description" #description>
      <div class="schema-form-property__description">
        <p-markdown-renderer :text="description" class="schema-form-property__markdown" />
      </div>
    </template>

    <fieldset class="schema-form-property__fields" :disabled="disabled">
      <template v-if="Boolean(property.const)">
        <p class="schema-form-property__const">
          {{ property.title ?? 'Field' }} is a const and cannot be changed
        </p>
      </template>
      <SchemaFormPropertyInput v-model:value="value" :property="property" />
    </fieldset>
  </p-label>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormPropertyInput from '@/schemas/components/SchemaFormPropertyInput.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValue } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    required: boolean,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const value = computed({
    get() {
      return props.value
    },
    set(value) {
      emit('update:value', value)
    },
  })

  const property = useSchemaProperty(() => props.property)

  const label = computed(() => {
    const title = props.property.title ?? ''

    if (!props.required) {
      return `${title} (Optional)`.trim()
    }

    return title
  })

  const description = computed(() => {
    const { description = '' } = props.property
    const descriptionWithNewlinesRemoved = description.replace(/\n(?!\n)/g, ' ')

    return descriptionWithNewlinesRemoved
  })

  const disabled = computed(() => Boolean(property.value.const))
</script>

<style>
.schema-form-property__fields { @apply
  grid
  grid-cols-1
  gap-1
}

.schema-form-property__fields[disabled] { @apply
  cursor-not-allowed
}

.schema-form-property__markdown { @apply
  text-subdued
  text-sm
}

.schema-form-property__const { @apply
  text-subdued
  text-sm
}
</style>