import { useLocalStorage } from '@prefecthq/vue-compositions'
import { computed, WritableComputedRef } from 'vue'
import { ViewOption } from '@/types/flowRunResults'
import { getCacheKey } from '@/utilities/cache'

const viewModeLocalStorageKey = getCacheKey('prefect-ui-library-artifacts-view-mode')
const defaultValue: ViewOption = 'grid'

const { value: viewMode, set: setViewMode } = useLocalStorage<ViewOption>(viewModeLocalStorageKey, defaultValue)

const activeViewMode = computed({
  get() {
    return viewMode.value
  },
  set(value: ViewOption) {
    setViewMode(value)
  },
})

export function useActiveViewMode(): { activeViewMode: WritableComputedRef<ViewOption> } {
  return {
    activeViewMode,
  }
}