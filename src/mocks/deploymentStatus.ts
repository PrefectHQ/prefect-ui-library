import { DeploymentStatus, deploymentStatus } from '@/models/DeploymentStatus'
import { MockFunction } from '@/services/Mocker'

export const randomDeploymentStatus: MockFunction<DeploymentStatus, []> =
  function() {
    const choices = [...deploymentStatus] as const
    return choices[Math.floor(Math.random() * deploymentStatus.length)]
  }
