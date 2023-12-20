import { subSeconds } from 'date-fns'
import { FlowRunsFilter, TaskRunsFilter } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { DeploymentStatsFilter } from '@/types/deployment'

export const mapDeploymentStatsFilterToFlowRunsFilter: MapFunction<DeploymentStatsFilter, FlowRunsFilter> = function(source) {
  const filter: FlowRunsFilter = {
    deployments: {
      id: [source.deploymentId],
    },
  }

  if (source.timeSpanInSeconds) {
    const now = new Date()

    filter.flowRuns = {
      startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      startTimeBefore: now,
    }
  }

  return filter
}

export const mapDeploymentStatsFilterToTaskRunsFilter: MapFunction<DeploymentStatsFilter, TaskRunsFilter> = function(source) {
  const filter: TaskRunsFilter = {
    flows: {
      id: [source.deploymentId],
    },
  }

  if (source.timeSpanInSeconds) {
    const now = new Date()

    filter.taskRuns = {
      startTimeAfter: subSeconds(now, source.timeSpanInSeconds),
      startTimeBefore: now,
    }
  }

  return filter
}

