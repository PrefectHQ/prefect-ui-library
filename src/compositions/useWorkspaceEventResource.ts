import { computed, ComputedRef, ref, MaybeRef, MaybeRefOrGetter, toValue } from 'vue'
import { WorkspaceEventResource, PrefectResourceRole, WorkspaceEvent } from '@/models/workspaceEvent'
import { getResourceIdParts } from '@/utilities/events'

export type UseEventResource = {
  id: ComputedRef<string | null>,
  role: ComputedRef<PrefectResourceRole | null>,
  type: ComputedRef<string | null>,
  resourceId: ComputedRef<string>,
  name: ComputedRef<string | null>,
}

export function useWorkspaceEventResource(resource: MaybeRefOrGetter<WorkspaceEventResource>): UseEventResource {
  const resourceId = computed(() => {
    const value = toValue(resource)
    return value['prefect.resource.id']
  })

  const parts = computed(() => getResourceIdParts(resourceId.value))
  const id = computed(() => parts.value.id)
  const role = computed(() => parts.value.role)
  const type = computed(() => parts.value.type)
  const name = computed(() => {
    const value = toValue(resource)
    return value['prefect.resource.name'] ?? value['prefect.name'] ?? value['prefect-cloud.name'] ?? null
  })

  return {
    resourceId,
    id,
    role,
    type,
    name,
  }
}

type UseEventResourceId = UseEventResource & {
  resourceId: ComputedRef<string>,
}

export function useWorkspaceEventResourceId(event: MaybeRef<WorkspaceEvent>): UseEventResourceId {
  const eventRef = ref(event)

  return useWorkspaceEventResource(eventRef.value.resource)
}