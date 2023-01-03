/* eslint-disable camelcase */
import { ComputedRef, computed, ref } from 'vue'
import { mapper } from '@/services'
import { MaybeRef, FlowSortValues, FlowRunSortValues, UnionFilters } from '@/types'

export type FilterSortValues = FlowSortValues | FlowRunSortValues

export type UseFilterArgs<T = FilterSortValues> = {
  flows?: MaybeRef<string[]>,
  flowName?: MaybeRef<string>,
  deployments?: MaybeRef<string[]>,
  deploymentName?: MaybeRef<string>,
  deploymentTags?: MaybeRef<string[]>,
  tags?: MaybeRef<string[]>,
  states?: MaybeRef<string[]>,
  startDate?: MaybeRef<Date>,
  endDate?: MaybeRef<Date>,
  sort?: MaybeRef<T>,
  name?: MaybeRef<string>,
  workQueues?: MaybeRef<string[]>,
  workerPools?: MaybeRef<string[]>,
  workerPoolName?: MaybeRef<string>,
  workerPoolQueues?: MaybeRef<string[]>,
  workerPoolQueueName?: MaybeRef<string>,
}

export function useFilter(filters: MaybeRef<UseFilterArgs>): ComputedRef<UnionFilters> {
  return computed<UnionFilters>(() => {
    const filtersRef = ref(filters)
    const flows = ref(filtersRef.value.flows)
    const flowName = ref(filtersRef.value.flowName)
    const deployments = ref(filtersRef.value.deployments)
    const deploymentName = ref(filtersRef.value.deploymentName)
    const deploymentTags = ref(filtersRef.value.deploymentTags)
    const tags = ref(filtersRef.value.tags)
    const states = ref(filtersRef.value.states)
    const startDate = ref(filtersRef.value.startDate)
    const endDate = ref(filtersRef.value.endDate)
    const sort = ref(filtersRef.value.sort)
    const name = ref(filtersRef.value.name)
    const workQueues = ref(filtersRef.value.workQueues)
    const workerPools = ref(filtersRef.value.workerPools)
    const workerPoolName = ref(filtersRef.value.workerPoolName)
    const workerPoolQueues = ref(filtersRef.value.workerPoolQueues)
    const workerPoolQueueName = ref(filtersRef.value.workerPoolQueueName)

    const response: UnionFilters = {}

    if (flows.value?.length) {
      response.flows ??= {}
      response.flows.id ??= {}

      response.flows.id.any_ = flows.value
    }

    if (flowName.value?.length) {
      response.flows ??= {}
      response.flows.name ??= {}
      response.flows.name.like_ = flowName.value
    }

    if (deployments.value?.length) {
      response.deployments ??= {}
      response.deployments.id ??= {}

      response.deployments.id.any_ = deployments.value
    }

    if (deploymentName.value?.length) {
      response.deployments ??= {}
      response.deployments.name ??= {}

      response.deployments.name.like_ = deploymentName.value
    }

    if (deploymentTags.value?.length) {
      response.deployments ??= {}
      response.deployments.tags ??= {}

      response.deployments.tags.all_ = deploymentTags.value
    }

    if (tags.value?.length) {
      response.flow_runs ??= {}
      response.flow_runs.tags ??= {}

      response.flow_runs.tags.all_ = tags.value
    }

    if (states.value?.length) {
      response.flow_runs ??= {}
      response.flow_runs.state ??= {}
      response.flow_runs.state.name ??= {}
      response.flow_runs.state.name.any_ = states.value
    }

    if (startDate.value) {
      response.flow_runs ??= {}
      response.flow_runs.expected_start_time ??= {}

      response.flow_runs.expected_start_time.after_ = mapper.map('Date', startDate.value, 'string')
    }

    if (endDate.value) {
      response.flow_runs ??= {}
      response.flow_runs.expected_start_time ??= {}

      response.flow_runs.expected_start_time.before_ = mapper.map('Date', endDate.value, 'string')
    }

    if (sort.value) {
      response.sort = sort.value
    }

    if (name.value) {
      response.flow_runs ??= {}
      response.flow_runs.name ??= {}

      response.flow_runs.name.like_ = name.value
    }

    if (workQueues.value?.length) {
      response.flow_runs ??= {}
      response.flow_runs.work_queue_name ??= {}

      response.flow_runs.work_queue_name.any_ = workQueues.value
    }

    if (workerPools.value?.length) {
      response.worker_pools ??= {}
      response.worker_pools.id ??= {}

      response.worker_pools.id.any_ = workerPools.value
    }

    if (workerPoolName.value?.length) {
      response.worker_pools ??= {}
      response.worker_pools.name ??= {}
      response.worker_pools.name.like_ = workerPoolName.value
    }

    if (workerPoolQueues.value?.length) {
      response.worker_pool_queues ??= {}
      response.worker_pool_queues.id ??= {}

      response.worker_pool_queues.id.any_ = workerPoolQueues.value
    }

    if (workerPoolQueueName.value?.length) {
      response.worker_pool_queues ??= {}
      response.worker_pool_queues.name ??= {}
      response.worker_pool_queues.name.like_ = workerPoolQueueName.value
    }

    return response
  })
}