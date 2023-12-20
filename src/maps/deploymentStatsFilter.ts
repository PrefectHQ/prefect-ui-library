import { subSeconds } from 'date-fns'
import { FlowRunsFilter } from '@/models'
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
  } else {
    filter.flowRuns = {
      startTimeNull: false,
    }
  }

  return filter
}
