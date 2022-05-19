import { IState } from '@/models'

export type FlowMeta = {
  flowId: string,
  created: string,
  tags: string[],
}

export type DeploymentMeta = {
  deploymentId: string,
  flowId: string,
  created: string,
  tags: string[],
}

export type FlowRunMeta = {
  stateBadge: IState,
  duration: string,
  startTime: string,
  flowName: string,
  deploymentName: string,
  flowRunId: string,
  flowId: string,
  deploymentId: string,
  created: string,
  flowVersion: string,
  idempotencyKey: string,
  runCount: number,
  flowRunner: string,
  tags: string[],
}