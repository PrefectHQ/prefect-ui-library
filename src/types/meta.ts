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