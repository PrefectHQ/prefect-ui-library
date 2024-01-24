<template>
  <component :is="routeComponent" v-if="routeComponent !== null" />
</template>

<script lang="ts">
  import { defineComponent, shallowRef, watch } from 'vue'
  import { NavigationGuard, RouteComponent } from 'vue-router'
  import { isEmptyObject, mapper, isFunction } from '..'
  import { useDefaultSavedSearchFilter } from '@/compositions/useDefaultSavedSearchFilter'

  const setDefaultFlowRunsFilterQueryIfEmpty: NavigationGuard = (to) => {
    const { value: defaultFlowRunsSavedSearchFilter, isCustom } = useDefaultSavedSearchFilter()

    if (isEmptyObject(to.query) && isCustom.value) {
      try {
        const query = mapper.map('SavedSearchFilter', defaultFlowRunsSavedSearchFilter.value, 'LocationQuery')

        return { ...to, query }
      } catch (error) {
        console.error(error)
      }
    }

    return true
  }

  export default defineComponent({
    expose: [],
    beforeRouteEnter: setDefaultFlowRunsFilterQueryIfEmpty,
    beforeRouteUpdate: setDefaultFlowRunsFilterQueryIfEmpty,
  })
</script>

<script setup lang="ts">
  type LazilyLoadedRouteComponent = () => Promise<{ default: RouteComponent }>
  const props = defineProps<{
    component: RouteComponent | LazilyLoadedRouteComponent,
  }>()

  const routeComponent = shallowRef<RouteComponent | null>(null)

  function isLazilyLoadedRouteComponent(component: RouteComponent | LazilyLoadedRouteComponent): component is LazilyLoadedRouteComponent {
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