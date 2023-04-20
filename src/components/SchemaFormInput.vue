<template>
  <p-label class="schema-form-input" :label="label" :message="error" :state="state">
    <template #description>
      <div class="schema-form-input__description">
        <template v-if="property.description">
          <p-markdown-renderer :text="property.description" />
        </template>

        <template v-if="isNullType">
          <p-icon-text icon="QuestionMarkCircleIcon" solid text="This field has a type 'None' and cannot be modified" />
        </template>
      </div>
    </template>

    <template v-if="meta">
      <component :is="meta.component" v-model="internalValue" v-bind="{ ...meta.props, ...meta.attrs }" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { ValidationRule, useValidation } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { SchemaValue, SchemaProperty } from '@/types/schemas'

  const props = defineProps<{
    modelValue?: SchemaValue,
    propKey: string,
    property: SchemaProperty,
  }>()

  const meta = computed(() => props.property.meta)
  const label = computed(() => {
    const title = props.property.title ?? ''

    if (!props.property.meta?.required) {
      return `${title} (Optional)`
    }

    return title
  })

  const isNullType = computed(() => props.property.type === 'null')

  const propKey = computed(() => props.property.type === 'block' ? `${props.propKey}.blockDocumentId` : props.propKey)

  const emit = defineEmits<{
    (event: 'update:modelValue', value: SchemaValue): void,
  }>()

  const internalValue = computed({
    get() {
      return props.modelValue ?? {}
    },
    set(val) {
      emit('update:modelValue', val)
    },
  })

  const rules = computed<ValidationRule<unknown>[]>(() => {
    if (typeof props.property.meta?.validators === 'function') {
      return [props.property.meta.validators]
    }

    return props.property.meta?.validators ?? []
  })

  const { error, state } = useValidation(internalValue, propKey, rules)
</script>

<style>
.schema-form-input__description { @apply
  grid
  gap-1
}
.schema-form-input__description {
  overflow-wrap: anywhere;
}
</style>