import { media } from '@prefecthq/prefect-design'
import { Ref, computed } from 'vue'

type UseOffsetStickyRootMargin = {
  margin: Ref<string>,
}

/**
 * The useOffsetStickyRootMargin composition is used to provide a rootMargin
 * value for sticky headers that are intended to align with the top of the page,
 * or just below the mobile nav on smaller screens. Use in conjunction with
 * prefect-design's <p-layout-table> component or the usePositionStickyObserver
 * composition from vue-compositions.
 * @returns UseOffsetStickyRootMargin
 */
export function useOffsetStickyRootMargin(): UseOffsetStickyRootMargin {
  const margin = computed(() => media.lg ? '-1px 0px 0px 0px' : '-65px 0px 0px 0px')

  return { margin }
}