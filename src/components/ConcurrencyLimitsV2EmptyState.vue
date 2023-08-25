<template>
  <p-empty-state class="concurrency-limits-v2-empty-state">
    <template #icon>
      <p-icon icon="TruckIcon" />
    </template>

    <template #heading>
      Add a concurrency limit
    </template>

    <template #description>
      Concurrency limits allow you to control concurrency for task runs, flow runs and more.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.concurrencyGuide" />
      <p-button v-if="can.create.concurrency_limit" @click="open">
        Add Concurrency Limit
        <p-icon icon="PlusIcon" />
      </p-button>
      <ConcurrencyLimitsV2CreateModal v-model:showModal="showModal" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PButton, PIcon } from '@prefecthq/prefect-design'
  import ConcurrencyLimitsV2CreateModal from '@/components/ConcurrencyLimitsV2CreateModal.vue'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useCan } from '@/compositions/useCan'
  import { useShowModal } from '@/compositions/useShowModal'
  import { localization } from '@/localization'

  const { showModal, open } = useShowModal()

  const can = useCan()
</script>
