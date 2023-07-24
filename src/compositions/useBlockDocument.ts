import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, MaybeRefOrGetter, toRef, toValue } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { WorkspaceBlockDocumentsApi } from '@/services/WorkspaceBlockDocumentsApi'
import { Getter } from '@/types/reactivity'
import { UseEntitySubscription } from '@/types/useEntitySubscription'

export type UseBlockDocument = UseEntitySubscription<WorkspaceBlockDocumentsApi['getBlockDocument'], 'blockDocument'>

export function useBlockDocument(blockDocumentId: MaybeRefOrGetter<string | null | undefined>): UseBlockDocument {
  const api = useWorkspaceApi()
  const can = useCan()

  const getter: Getter<[string] | null> = () => {
    if (!can.read.block) {
      return null
    }

    const id = toValue(blockDocumentId)

    if (!id) {
      return null
    }

    return [id]
  }

  const parameters = toRef(getter)
  const subscription = useSubscriptionWithDependencies(api.blockDocuments.getBlockDocument, parameters)
  const blockDocument = computed(() => subscription.response)

  return {
    subscription,
    blockDocument,
  }
}