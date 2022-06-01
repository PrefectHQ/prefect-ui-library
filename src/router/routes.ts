import { InjectionKey } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export type Route = Exclude<RouteLocationRaw, string>

export const deploymentRouteKey: InjectionKey<(deploymentId: string) => Route> = Symbol('deploymentRouteKey')
export const deploymentsRouteKey: InjectionKey<() => Route> = Symbol('deploymentsRouteKey')
export const flowRouteKey: InjectionKey<(flowId: string) => Route> = Symbol('flowRouteKey')
export const flowRunRouteKey: InjectionKey<(flowRunId: string) => Route> = Symbol('flowRunRouteKey')
export const flowRunsRouteKey: InjectionKey<() => Route> = Symbol('flowRunsRouteKey')
export const flowsRouteKey: InjectionKey<() => Route> = Symbol('flowsRouteKey')
export const queueRouteKey: InjectionKey<() => Route> = Symbol('queueRouteKey')
export const queuesRouteKey: InjectionKey<() => Route> = Symbol('queuesRouteKey')
export const settingsRouteKey: InjectionKey<() => Route> = Symbol('settingsRouteKey')
export const taskRunRouteKey: InjectionKey<(taskRunId: string) => Route> = Symbol('taskRunRouteKey')
export const workQueueRouteKey: InjectionKey<(workQueueId: string) => RouteLocationRaw> = Symbol('workQueueRouteKey')
export const workspaceDashboardKey: InjectionKey<Route> = Symbol('workspaceDashboardKey')
export const newQueueRouteKey: InjectionKey<() => Route> = Symbol('newQueueRouteKey')
export const editQueueRouteKey: InjectionKey<(workQueueId: string) => Route> = Symbol('editQueueRouteKey')
