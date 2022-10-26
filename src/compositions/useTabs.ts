import { computed } from '@vue/reactivity'
import { Ref, ref } from 'vue'

export type ConditionalTab = {
  label: string,
  hidden?: boolean,
}

export function useTabs(tabs: ConditionalTab[] | Ref<ConditionalTab[]>): Ref<string[]> {
  const tabsRef = ref(tabs)

  return computed(() => tabsRef.value.filter(tab => tab.hidden !== true).map(tab => tab.label))
}