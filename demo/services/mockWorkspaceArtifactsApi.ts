import { MockApi } from './MockApi'
import { Artifact } from '@/models'
import { ArtifactsFilter } from '@/models/Filters'
import { IWorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'

export class MockWorkspaceArtifactsApi extends MockApi implements IWorkspaceArtifactsApi {
  public async getArtifact(id: string): Promise<Artifact> {
    return await this.artifacts.get(id)
  }

  public async getArtifacts(filter: ArtifactsFilter = {}): Promise<Artifact[]> {
    let artifacts = await this.artifacts.getAll()

    if (filter.artifacts?.flowRunId?.length) {
      artifacts = artifacts.filter(artifact => artifact.flowRunId && filter.artifacts?.flowRunId?.includes(artifact.flowRunId))
    }

    if (filter.artifacts?.taskRunId?.length) {
      artifacts = artifacts.filter(artifact => artifact.taskRunId && filter.artifacts?.taskRunId?.includes(artifact.taskRunId))
    }

    if (filter.artifacts?.key?.length) {
      artifacts = artifacts.filter(artifact => artifact.key && filter.artifacts?.key?.includes(artifact.key))
    }

    if (filter.artifacts?.type?.length) {
      artifacts = artifacts.filter(artifact => filter.artifacts?.type?.includes(artifact.type))
    }

    return artifacts
  }

  public async getArtifactsCount(filter: ArtifactsFilter = {}): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceArtifactsApi has not implemented the filter argument of the getArtifactsCount method')
    }
    return await this.artifacts.count()
  }

  public async deleteArtifact(id: string): Promise<void> {
    return await this.artifacts.delete(`/${id}`)
  }
}
