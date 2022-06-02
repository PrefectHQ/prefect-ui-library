import { computed, ref, Ref } from 'vue'

type UseShowModal = {
  showModal: Ref<boolean>,
  isOpen: Ref<boolean>,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

export function useShowModal(): UseShowModal {
  const showModal = ref(false)

  const isOpen = computed(() => showModal.value)

  function open(): void {
    showModal.value = true
  }

  function close(): void {
    showModal.value = false
  }

  function toggle(): void {
    showModal.value = !showModal.value
  }

  return { isOpen, showModal, open, close, toggle }
}