export type DeploymentVersionInfo = {
  type: string,
  base: string | null,
  branch: string | null,
  version: string,
  url: string | null,
} & Record<string, unknown>