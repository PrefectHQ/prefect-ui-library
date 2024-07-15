import { DeploymentSchedule } from '@/models/DeploymentSchedule'
import { SchemaValuesV2 } from '@/schemas'

export type DeploymentCreate = {
  name: string,
  version: string,
  description: string | null,
  flowId: string,
  paused: boolean,
  schedules: DeploymentSchedule[],
  parameters: SchemaValuesV2,
  parameterOpenApiSchema: unknown,
  tags: string[] | null,
  manifestPath: string | null,
  path: string | null,
  entrypoint: string | null,
  storageDocumentId: string | null,
  infrastructureDocumentId: string | null,
  jobVariables: Record<string, unknown> | null,
  workQueueName: string | null,
  workPoolName: string | null,
  enforceParameterSchema: boolean,
  pullSteps: unknown,
}
