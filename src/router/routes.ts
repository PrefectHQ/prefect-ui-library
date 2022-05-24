import { InjectionKey } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export const workspaceDashboardKey: InjectionKey<Exclude<RouteLocationRaw, string>> = Symbol('workspaceDashboardKey')

export const flowsRouteKey: InjectionKey<() => RouteLocationRaw> = Symbol('flowsRouteKey')
export const flowRunsRouteKey: InjectionKey<() => RouteLocationRaw> = Symbol('flowRunsRouteKey')
export const deploymentsRouteKey: InjectionKey<() => RouteLocationRaw> = Symbol('deploymentsRouteKey')
export const queuesRouteKey: InjectionKey<() => RouteLocationRaw> = Symbol('queuesRouteKey')
export const settingsRouteKey: InjectionKey<() => RouteLocationRaw> = Symbol('settingsRouteKey')
export const flowRunRouteKey: InjectionKey<(flowRunId: string) => RouteLocationRaw> = Symbol('flowRunRouteKey')
export const taskRunRouteKey: InjectionKey<(taskRunId: string) => RouteLocationRaw> = Symbol('taskRunRouteKey')
export const flowRouteKey: InjectionKey<(flowId: string) => RouteLocationRaw> = Symbol('flowRouteKey')
export const deploymentRouteKey: InjectionKey<(deploymentId: string) => RouteLocationRaw> = Symbol('deploymentRouteKey')
export const workQueueRouteKey: InjectionKey<(workQueueId: string) => RouteLocationRaw> = Symbol('workQueueRouteKey')