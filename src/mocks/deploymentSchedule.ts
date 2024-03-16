import { DeploymentSchedule } from '@/models/DeploymentSchedule'
import { MockFunction } from '@/services/Mocker'
import { random, uniform } from '@/utilities/math'

export const randomDeploymentSchedules: MockFunction<DeploymentSchedule[], [Partial<DeploymentSchedule>?]> = function(overrides = {}) {
  const numDeploymentSchedules = uniform(0, 3)
  const deploymentSchedules: DeploymentSchedule[] = []

  for (let i = 0; i < numDeploymentSchedules; i++) {
    deploymentSchedules[i] = {
      id: this.create('id'),
      created: this.create('date'),
      updated: this.create('date'),
      active: random() > 0.25,
      schedule: this.create('schedule'),
      jobVariables: {},
      ...overrides,
    }
  }

  return deploymentSchedules
}