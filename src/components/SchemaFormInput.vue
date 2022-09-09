<template>
  <p-label class="schema-form-input" :label="label" :message="errorMessage" :state="state">
    <template #description>
      <div class="schema-form-input__description">
        <template v-if="property.description">
          <p>{{ property.description }}</p>
        </template>

        <template v-if="isNullType">
          <p-icon-text icon="QuestionMarkCircleIcon" solid text="This field has a type 'None' and cannot be modified" />
        </template>
      </div>
    </template>

    <template v-if="meta">
      <component :is="meta.component" v-model="propValue" v-bind="{ ...meta.props, ...meta.attrs }" />
    </template>
  </p-label>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import { SchemaProperty } from '@/types/schemas'

  const props = defineProps<{
    propKey: string,
    property: SchemaProperty,
  }>()

  const meta = computed(() => props.property.meta)
  const label = computed(() => {
    const title = props.property.title ?? ''

    if (!props.property.isRequired) {
      return `${title} (Optional)`
    }

    return title
  })

  const isNullType = computed(() => props.property.type === 'null')

  const { value: propValue, errorMessage, meta: state } = useField(props.propKey, meta.value?.validators)
</script>

<style>
.schema-form-input__description { @apply
  grid
  gap-1
}
</style>