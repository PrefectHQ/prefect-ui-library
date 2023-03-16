import { useLocalStorage } from '@prefecthq/vue-compositions'
import { computed, WritableComputedRef } from 'vue'
import { ViewOption } from '@/types/flowRunResults'

const viewModeLocalStorageKey = 'prefect-ui-library-artifacts-view-mode'
const defaultValue: ViewOption = 'grid'


export function useActiveViewMode(): { activeViewMode: WritableComputedRef<ViewOption> } {
  const { value: viewMode, set: setViewMode } = useLocalStorage<ViewOption>(viewModeLocalStorageKey, defaultValue)

  const activeViewMode = computed({
    get() {
      return viewMode.value
    },
    set(value: ViewOption) {
      setViewMode(value)
    },
  })

  return {
    activeViewMode,
  }
}