<template>
  <slot :show-modal="showModal" :is-open="isOpen" :open="open" :close="close" :toggle="toggle" />

  <ConfirmDeleteModal v-model:showModal="showModal" v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </ConfirmDeleteModal>
</template>

<script lang="ts" setup>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal } from '@/compositions/useShowModal'

  defineOptions({
    inheritAttrs: false,
  })

  const { showModal, isOpen, open, close, toggle } = useShowModal()
</script>
