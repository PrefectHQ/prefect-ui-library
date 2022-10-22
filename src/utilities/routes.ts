import { LocationQueryRaw } from 'vue-router'
import { Route } from '@/router'

export function withQuery(route: Route, query: LocationQueryRaw): Route {
  return { ...route, query }
}

export function withRedirect(route: Route, redirect: string = window.location.pathname): Route {
  return withQuery(route, { redirect })
}