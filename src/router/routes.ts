import { InjectionKey } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export type Route = Exclude<RouteLocationRaw, string>

export const deploymentRouteKey: InjectionKey<(deploymentId: string) => Route> = Symbol('deploymentRouteKey')
export const editDeploymentRouteKey: InjectionKey<(deploymentId: string) => Route> = Symbol('editDeploymentRouteKey')
export const editNotificationRouteKey: InjectionKey<(notificationId: string) => Route> = Symbol('editNotificationRouteKey')
export const deploymentsRouteKey: InjectionKey<() => Route> = Symbol('deploymentsRouteKey')
export const editQueueRouteKey: InjectionKey<(workQueueId: string) => Route> = Symbol('editQueueRouteKey')
export const flowRouteKey: InjectionKey<(flowId: string) => Route> = Symbol('flowRouteKey')
export const flowRunRouteKey: InjectionKey<(flowRunId: string) => Route> = Symbol('flowRunRouteKey')
export const flowRunsRouteKey: InjectionKey<() => Route> = Symbol('flowRunsRouteKey')
export const flowsRouteKey: InjectionKey<() => Route> = Symbol('flowsRouteKey')
export const notificationCreateRouteKey: InjectionKey<() => Route> = Symbol('notificationCreateRouteKey')
export const workQueueCreateRouteKey: InjectionKey<() => Route> = Symbol('workQueueCreateRouteKey')
export const settingsRouteKey: InjectionKey<() => Route> = Symbol('settingsRouteKey')
export const taskRunRouteKey: InjectionKey<(taskRunId: string) => Route> = Symbol('taskRunRouteKey')
export const workQueueRouteKey: InjectionKey<(workQueueId: string) => Route> = Symbol('workQueueRouteKey')
export const workQueuesRouteKey: InjectionKey<() => Route> = Symbol('workQueuesRouteKey')

export const blocksRouteKey: InjectionKey<() => Route> = Symbol('blocks')
export const blockRouteKey: InjectionKey<(blockDocumentId: string) => Route> = Symbol('block')
export const blockEditRouteKey: InjectionKey<(blockDocumentId: string) => Route> = Symbol('blockEdit')
export const blockCatalogRouteKey: InjectionKey<() => Route> = Symbol('blockCreate')
export const blockCatalogCreateRouteKey: InjectionKey<(blockTypeName: string) => Route> = Symbol('blockCreate')
export const notificationsRouteKey: InjectionKey<() => Route> = Symbol('notifications')
