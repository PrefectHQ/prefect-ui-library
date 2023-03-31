<template>
  <page-heading class="page-heading-variables" :crumbs="crumbs">
    <template v-if="can.create.variable" #after-crumbs>
      <p-button inset icon="PlusIcon" @click="open" />
    </template>
  </page-heading>
  <VariableCreateModal v-model="showModal" />
</template>

<script lang="ts" setup>
  import PageHeading from '@/components/PageHeading.vue'
  import { useShowModal } from '@/compositions'
  import { useCan } from '@/compositions/useCan'

  const crumbs = [{ text: 'Variables' }]

  const can = useCan()
  const { showModal, open } = useShowModal()
</script>