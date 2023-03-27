import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ref, Ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceBlockTypesApi } from '@/services/WorkspaceBlockTypesApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseBlockType = UseEntitySubscription<WorkspaceBlockTypesApi['getBlockType'], 'blockType'>

export function useBlockType(blockTypeId: string | Ref<string | null | undefined>): UseBlockType {
  const api = useWorkspaceApi()
  const slug = ref(blockTypeId)

  const parameters = computed<[string] | null>(() => {
    if (!slug.value) {
      return null
    }

    return [slug.value]
  })

  const subscription = useSubscriptionWithDependencies(api.blockTypes.getBlockType, parameters)
  const blockType = computed(() => subscription.response)

  return {
    subscription,
    blockType,
  }
}

export function useBlockTypeBySlug(blockTypeSlug: string | Ref<string | null | undefined>): UseBlockType {
  const api = useWorkspaceApi()
  const slug = ref(blockTypeSlug)

  const parameters = computed<[string] | null>(() => {
    if (!slug.value) {
      return null
    }

    return [slug.value]
  })

  const subscription = useSubscriptionWithDependencies(api.blockTypes.getBlockTypeBySlug, parameters)
  const blockType = computed(() => subscription.response)

  return {
    subscription,
    blockType,
  }
}