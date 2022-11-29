<template>
  <ComponentPage title="Concurrency Limit">
    <p-button @click="open">
      Add concurrency limit
    </p-button>
    <ConcurrencyLimitsCreateModal v-model:showModal="showModal" />
  </componentpage>
</template>

<script lang="ts" setup>
  import ConcurrencyLimitsCreateModal from '@/components/ConcurrencyLimitsCreateModal.vue'
  import {  useShowModal } from '@/compositions'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const { showModal, open } = useShowModal()
</script>