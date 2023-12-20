import { subSeconds } from 'date-fns'
import { FlowRunsFilter } from '@/models'
import { MapFunction } from '@/services/Mapper'
import { DeploymentStatsFilter } from '@/types/deployment'

export const mapDeploymentStatsFilterToFlowRunsFilter: MapFunction<DeploymentStatsFilter, FlowRunsFilter> = function(source) {
  const now = new Date()

  const filter: FlowRunsFilter = {
    deployments: {
      id: [source.deploymentId],
    },
    flowRuns: {
      startTimeAfter: source.timeSpanInSeconds ? subSeconds(now, source.timeSpanInSeconds) : undefined,
      startTimeBefore: now,
    },
  }

  return filter
}
