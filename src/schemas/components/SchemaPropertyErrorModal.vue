<template>
  <p-modal v-model:show-modal="showModal" class="schema-property-error-modal">
    Unable to convert {{ from }} to {{ to }}
  </p-modal>
</template>

<script lang="ts" setup>
  import { SchemaPropertyErrorModalProps } from '@/schemas/types/errorModal'

  const showModal = defineModel<boolean>('showModal', { required: true })

  const props = defineProps<SchemaPropertyErrorModalProps>()
</script>
