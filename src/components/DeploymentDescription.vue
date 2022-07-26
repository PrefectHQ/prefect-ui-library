<template>
  <p>
    {{ description }}
  </p>
</template>

<script lang="ts" setup>
  import { Deployment } from '@/models'

  defineProps<{
    description: Deployment['description'],
  }>()
</script>