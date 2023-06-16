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
> = (filter: TFilter, options?: SubscriptionOptions) => Record<TProperty, ComputedRef<Awaited<ReturnType<TAction>>>> & {
  subscription: UseSubscriptions<TAction>['subscription'],
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

  const composition: InfiniteScroll<TFilter, TAction, TProperty> = (filter: TFilter, options?: SubscriptionOptions) => {
    const pages = ref(0)
    const subscriptions = reactive<UseSubscription<TAction>[]>([])

    function loadMore(): void {
      if (subscriptions.length * limit > response.value.length) {
        return
      }

      pages.value++

      const { subscription } = callback(filter, pages.value, options)

      subscriptions.push(subscription)
    }

    const response = computed(() => subscriptions.flatMap(subscription => subscription.response ?? []) as Awaited<ReturnType<TAction>>)
    const { subscription } = useSubscriptions(subscriptions)

    const unwatch = uniqueValueWatcher(getValidWatchSource(filter), () => {
      if (!subscription.isSubscribed()) {
        unwatch!()
        return
      }

      pages.value = 0
      subscription.unsubscribe()
      subscriptions.splice(0)

      loadMore()
    })

    if (getCurrentInstance()) {
      onUnmounted(() => {
        subscription.unsubscribe()
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
      subscription,
    }
  }

  return composition
}