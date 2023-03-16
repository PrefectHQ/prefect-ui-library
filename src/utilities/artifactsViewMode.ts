import { useLocalStorage } from '@prefecthq/vue-compositions'
import { computed } from 'vue'
import { ViewOption } from '@/types/flowRunResults'

const viewModeLocalStorageKey = 'prefect-ui-library-artifacts-view-mode'
const defaultValue: ViewOption = 'grid'

const { value: viewMode, set: setViewMode } = useLocalStorage<ViewOption | null>(viewModeLocalStorageKey, defaultValue)

export const activeViewMode = computed({
  get() {
    console.log(viewMode.value)
    return viewMode.value
  },
  set(value: ViewOption | null) {
    console.log('before', viewMode.value)
    setViewMode(value)
    console.log('after', viewMode.value)
  },
})