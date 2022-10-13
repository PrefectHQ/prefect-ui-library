import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
import { computed, ComputedRef, ref, Ref } from 'vue'
import { useCan } from '@/compositions/useCan'
import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
import { BlockDocument } from '@/models/BlockDocument'

export function useBlockDocument(blockDocumentId: string | Ref<string | null | null>): ComputedRef<BlockDocument | undefined> {
  const id = ref(blockDocumentId)
  const api = useWorkspaceApi()
  const can = useCan()

  const parameters = computed<[string] | null>(() => {
    if (!id.value) {
      return null
    }

    if (!can.read.block) {
      return null
    }

    return [id.value]
  })

  const subscription = useSubscriptionWithDependencies(api.blockDocuments.getBlockDocument, parameters)
  const blockDocument = computed(() => subscription.response)

  return blockDocument
}