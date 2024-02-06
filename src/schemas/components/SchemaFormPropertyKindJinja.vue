<template>
  <p-code-input v-model="value" lang="jinja" class="schema-form-property-kind-jinja" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { PrefectKindJinja } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    value: PrefectKindJinja,
  }>()

  const emit = defineEmits<{
    'update:value': [PrefectKindJinja],
  }>()

  const value = computed({
    get() {
      return props.value.template
    },
    set(template) {
      emit('update:value', {
        __prefect_kind: 'jinja',
        template,
      })
    },
  })
</script>