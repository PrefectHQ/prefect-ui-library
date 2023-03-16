import { useLocalStorage } from '@prefecthq/vue-compositions'
import { computed, WritableComputedRef } from 'vue'
import { ViewOption } from '@/types/flowRunResults'

const viewModeLocalStorageKey = 'prefect-ui-library-artifacts-view-mode'
const defaultValue: ViewOption = 'grid'


export function useActiveViewMode(): { activeViewMode: WritableComputedRef<ViewOption> } {
  const { value: viewMode, set: setViewMode } = useLocalStorage<ViewOption>(viewModeLocalStorageKey, defaultValue)
  console.log(viewModeLocalStorageKey, viewMode.value, localStorage.getItem(viewModeLocalStorageKey))
  const activeViewMode = computed({
    get() {
      console.log(viewMode.value)
      return viewMode.value
    },
    set(value: ViewOption) {
      console.log('before', viewMode.value)
      setViewMode(value)
      console.log('after', viewMode.value)
    },
  })


  return {
    activeViewMode,
  }
}