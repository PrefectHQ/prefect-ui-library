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
      startTimeBefore: now,
    },
  }

  return filter
}
