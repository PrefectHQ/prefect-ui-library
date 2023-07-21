import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceBlockSchemasApi } from '@/services/WorkspaceBlockSchemasApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseBlockSchema = UseEntitySubscription<WorkspaceBlockSchemasApi['getBlockSchema'], 'blockSchema'>

export function useBlockSchema(blockSchemaId: MaybeRefOrGetter<string | null | undefined>): UseBlockSchema {
  const api = useWorkspaceApi()

  const getter: Getter<[string] | null> = () => {
    const id = toValue(blockSchemaId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.blockSchemas.getBlockSchema, parameters)
  const blockSchema = computed(() => subscription.response)

  return {
    subscription,
    blockSchema,
  }
}

export function useBlockSchemaForBlockType(blockTypeId: MaybeRefOrGetter<string | null | undefined>): UseBlockSchema {
  const api = useWorkspaceApi()
  const getter: Getter<[string] | null> = () => {
    const id = toValue(blockTypeId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.blockSchemas.getBlockSchemaForBlockType, parameters)
  const blockSchema = computed(() => subscription.response)

  return {
    subscription,
    blockSchema,
  }
}