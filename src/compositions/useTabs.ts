import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { MaybeRef } from '@/types'

export type ConditionalTab = {
  label: string,
  hidden?: boolean,
}

export type UseTabs = {
  tabs: ComputedRef<string[]>,
  tab: Ref<string | undefined>,
}

export function useTabs(tabs: MaybeRef<ConditionalTab[]>, tab?: MaybeRef<string | undefined>): UseTabs {
  const tabsRef = ref(tabs)
  const visibleTabs = computed(() => tabsRef.value.filter(tab => tab.hidden !== true).map(tab => tab.label))
  const firstVisibleTab = computed(() => visibleTabs.value.at(0))
  const tabRef = ref(tab ?? firstVisibleTab.value)

  watch(visibleTabs, visible => {
    const tab = tabRef.value

    if (tab === undefined) {
      return
    }

    if (visible.includes(tab)) {
      return
    }

    tabRef.value = firstVisibleTab.value
  }, { immediate: true })

  return {
    tabs: visibleTabs,
    tab: tabRef,
  }
}