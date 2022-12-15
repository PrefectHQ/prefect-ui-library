<template inheritAttrs="false">
  <slot :show-modal="showModal" :is-open="isOpen" :open="open" :close="close" :toggle="toggle" />
  <ConfirmDeleteModal v-model:showModal="showModal" v-bind="$attrs">
    <template v-for="(index, name) in $slots" #[name]="data">
      <slot :name="name" v-bind="data" />
    </template>
  </ConfirmDeleteModal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'
  import { useShowModal } from '@/compositions/useShowModal'

  export default defineComponent({
    name: 'ConfirmDeleteModalWithSlot',
    expose: [],
    components: {
      ConfirmDeleteModal,
    },

    inheritAttrs: false,

    setup() {
      const { showModal, isOpen, open, close, toggle } = useShowModal()

      return { showModal, isOpen, open, close, toggle }
    },
  })
</script>
