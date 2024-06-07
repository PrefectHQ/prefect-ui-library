<template>
  <p-combobox v-model="selected" v-model:search="search" :options manual>
    <template #combobox-options-empty>
      No flows
    </template>

    <template #default="scope">
      <slot v-bind="scope">
        <UseFlowSlot v-if="isString(scope.value)" :flow-id="scope.value">
          <template #default="{ flow }">
            {{ flow.name }}
          </template>
        </UseFlowSlot>
      </slot>
    </template>

    <template #option="{ option }">
      <slot name="option" :option="option" />
    </template>

    <template v-if="count > flows.length" #bottom>
      <p class="flow-combobox__more">
        {{ count - flows.length }} more results. <span><p-link :to="moreLink">Browse all</p-link></span>
      </p>
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import UseFlowSlot from '@/components/UseFlowSlot.vue'
  import { useFlows, useWorkspaceRoutes } from '@/compositions'
  import { isString, withQuery } from '@/utilities'

  const selected = defineModel<string | string[] | null | undefined>('selected', { required: true })

  const props = defineProps<{
    allowUnset?: boolean,
  }>()

  const routes = useWorkspaceRoutes()
  const search = ref('')
  const searchDebounced = useDebouncedRef(search, 500)

  const { flows, count } = useFlows(() => ({
    flows: {
      nameLike: searchDebounced.value,
    },
    limit: 20,
  }))

  const moreLink = computed(() => withQuery(routes.flows(), {
    'flows.nameLike': search.value,
  }))

  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = flows.value.map(flow => ({
      value: flow.id,
      label: flow.name,
    }))

    if (props.allowUnset) {
      options.unshift({
        value: null,
        label: 'None',
      })
    }

    return options
  })
</script>

<style>
.flow-combobox__more { @apply
  text-sm
  text-subdued
  text-center
  border-t-divider
  border-t
  pt-1
}
</style>
