<template>
  <p-button type="submit">
    {{ action }}
  </p-button>
</template>

<script lang="ts" setup>
  import { withDefaults } from 'vue'
  import { FormAction } from '@/types/buttons'

  withDefaults(defineProps<{
    action?: FormAction,
  }>(), {
    action: 'Save',
  })
</script>