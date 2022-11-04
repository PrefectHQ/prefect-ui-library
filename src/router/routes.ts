import { InjectionKey } from 'vue'
import { RouteLocationRaw } from 'vue-router'

export type Route = Exclude<RouteLocationRaw, string>

export const blockCatalogCreateRouteKey: InjectionKey<(blockTypeSlug: string) => Route> = Symbol('blocksCatalogCreate')
export const blockCatalogRouteKey: InjectionKey<() => Route> = Symbol('blocksCatalog')
export const blockCatalogViewRouteKey: InjectionKey<(blockTypeSlug: string) => Route> = Symbol('blocksCatalogView')
export const blockEditRouteKey: InjectionKey<(blockDocumentId: string) => Route> = Symbol('blockEdit')
export const blockRouteKey: InjectionKey<(blockDocumentId: string) => Route> = Symbol('block')
export const blocksRouteKey: InjectionKey<() => Route> = Symbol('blocks')
export const deploymentRouteKey: InjectionKey<(deploymentId: string) => Route> = Symbol('deploymentRouteKey')
export const deploymentsRouteKey: InjectionKey<() => Route> = Symbol('deploymentsRouteKey')
export const editDeploymentRouteKey: InjectionKey<(deploymentId: string) => Route> = Symbol('editDeploymentRouteKey')
export const editNotificationRouteKey: InjectionKey<(notificationId: string) => Route> = Symbol('editNotificationRouteKey')
export const editQueueRouteKey: InjectionKey<(workQueueId: string) => Route> = Symbol('editQueueRouteKey')
export const flowRouteKey: InjectionKey<(flowId: string) => Route> = Symbol('flowRouteKey')
export const flowRunCreateRouteKey: InjectionKey<(deploymentId: string) => Route> = Symbol('flowRunCreateRouteKey')
export const flowRunRouteKey: InjectionKey<(flowRunId: string) => Route> = Symbol('flowRunRouteKey')
export const flowRunsRouteKey: InjectionKey<() => Route> = Symbol('flowRunsRouteKey')
export const flowsRouteKey: InjectionKey<() => Route> = Symbol('flowsRouteKey')
export const notificationCreateRouteKey: InjectionKey<() => Route> = Symbol('notificationCreateRouteKey')
export const notificationsRouteKey: InjectionKey<() => Route> = Symbol('notifications')
export const radarRouteKey: InjectionKey<(flowRunId: string) => Route> = Symbol('radar')
export const settingsRouteKey: InjectionKey<() => Route> = Symbol('settingsRouteKey')
export const taskRunRouteKey: InjectionKey<(taskRunId: string) => Route> = Symbol('taskRunRouteKey')
export const workQueueCreateRouteKey: InjectionKey<() => Route> = Symbol('workQueueCreateRouteKey')
export const workQueueRouteKey: InjectionKey<(workQueueId: string) => Route> = Symbol('workQueueRouteKey')
export const workQueuesRouteKey: InjectionKey<() => Route> = Symbol('workQueuesRouteKey')
