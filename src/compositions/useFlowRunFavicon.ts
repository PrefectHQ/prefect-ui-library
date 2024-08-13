import { MaybeRefOrGetter, computed, toValue } from 'vue'
import { useFavicon } from '@/compositions/useFavicon'
import { FlowRun } from '@/models'

export function useFlowRunFavicon(flowRun: MaybeRefOrGetter<FlowRun | undefined>): void {
  const state = computed(() => {
    const flowRunValue = toValue(flowRun)
    return flowRunValue?.stateType
  })

  useFavicon(state)
}