<template>
  <ComponentPage title="Concurrency Limit">
    Concurrency
    {{ concurrencyLimit }}
    <p-button @click="open">
      Add
    </p-button>
    <ConcurrencyLimitsCreateModal v-model:showModal="showModal" />
  </componentpage>
</template>

<script lang="ts" setup>
  import ConcurrencyLimitsCreateModal from '@/components/ConcurrencyLimitsCreateModal.vue'
  import {  useShowModal } from '@/compositions'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const { showModal, open } = useShowModal()
  const concurrencyLimit = mocker.create('concurrencyLimit')
</script>