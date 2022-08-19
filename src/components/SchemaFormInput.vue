<template>
  <p-label class="schema-form-input" :label="label" :message="errorMessage" :state="state">
    <template v-if="property.description" #description>
      <p>{{ property.description }}</p>

      <template v-if="isNullType">
        <p>This field has a type 'None' and cannot be modified.</p>
      </template>
    </template>

    <template v-if="meta">
      <component
        :is="meta.component"
        v-model="propValue"
        v-bind="{ ...meta.props, ...meta.attrs }"
      >
        <!--
          <template v-for="(content, key) in field?.slots" #[key]>
          {{ content }}
          </template>
        -->
      </component>
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

    if (!meta.value?.required) {
      return `${title} (Optional)`
    }

    return title
  })

  const isNullType = computed(() => props.property.type === 'null')

  const { value: propValue, errorMessage, meta: state } = useField(props.propKey, meta.value?.validators)
</script>