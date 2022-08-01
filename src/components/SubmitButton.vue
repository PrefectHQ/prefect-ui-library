<template>
  <p-button type="submit" :disabled="disabled" :loading="loading">
    {{ action }}
  </p-button>
</template>

<script lang="ts" setup>
  import { withDefaults } from 'vue'
  import { FormAction } from '@/types/buttons'

  withDefaults(defineProps<{
    action?: FormAction,
    disabled?: boolean,
    loading?: boolean,
  }>(), {
    action: 'Save',
  })
</script>