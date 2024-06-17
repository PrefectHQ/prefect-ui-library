<template>
  <p-combobox v-model="selected" v-model:search="search" :options manual>
    <template #combobox-options-empty>
      No deployments
    </template>

    <template #default="scope">
      <slot v-bind="scope">
        <UseDeploymentSlot v-if="isString(scope.value)" :deployment-id="scope.value">
          <template #default="{ deployment }">
            <DeploymentComboboxOption :flow-id="deployment.flowId" :deployment-name="deployment.name" />
          </template>
        </UseDeploymentSlot>
      </slot>
    </template>

    <template #option="{ option }">
      <slot name="option" :option="option" />
    </template>

    <template v-if="count > deployments.length" #bottom>
      <p class="deployment-combobox__more">
        {{ count - deployments.length }} more results. <span><p-link :to="moreLink">Browse all</p-link></span>
      </p>
    </template>
  </p-combobox>
</template>

<script lang="ts" setup>
  import { PCombobox, SelectOption } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import UseDeploymentSlot from '@/components/UseDeploymentSlot.vue'
  import { useDeployments, useWorkspaceRoutes } from '@/compositions'
  import { isString, withQuery } from '@/utilities'

  const selected = defineModel<string | string[] | null | undefined>('selected', { required: true })

  const props = defineProps<{
    allowUnset?: boolean,
  }>()

  const routes = useWorkspaceRoutes()
  const search = ref('')
  const searchDebounced = useDebouncedRef(search, 500)

  const { deployments, count } = useDeployments(() => ({
    deployments: {
      nameLike: searchDebounced.value,
    },
    limit: 100,
  }))

  const moreLink = computed(() => withQuery(routes.deployments(), {
    'deployments.nameLike': search.value,
  }))

  const options = computed<SelectOption[]>(() => {
    const options: SelectOption[] = deployments.value.map(deployment => ({
      value: deployment.id,
      label: deployment.name,
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
.deployment-combobox__more { @apply
  text-sm
  text-subdued
  text-center
  border-t-divider
  border-t
  pt-1
}
</style>
