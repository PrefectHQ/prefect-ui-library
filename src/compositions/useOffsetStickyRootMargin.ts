import { media } from '@prefecthq/prefect-design'
import { Ref, computed } from 'vue'

type UseOffsetStickyRootMargin = {
  offsetStickyRootMargin: Ref<string>,
}

export function useOffsetStickyRootMargin(): UseOffsetStickyRootMargin {
  const offsetStickyRootMargin = computed(() => media.lg ? '-1px 0px 0px 0px' : '-65px 0px 0px 0px')

  return { offsetStickyRootMargin }
}