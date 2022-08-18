import { onMounted, onUnmounted, Ref } from 'vue'

type DisconnectScrollLink = () => void

/**
 * The useScrollLinking composition takes 2 element references (source, target)
 * and attaches a scroll event listener to the source. When the scroll event of the
 * source element is fired, the scroll position of the target is updated to match, producing
 * a scroll linking effect.
 *
 * This composition will tear down when the calling component is unmounted but can be disconnected
 * early using the returned disconnect method.
 *
 * @param source Ref<HTMLElement>
 * @param target Ref<HTMLElement>
 * @returns { disconnect: () => void }
 */
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