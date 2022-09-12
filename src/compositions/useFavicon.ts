import { onUnmounted, watchEffect, Ref } from 'vue'
import { StateType } from '@/models/StateType'

export function useFavicon(stateType: Ref<StateType | null | undefined>): void {
  const favicon16 = document.getElementById('favicon-16')
  const favicon32 = document.getElementById('favicon-32')

  watchEffect(() => {
    favicon16?.setAttribute('href', `/ico/${stateType.value}.svg`)
    favicon32?.setAttribute('href', `/ico/${stateType.value}.svg`)
  })

  onUnmounted(() => {
    favicon16?.setAttribute('href', '/ico/favicon-16x16.png')
    favicon32?.setAttribute('href', '/ico/favicon-32x32.png')
  })
}