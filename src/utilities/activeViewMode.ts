import { useLocalStorage } from '@prefecthq/vue-compositions'
import { computed } from 'vue'
import { ViewOption } from '@/types/viewOption'
import { getCacheKey } from '@/utilities/cache'

const viewModeLocalStorageKey = getCacheKey('prefect-ui-library-view-mode')
const defaultValue: ViewOption = 'grid'

const { value: viewMode, set: setViewMode } = useLocalStorage<ViewOption>(viewModeLocalStorageKey, defaultValue)

export const activeViewMode = computed({
  get() {
    return viewMode.value
  },
  set(value: ViewOption) {
    setViewMode(value)
  },
})