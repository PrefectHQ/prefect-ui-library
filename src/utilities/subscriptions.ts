import { UseSubscription, SubscriptionManager } from '@prefecthq/vue-compositions'
import { InjectionKey } from 'vue'
import { WorkspaceWorkQueuesApi, WorkspaceFlowsApi, WorkspaceDeploymentsApi } from '@/services'

export const backgroundSubscriptionManager = new SubscriptionManager()

export type WorkQueueSubscription = UseSubscription<WorkspaceWorkQueuesApi['getWorkQueue']>
export type WorkQueuesListSubscription = UseSubscription<WorkspaceWorkQueuesApi['getWorkQueues']>
export type FlowsListSubscription = UseSubscription<WorkspaceFlowsApi['getFlows']>
export type DeploymentsListSubscription = UseSubscription<WorkspaceDeploymentsApi['getDeployments']>


export const workQueueSubscriptionKey: InjectionKey<WorkQueueSubscription> = Symbol('workQueueSubscriptionKey')
export const workQueuesListSubscriptionKey: InjectionKey<WorkQueuesListSubscription> = Symbol('workQueuesListSubscriptionKey')
export const flowsListSubscriptionKey: InjectionKey<FlowsListSubscription> = Symbol('flowsListSubscriptionKey')
export const deploymentsListSubscriptionKey: InjectionKey<DeploymentsListSubscription> = Symbol('deploymentsListSubscriptionKey')
