<template>
  <p-label class="schema-form-property" :label="label">
    <template v-if="description" #description>
      <div class="schema-form-property__description">
        <p-markdown-renderer :text="description" class="schema-form-input__markdown" />
      </div>
    </template>

    <SchemaFormPropertyInput v-model:value="value" :property="property" />
  </p-label>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import SchemaFormPropertyInput from '@/schemas/components/SchemaFormPropertyInput.vue'
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

  const label = computed(() => {
    const title = props.property.title ?? ''

    if (!props.required) {
      return `${title} (Optional)`.trim()
    }

    return title
  })

  const description = computed(() => {
    const { description = '' } = props.property
    const descriptionWithNewlinesRemoved = description.replace(/\n/g, ' ')

    return descriptionWithNewlinesRemoved
  })
</script>