import { isDefined } from '@prefecthq/prefect-design'
import { MaybeRef, MaybeRefOrGetter, Ref, computed, ref, toValue } from 'vue'
import { useWorkspaceApi } from '@/compositions'
import { useSchemaProperty } from '@/schemas/compositions/useSchemaProperty'
import { useSchemaPropertyErrorModal } from '@/schemas/compositions/useSchemaPropertyErrorModal'
import { SchemaProperty } from '@/schemas/types/schema'
import { PrefectKind, PrefectKindJson, SchemaValue, isPrefectKindJson, isPrefectKindValue } from '@/schemas/types/schemaValues'
import { stringify } from '@/utilities'

type UseSchemaValue = {
  value: Ref<SchemaValue>,
  kind: Ref<PrefectKind>,
  loading: Ref<boolean>,
}

type UseSchemaValueParameters = {
  value: MaybeRef<SchemaValue>,
  property: MaybeRefOrGetter<SchemaProperty>,
}

type UpdateValueResponse = { success: true, value: SchemaValue } | { success: false, message: string }

export function useSchemaValue({ value, property }: UseSchemaValueParameters): UseSchemaValue {
  const currentValue = ref(value)
  const currentKind = ref(getPrefectKindFromValue(toValue(value)))
  const loading = ref(false)
  const api = useWorkspaceApi()
  const { property: currentProperty } = useSchemaProperty(property)
  const modal = useSchemaPropertyErrorModal()

  const kind = computed({
    get() {
      return currentKind.value
    },
    set(value) {
      updateKind(value)
      // before setting try to convert
      // if we're unable to convert ask the user what to do in a modal
      // cancel and fix it
      // revert/discard changes
    },
  })

  async function updateKind(requestedKind: PrefectKind): Promise<void> {
    loading.value = true

    try {
      const response = await updateValue(currentValue.value, currentKind.value, requestedKind)

      if (!response.success) {
        modal.open('hello world')
        return
      }

      currentValue.value = response.value
      currentKind.value = requestedKind

    } finally {
      loading.value = false
    }

  }

  async function updateValue(value: SchemaValue, currentKind: PrefectKind, requestedKind: PrefectKind): Promise<UpdateValueResponse> {
    if (currentKind === 'none' && requestedKind === 'json') {
      return {
        success: true,
        value: {
          __prefect_kind: 'json',
          value: stringify(value),
        } satisfies PrefectKindJson,
      }
    }

    if (currentKind === 'json' && requestedKind === 'none') {
      if (!isPrefectKindJson(value)) {
        throw 'value was not json'
      }

      const json = value.value

      if (!isDefined(json)) {
        return {
          success: true,
          value: undefined,
        }
      }

      const { valid, errors } = await api.schemas.validate(currentProperty.value, value)

      if (!valid) {
        return {
          success: false,
          message: `JSON is not valid ${ JSON.stringify(errors)}`,
        }
      }

      return {
        success: true,
        value: JSON.parse(json),
      }

    }

    return {
      success: true,
      value: {
        __prefect_kind: requestedKind,
      },
    }
  }

  return {
    value: currentValue,
    kind: kind,
    loading,
  }
}

function getPrefectKindFromValue(value: SchemaValue): PrefectKind {
  if (isPrefectKindValue(value)) {
    return value.__prefect_kind
  }

  return 'none'
}