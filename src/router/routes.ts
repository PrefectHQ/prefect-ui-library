import { InjectionKey } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export type Route = Exclude<RouteLocationRaw, string>

export const deploymentRouteKey: InjectionKey<(deploymentId: string) => Route> = Symbol('deploymentRouteKey')
export const deploymentsRouteKey: InjectionKey<() => Route> = Symbol('deploymentsRouteKey')
export const editQueueRouteKey: InjectionKey<(workQueueId: string) => Route> = Symbol('editQueueRouteKey')
export const flowRouteKey: InjectionKey<(flowId: string) => Route> = Symbol('flowRouteKey')
export const flowRunRouteKey: InjectionKey<(flowRunId: string) => Route> = Symbol('flowRunRouteKey')
export const flowRunsRouteKey: InjectionKey<() => Route> = Symbol('flowRunsRouteKey')
export const flowsRouteKey: InjectionKey<() => Route> = Symbol('flowsRouteKey')
export const workQueueCreateRouteKey: InjectionKey<() => Route> = Symbol('workQueueCreateRouteKey')
export const settingsRouteKey: InjectionKey<() => Route> = Symbol('settingsRouteKey')
export const taskRunRouteKey: InjectionKey<(taskRunId: string) => Route> = Symbol('taskRunRouteKey')
export const workQueueRouteKey: InjectionKey<(workQueueId: string) => Route> = Symbol('workQueueRouteKey')
export const workQueuesRouteKey: InjectionKey<() => Route> = Symbol('workQueuesRouteKey')
export const workspaceDashboardKey: InjectionKey<Route> = Symbol('workspaceDashboardKey')
