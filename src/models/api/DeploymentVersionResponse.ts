import { DeploymentResponse } from '@/index'

export type DeploymentVersionInfoResponse = {
  type: string,
  base: string | null,
  branch: string | null,
  version: string,
  url: string | null,
} & Record<string, unknown>

export type DeploymentVersionResponse = Omit<DeploymentResponse, 'version_id' | 'version'> & {
  deployment_id: string,
  version_info: DeploymentVersionInfoResponse,
}
