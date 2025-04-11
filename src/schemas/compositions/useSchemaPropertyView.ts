import { MaybeRefOrGetter, computed, toValue } from 'vue'
import SchemaPropertyView from '@/schemas/components/SchemaPropertyView.vue'
import SchemaPropertyViewKindJinja from '@/schemas/components/SchemaPropertyViewKindJinja.vue'
import SchemaPropertyViewKindJson from '@/schemas/components/SchemaPropertyViewKindJson.vue'
import SchemaPropertyViewKindWorkspaceVariable from '@/schemas/components/SchemaPropertyViewKindWorkspaceVariable.vue'
import { SchemaProperty } from '@/schemas/types/schema'
import { isPrefectKindValue } from '@/schemas/types/schemaValues'
import { SchemaValue } from '@/types'
import { withProps } from '@/utilities/components'

// this is a lot easier to just let typescript infer the return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useSchemaPropertyView(schemaProperty: MaybeRefOrGetter<SchemaProperty>, propertyValue: MaybeRefOrGetter<SchemaValue>) {
  const view = computed(() => {
    const property = toValue(schemaProperty)
    const value = toValue(propertyValue)

    if (!isPrefectKindValue(value) || isPrefectKindValue(value, 'none')) {
      return withProps(SchemaPropertyView, {
        property,
        value,
      })
    }

    // if (isPrefectKindValue(value, 'json')) {
    //   return withProps(SchemaPropertyViewKindJson, {
    //     value,
    //   })
    // }

    // if (isPrefectKindValue(value, 'jinja')) {
    //   return withProps(SchemaPropertyViewKindJinja, {
    //     value,
    //   })
    // }

    // if (isPrefectKindValue(value, 'workspace_variable')) {
    //   return withProps(SchemaPropertyViewKindWorkspaceVariable, {
    //     value,
    //   })
    // }

    // const exhaustive: never = value
    // console.error(new Error(`SchemaFormProperty view is not exhaustive: ${JSON.stringify(exhaustive)}`))

    return withProps(() => '')
  })

  return { view }
}