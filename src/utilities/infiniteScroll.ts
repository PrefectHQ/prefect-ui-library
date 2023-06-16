import { Action, SubscriptionOptions, UseSubscription } from '@prefecthq/vue-compositions'
import { ComputedRef, MaybeRef, Ref, computed, getCurrentInstance, onUnmounted, reactive, ref } from 'vue'
import { UseSubscriptions, useSubscriptions } from '@/compositions/useSubscriptions'
import { getValidWatchSource, uniqueValueWatcher } from '@/utilities/reactivity'

export type InfiniteScrollFilter = {
  limit: number,
  offset: number,
}

export type InfiniteScrollCallback<T extends Partial<InfiniteScrollFilter>, A extends Action> = (filter: T | Ref<T | null>, page: MaybeRef<number>, options?: SubscriptionOptions) => { subscription: UseSubscription<A> }

export type InfiniteScroll<
  TFilter extends Partial<InfiniteScrollFilter>,
  TAction extends Action,
  TProperty extends string
> = (
  filter: TFilter | Ref<TFilter | null>,
  options?: SubscriptionOptions
) => Record<TProperty, ComputedRef<Awaited<ReturnType<TAction>>>> & {
  subscriptions: UseSubscriptions<TAction>['subscriptions'],
  loadMore: () => void,
}

export function infiniteScrollCompositionFactory<
  TFilter extends Partial<InfiniteScrollFilter>,
  TAction extends Action,
  TProperty extends string
>(
  callback: InfiniteScrollCallback<TFilter, TAction>,
  property: TProperty,
  limit: number,
): InfiniteScroll<TFilter, TAction, TProperty> {

  const composition: InfiniteScroll<TFilter, TAction, TProperty> = (filter, options) => {
    const page = ref(0)
    const pages = reactive<UseSubscription<TAction>[]>([])

    function loadMore(): void {
      if (pages.length * limit > response.value.length) {
        return
      }

      page.value++

      const { subscription } = callback(filter, page.value, options)

      pages.push(subscription)
    }

    const response = computed(() => pages.flatMap(subscription => subscription.response ?? []) as Awaited<ReturnType<TAction>>)
    const { subscriptions } = useSubscriptions(pages)

    const unwatch = uniqueValueWatcher(getValidWatchSource(filter), () => {
      if (!subscriptions.isSubscribed()) {
        unwatch!()
        return
      }

      page.value = 0
      subscriptions.unsubscribe()
      pages.splice(0)

      loadMore()
    })

    if (getCurrentInstance()) {
      onUnmounted(() => {
        subscriptions.unsubscribe()
        unwatch()
      })
    }

    // Typescript says this is `[x: string]: ComputedRef<Awaited<ReturnType<TAction>>>>` even though `property` is TProperty
    // so this object is unnecessary from a logic perspective but allows me to use an as without casting the entire return object
    const propertyResponse = {
      [property]: response,
    } as Record<TProperty, ComputedRef<Awaited<ReturnType<TAction>>>>

    return {
      ...propertyResponse,
      subscriptions,
      loadMore,
    }
  }

  return composition
}