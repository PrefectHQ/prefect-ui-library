<template inheritAttrs="false">
  <slot :show-modal="showModal" :is-open="isOpen" :open="open" :close="close" :toggle="toggle" />
  <!-- eslint-disable-next-line vue/no-duplicate-attr-inheritance -->
  <ConfirmDeleteModal v-model:showModal="showModal" v-bind="$attrs" />
</template>

<script lang="ts" setup>
  import ConfirmDeleteModal from './ConfirmDeleteModal.vue'
  import { useShowModal } from '@/compositions/useShowModal'

  const { showModal, isOpen, open, close, toggle } = useShowModal()
</script>
