import { onMounted, onUnmounted } from 'vue'

export function usePageTitle(pages: any[], unmountedMessage: string = 'Prefect'): void {

  document.title = pages.filter(item => item).join(' • ')

  onMounted(() => {
    document.title = pages.filter(item => item).join(' • ')
  })

  onUnmounted(() => {
    document.title = unmountedMessage
  })
}