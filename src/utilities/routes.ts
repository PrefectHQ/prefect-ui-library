import { LocationQuery, LocationQueryRaw, Router } from 'vue-router'
import { Route } from '@/router'

export function withQuery(route: Route, query: LocationQueryRaw): Route {
  return { ...route, query }
}

export function withRedirect(route: Route, redirect: string = window.location.pathname): Route {
  return withQuery(route, { redirect })
}

export function clearSelectedFilters(router: Router, parameters: string[]): LocationQuery {
  const query = { ...router.currentRoute.value.query }
  parameters.forEach(param => {
    delete query[param]
  })

  return query
}