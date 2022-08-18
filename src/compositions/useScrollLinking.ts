import { onMounted, onUnmounted, Ref } from 'vue'

type DisconnectScrollLink = () => void

export function useScrollLinking(
  source: Ref<HTMLElement | undefined>,
  target: Ref<HTMLElement | undefined>,
): { disconnect: DisconnectScrollLink } {

  const handleScroll = (): void => {
    if (!source.value || !target.value) {
      return
    }

    target.value.scrollTop = source.value.scrollTop
    target.value.scrollLeft = source.value.scrollLeft
  }

  const connect = (): void => {
    if (!source.value) {
      return
    }

    source.value.addEventListener('scroll', handleScroll)
  }

  const disconnect = (): void => {
    if (!source.value) {
      return
    }

    source.value.removeEventListener('scroll', handleScroll)
  }

  onMounted(connect)
  onUnmounted(disconnect)

  return { disconnect }
}