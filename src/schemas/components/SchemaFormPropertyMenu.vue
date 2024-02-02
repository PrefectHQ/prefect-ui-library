<template>
  <p-icon-button-menu small flat class="schema-form-property-menu">
    <p-overflow-menu-item v-if="showKind('json')" label="Use JSON input" @click="emit('update:kind', 'json')" />
    <p-overflow-menu-item v-if="showKind('none')" label="Use form input" @click="emit('update:kind', 'none')" />
  </p-icon-button-menu>
</template>

<script lang="ts" setup>
  import { PrefectKind } from '@/schemas/types/schemaValues'

  const props = defineProps<{
    kind: PrefectKind,
  }>()

  const emit = defineEmits<{
    'update:kind': [PrefectKind],
  }>()

  function showKind(kind: PrefectKind): boolean {
    return props.kind !== kind
  }

  // const kindValueMap: Record<PrefectKind, unknown> = reactive({
  //   'none': undefined,
  //   'json': undefined,
  //   'jinja': undefined,
  //   'workspace_variable': undefined,
  // })

  // const kind = computed<PrefectKind>(() => {
  //   if (isPrefectKindValue(props.value)) {
  //     return props.value.__prefect_kind
  //   }

  //   return 'none'
  // })

  // // need to store the initial value in the kind map
  // // eslint-disable-next-line vue/no-setup-props-destructure
  // kindValueMap[kind.value] = props.value

  // const value = computed({
  //   get() {
  //     return kindValueMap[kind.value]
  //   },
  //   set(value) {
  //     kindValueMap[kind.value] = value

  //     emit('update:value', value)
  //   },
  // })

  // function showKind(value: PrefectKind): boolean {
  //   return kind.value !== value
  // }

  // function chooseKind(value: PrefectKind): void {
  //   if (value === 'json') {
  //     emit('update:value', {
  //       __prefect_kind: 'json',
  //       value: asType(kindValueMap.json, String) ?? '',
  //     } satisfies PrefectKindJson)
  //     return
  //   }

  //   if (value === 'jinja') {
  //     return
  //   }

  //   if (value === 'workspace_variable') {
  //     return
  //   }

  //   // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  //   if (value === 'none') {
  //     emit('update:value', kindValueMap.none)
  //     return
  //   }

  //   const exhaustive: never = value
  //   throw new Error(`SchemaFormPropertyMenu chooseKind value check is not exhaustive: ${exhaustive}`)
  // }
</script>