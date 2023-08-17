<template>
  <page-heading class="page-heading-variables" :crumbs="crumbs">
    <template v-if="can.create.variable" #after-crumbs>
      <p-button small icon="PlusIcon" @click="open" />
    </template>
  </page-heading>
  <VariableCreateModal v-model:show-modal="showModal" @create="emit('create')" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import VariableCreateModal from '@/components/VariableCreateModal.vue'
  import { useShowModal } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Variables' }]
  const emit = defineEmits<{
    (event: 'create'): void,
  }>()

  const can = useCan()
  const { showModal, open } = useShowModal()
</script>