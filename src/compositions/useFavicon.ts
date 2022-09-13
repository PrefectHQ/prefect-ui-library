import { onUnmounted, watchEffect, Ref, ref } from 'vue'
import { StateType } from '@/models/StateType'

export function useFavicon(stateType: StateType | null | Ref<StateType | null | undefined>): void {
  const favicon16 = document.getElementById('favicon-16')
  const favicon32 = document.getElementById('favicon-32')

  const stateTypeRef = ref(stateType)


  watchEffect(() => {
    if (stateType) {
      favicon16?.setAttribute('href', `/ico/${stateTypeRef.value}.svg`)
      favicon32?.setAttribute('href', `/ico/${stateTypeRef.value}.svg`)
    }
  })

  onUnmounted(() => {
    favicon16?.setAttribute('href', '/ico/favicon-16x16.png')
    favicon32?.setAttribute('href', '/ico/favicon-32x32.png')
  })
}