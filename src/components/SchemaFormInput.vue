<template>
  <p-label class="schema-form-input" :label="label" :message="errorMessage" :state="state">
    <template #description>
      <div class="schema-form-input__description">
        <template v-if="property.description">
          <p-markdown-renderer :text="property.description" class="schema-form-input__markdown" />
        </template>

        <template v-if="isNullType">
          <ExtraInfoModal title="Null Type">
            This field has a type 'None' and cannot be modified
          </ExtraInfoModal>
        </template>
      </div>
    </template>

    <template v-if="meta && meta.component">
      <component :is="meta.component" v-model="propValue" class="schema-form-input__component" v-bind="{ ...meta.props, ...meta.attrs }" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { ExtraInfoModal } from '..'
  import { SchemaProperty } from '@/types/schemas'

  const props = defineProps<{
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
  const validators = computed(() => meta.value?.validators ?? [])
  const { value: propValue, errorMessage, meta: state } = useField(propKey, validators)
</script>

<style>
.schema-form-input__description { @apply
  grid
  gap-1
}

.schema-form-input__component .p-code-input { @apply
  max-w-full
  min-h-[2.5rem]
  resize-y
}

.schema-form-input__description {
  overflow-wrap: anywhere;
}

.schema-form-input__markdown { @apply
  text-subdued
  text-sm
}
</style>