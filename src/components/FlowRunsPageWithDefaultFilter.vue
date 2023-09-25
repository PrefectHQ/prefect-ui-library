<template>
  <component :is="routeComponent" v-if="routeComponent != null" />
</template>

<script lang="ts">
  import { defineComponent, shallowRef, watch } from 'vue'
  import { isEmptyObject, mapper, getQueryForFlowRunsFilter, isFunction } from '..'
  import { useDefaultSavedSearchFilter } from '@/compositions/useDefaultSavedSearchFilter'

  export default defineComponent({
    expose: [],
    beforeRouteEnter(to, from, next) {
      console.log('beforeRouteEnter')
      const { value: defaultFlowRunsSavedSearchFilter, isCustom } = useDefaultSavedSearchFilter()
      if (isEmptyObject(to.query) && isCustom.value) {
        const asFlowRunsFilter = mapper.map('SavedSearchFilter', defaultFlowRunsSavedSearchFilter.value, 'FlowRunsFilter')
        const asQueryParams = getQueryForFlowRunsFilter(asFlowRunsFilter)
        return next({ ...to, query: asQueryParams })
      }
      return next()
    },

    beforeRouteUpdate(to, from, next) {
      console.log('beforeRouteUpdate')
      const { value: defaultFlowRunsSavedSearchFilter, isCustom } = useDefaultSavedSearchFilter()
      if (isEmptyObject(to.query) && isCustom.value) {
        const asFlowRunsFilter = mapper.map('SavedSearchFilter', defaultFlowRunsSavedSearchFilter.value, 'FlowRunsFilter')
        const asQueryParams = getQueryForFlowRunsFilter(asFlowRunsFilter)
        return next({ ...to, query: asQueryParams })
      }
      return next()
    },
  })
</script>

<script setup lang="ts">
  import { RouteComponent } from 'vue-router'
  type LazilyLoadedRouteComponent = () => Promise<{ default: RouteComponent }>
  const props = defineProps<{
    component: RouteComponent | LazilyLoadedRouteComponent,
  }>()

  const routeComponent = shallowRef<RouteComponent | null>(null)

  function isLazilyLoadedRouteComponent(component: RouteComponent | (() => Promise<{ default: RouteComponent }>)): component is () => Promise<{ default: RouteComponent }> {
    return isFunction(component)
  }

  watch(props.component, () => {
    if (isLazilyLoadedRouteComponent(props.component)) {
      props.component().then(component => {
        routeComponent.value = component.default
      })
    } else {
      routeComponent.value = props.component
    }
  }, { immediate: true })
</script>