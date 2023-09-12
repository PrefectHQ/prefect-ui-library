import { ComputedRef, MaybeRefOrGetter, Ref, computed, toRef, toValue } from 'vue'

// this will eventually need to come from the ui settings
export const GLOBAL_API_LIMIT = 200

export type UseFilterPagination = {
  limit: ComputedRef<number>,
  offset: ComputedRef<number>,
  page: Ref<number>,
}

export function useFilterPagination(page: MaybeRefOrGetter<number> = 1, limit?: MaybeRefOrGetter<number | undefined>): UseFilterPagination {
  const pageRef = toRef(page)
  const limitRef = computed(() => toValue(limit) ?? GLOBAL_API_LIMIT)
  const offset = computed(() => (pageRef.value - 1) * limitRef.value)

  return {
    limit: limitRef,
    offset,
    page: pageRef,
  }
}