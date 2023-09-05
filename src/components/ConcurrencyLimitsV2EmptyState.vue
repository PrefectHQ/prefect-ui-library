<template>
  <p-empty-state class="concurrency-limit-page-empty-state">
    <template #icon>
      <p-icon icon="TruckIcon" />
    </template>

    <template #heading>
      Add a concurrency limit
    </template>

    <template #description>
      Global concucurrency limits can be applied to flow runs, task runs and any operation where you want to control concurrency.
    </template>

    <template #actions>
      <DocumentationButton :to="localization.docs.concurrency" />
      <p-button v-if="can.create.concurrency_limit" primary icon-append="PlusIcon" @click="open">
        Add Concurrency Limit
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
