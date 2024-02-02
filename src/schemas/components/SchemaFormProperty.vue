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

      <component :is="input.component" v-bind="input.props" />
    </fieldset>
  </p-label>
</template>

<script lang="ts" setup>
  import { isNotNullish } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import SchemaFormPropertyInput from '@/schemas/components/SchemaFormPropertyInput.vue'
  import SchemaFormPropertyKindJson from '@/schemas/components/SchemaFormPropertyKindJson.vue'
  import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
  import { SchemaProperty } from '@/schemas/types/schema'
  import { SchemaValue, isPrefectKindValue } from '@/schemas/types/schemaValues'
  import { isNullish, withProps } from '@/utilities'

  const props = defineProps<{
    property: SchemaProperty,
    value: SchemaValue,
    required: boolean,
  }>()

  const emit = defineEmits<{
    'update:value': [SchemaValue],
  }>()

  const property = useSchemaProperty(() => props.property)

  const value = computed(() => {
    if (isNotNullish(props.value)) {
      return props.value
    }

    if (isNotNullish(property.value.default)) {
      return property.value.default
    }

    return null
  })

  if (isNullish(props.value) && isNotNullish(property.value.default)) {
    emit('update:value', property.value.default)
  }

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

  const input = computed(() => {
    if (!isPrefectKindValue(value.value)) {
      return withProps(SchemaFormPropertyInput, {
        property: property.value,
        value: value.value,
        'onUpdate:value': update,
      })
    }

    if (isPrefectKindValue(value.value, 'json')) {
      return withProps(SchemaFormPropertyKindJson, {
        value: value.value,
        'onUpdate:value': update,
      })
    }

    if (isPrefectKindValue(value.value, 'jinja')) {
      throw 'not implemented'
    }

    if (isPrefectKindValue(value.value, 'workspace_variable')) {
      throw 'not implemented'
    }

    if (isPrefectKindValue(value.value, 'none')) {
      throw 'not implemented'
    }

    const exhaustive: never = value.value
    console.error(new Error(`SchemaFormProperty input is not exhaustive: ${JSON.stringify(exhaustive)}`))

    return { component: null, props: {} }
  })

  function update(value: unknown): void {
    emit('update:value', value)
  }
</script>

<style>
.schema-form-property .p-label__header { @apply
  items-stretch
}

.schema-form-property__header { @apply
  flex
  justify-between
  items-center
}

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