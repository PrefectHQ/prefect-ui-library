import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, ref, Ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { BlockType } from '@/models/BlockType'

export function useBlockType(blockTypeId: string | Ref<string | null | undefined>): ComputedRef<BlockType | undefined> {
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

  return blockType
}

export function useBlockTypeBySlug(blockTypeSlug: string | Ref<string | null | undefined>): ComputedRef<BlockType | undefined> {
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

  return blockType
}