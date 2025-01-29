import { Deployment, DeploymentResponse, Flow, FlowResponse, FlowRun, FlowRunResponse, TaskRun, TaskRunResponse } from '@/models'
import { Paginated } from '@/models/pagination'
import { MapFunction } from '@/services'

export const mapFlowRunsPaginationResponseToFlowRunsPagination: MapFunction<Paginated<FlowRunResponse>, Paginated<FlowRun>> = function(source) {
  const results = this.map('FlowRunResponse', source.results, 'FlowRun')

  return {
    ...source,
    results,
  }
}

export const mapTaskRunsPaginationResponseToTaskRunsPagination: MapFunction<Paginated<TaskRunResponse>, Paginated<TaskRun>> = function(source) {
  const results = this.map('TaskRunResponse', source.results, 'TaskRun')

  return {
    ...source,
    results,
  }
}

export const mapFlowsPaginationResponseToFlowRunsPagination: MapFunction<Paginated<FlowResponse>, Paginated<Flow>> = function(source) {
  const results = this.map('FlowResponse', source.results, 'Flow')

  return {
    ...source,
    results,
  }
}

export const mapDeploymentsPaginationResponseToDeploymentRunsPagination: MapFunction<Paginated<DeploymentResponse>, Paginated<Deployment>> = function(source) {
  const results = this.map('DeploymentResponse', source.results, 'Deployment')

  return {
    ...source,
    results,
  }
}