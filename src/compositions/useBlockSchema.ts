import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ref, Ref } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceBlockSchemasApi } from '@/services/WorkspaceBlockSchemasApi'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseBlockSchema = UseEntitySubscription<WorkspaceBlockSchemasApi['getBlockSchema'], 'blockSchema'>

export function useBlockSchema(blockSchemaId: string | Ref<string | null | null>): UseBlockSchema {
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

  return {
    subscription,
    blockSchema,
  }
}

export function useBlockSchemaForBlockType(blockTypeId: string | Ref<string | null | null>): UseBlockSchema {
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

  return {
    subscription,
    blockSchema,
  }
}