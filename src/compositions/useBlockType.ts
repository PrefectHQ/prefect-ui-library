import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceBlockTypesApi } from '@/services/WorkspaceBlockTypesApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseBlockType = UseEntitySubscription<WorkspaceBlockTypesApi['getBlockType'], 'blockType'>

export function useBlockType(blockTypeSlug: MaybeRefOrGetter<string | null | undefined>): UseBlockType {
  const api = useWorkspaceApi()

  const getter: Getter<[string] | null> = () => {
    const slug = toValue(blockTypeSlug)

    if (!slug) {
      return null
    }

    return [slug]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.blockTypes.getBlockType, parameters)
  const blockType = computed(() => subscription.response)

  return {
    subscription,
    blockType,
  }
}

export function useBlockTypeBySlug(blockTypeSlug: MaybeRefOrGetter<string | null | undefined>): UseBlockType {
  const api = useWorkspaceApi()

  const getter: Getter<[string] | null> = () => {
    const slug = toValue(blockTypeSlug)

    if (!slug) {
      return null
    }

    return [slug]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.blockTypes.getBlockTypeBySlug, parameters)
  const blockType = computed(() => subscription.response)

  return {
    subscription,
    blockType,
  }
}