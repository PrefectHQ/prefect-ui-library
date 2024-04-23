<template>
  <p-modal v-model:show-modal="showModal" class="schema-property-error-modal" />
</template>

<script lang="ts" setup>

  const showModal = defineModel<boolean>('showModal', { required: true })
</script>
