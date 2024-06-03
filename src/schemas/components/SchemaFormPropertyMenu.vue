<template>
  <p-icon-button-menu v-if="showMenu" size="sm" class="schema-form-property-menu">
    <template v-if="!disabled">
      <template v-if="showNone">
        <p-overflow-menu-item v-if="showKind('none')" label="Use form input" @click="kind = 'none'" />
      </template>
      <p-overflow-menu-item v-if="showKind('json')" label="Use JSON input" @click="kind = 'json'" />
      <p-overflow-menu-item v-if="showKind('workspace_variable')" label="Select variable" @click="kind = 'workspace_variable'" />
      <p-overflow-menu-item v-if="showKind('jinja')" label="Use Jinja input" @click="kind = 'jinja'" />
    </template>

    <p-divider class="schema-form-property-menu__divider" />

    <p-overflow-menu-item v-if="showUseDefault" label="Use default value" @click="setDefaultValue" />
    <slot />
  </p-icon-button-menu>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import isEqual from 'lodash.isequal'
  import { computed, useSlots } from 'vue'
  import { useSchemaFormSettings } from '@/schemas/compositions/useSchemaFormSettings'
  import { SchemaProperty, isSchemaPropertyType } from '@/schemas/types/schema'
  import { SchemaValue, PrefectKind, isPrefectKindJson, PrefectKindJson, isPrefectKindWorkspaceVariable, isPrefectKindJinja } from '@/schemas/types/schemaValues'
  import { isNullish, stringify } from '@/utilities'

  const kind = defineModel<PrefectKind>('kind', { required: true })
  const value = defineModel<SchemaValue>('value', { required: true })

  const props = defineProps<{
    property: SchemaProperty,
    disabled?: boolean,
  }>()

  const slots = useSlots()
  const { kinds } = useSchemaFormSettings()

  const showMenu = computed(() => kinds.length || slots.default)

  const showNone = computed(() => {
    if (isSchemaPropertyType(props.property.type, 'object') && isNullish(props.property.properties)) {
      return false
    }

    if (isSchemaPropertyType(props.property.type, undefined) && isDefined(props.property.enum)) {
      return true
    }

    return props.property.type !== undefined
  })

  const showUseDefault = computed(() => {
    if (!isDefined(props.property.default)) {
      return false
    }

    if (isPrefectKindWorkspaceVariable(value.value) || isPrefectKindJinja(value.value)) {
      return true
    }

    if (isPrefectKindJson(value.value)) {
      return !isEqual(value.value.value, stringify(props.property.default))
    }

    return !isEqual(value.value, props.property.default)
  })

  function showKind(value: PrefectKind): boolean {
    return kind.value !== value && (kinds.includes(value) || value === 'none')
  }

  function setDefaultValue(): void {
    if (isPrefectKindJson(value.value)) {
      value.value = {
        __prefect_kind: 'json',
        value: stringify(props.property.default),
      } satisfies PrefectKindJson

      return
    }

    value.value = props.property.default
  }
</script>

<style>
.schema-form-property-menu__divider .p-divider__line { @apply
  m-0
}

.schema-form-property-menu__divider:first-child,
.schema-form-property-menu__divider:last-child { @apply
  hidden
}
</style>