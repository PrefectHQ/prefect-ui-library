import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, ref, Ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { BlockSchema } from '@/models/BlockSchema'

export function useBlockSchema(blockSchemaId: string | Ref<string | null | null>): ComputedRef<BlockSchema | undefined> {
  const id = ref(blockSchemaId)
  const api = useWorkspaceApi()
  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.blockSchemas.getBlockSchema, parameters)
  const blockSchema = computed(() => subscription.response)

  return blockSchema
}

export function useBlockSchemaForBlockType(blockTypeId: string | Ref<string | null | null>): ComputedRef<BlockSchema | undefined> {
  const id = ref(blockTypeId)
  const api = useWorkspaceApi()
  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.blockSchemas.getBlockSchemaForBlockType, parameters)
  const blockSchema = computed(() => subscription.response)

  return blockSchema
}