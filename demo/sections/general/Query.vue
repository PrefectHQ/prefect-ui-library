<template>
  <ComponentPage title="Query">
    <p-content>
      <p-label label="boolean">
        <p-checkbox v-model="boolean" />
      </p-label>
      <p-label label="number">
        <p-number-input v-model="number" />
      </p-label>
      <p-label label="string">
        <p-text-input v-model="string" />
      </p-label>
      <p-label label="array string">
        <p-select v-model="stringArray" :options="['a', 'b', 'c']" />
      </p-label>
      <p-label label="array boolean">
        <p-checkbox v-model="numberArray" :value="0" />
        <p-checkbox v-model="numberArray" :value="1" />
        <p-checkbox v-model="numberArray" :value="2" />
        <p-checkbox v-model="numberArray" :value="3" />
        <p-checkbox v-model="numberArray" :value="4" />
      </p-label>
      <p-label label="bar">
        <p-number-input v-model="bar" />
      </p-label>
      <p-label label="baz">
        <p-text-input v-model="baz" />
      </p-label>
    </p-content>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { BooleanRouteParam, NumberRouteParam, ObjectRouteParam, ObjectRouteParamSchema, StringRouteParam, usePatchRef, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { computed, ref, watchEffect } from 'vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const boolean = useRouteQueryParam('boolean', BooleanRouteParam, false)
  // watchEffect(() => console.log({ value: boolean.value }))

  const number = useRouteQueryParam('number', NumberRouteParam, 0)
  // watchEffect(() => console.log({ value: number.value }))

  const string = useRouteQueryParam('string', StringRouteParam, '')
  // watchEffect(() => console.log({ value: string.value }))

  const stringArray = useRouteQueryParam('stringArray', [StringRouteParam], [])
  // watchEffect(() => console.log({ value: stringArray.value }))

  const numberArray = useRouteQueryParam('numberArray', [NumberRouteParam], [])
  // watchEffect(() => console.log({ value: numberArray.value }))

  type Foo = {
    bar: number,
    baz: string,
  }

  class FooRouteParam extends ObjectRouteParam<Foo> {
    protected schema: ObjectRouteParamSchema<Foo> = {
      bar: NumberRouteParam,
      baz: StringRouteParam,
    }
  }

  const foo = useRouteQueryParam('foo', FooRouteParam, {
    bar: 1,
    baz: '',
  })

  const bar = usePatchRef(foo, 'bar')
  const baz = usePatchRef(foo, 'baz')

  watchEffect(() => console.log({ value: foo.value }))
</script>