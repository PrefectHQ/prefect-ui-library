<template>
  <page-heading class="page-heading-variables" :crumbs="crumbs">
    <template v-if="can.create.variable" #after-crumbs>
      <p-button size="sm" icon="PlusIcon" @click="open" />
    </template>
  </page-heading>
  <VariableV2CreateModal v-model:show-modal="showModal" @create="emit('create')" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import VariableV2CreateModal from '@/components/VariableV2CreateModal.vue'
  import { useShowModal } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Variables' }]
  const emit = defineEmits<{
    (event: 'create'): void,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()
</script>