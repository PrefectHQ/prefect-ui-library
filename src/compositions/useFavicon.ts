import { onUnmounted, watchEffect, Ref, ref } from 'vue'
import { StateType } from '@/models/StateType'

function getPreferredColorScheme(): 'dark' | 'light' | 'no-preference' {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  } if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  return 'no-preference'
}

export function useFavicon(stateType: StateType | null | Ref<StateType | null | undefined>): void {
  let favicon16: HTMLElement | null
  let favicon32: HTMLElement | null

  switch (getPreferredColorScheme()) {
    case 'dark':
      favicon16 = document.getElementById('favicon-16-dark')
      favicon32 = document.getElementById('favicon-32-dark')
      break
    default:
      favicon16 = document.getElementById('favicon-16')
      favicon32 = document.getElementById('favicon-32')
      break
  }

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