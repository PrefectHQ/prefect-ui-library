import { ComputedRef, MaybeRef, computed, ref, unref } from 'vue'

const GLOBAL_API_LIMIT = 200

export type UseFilterPagination = {
  limit: ComputedRef<number>,
  offset: ComputedRef<number>,
}

export function useFilterPagination(page: MaybeRef<number> = 1, limit?: MaybeRef<number | undefined>): UseFilterPagination {
  const pageRef = ref(page)
  const limitRef = computed(() => unref(limit) ?? GLOBAL_API_LIMIT)
  const offset = computed(() => (pageRef.value - 1) * limitRef.value)

  return {
    limit: limitRef,
    offset,
  }
}