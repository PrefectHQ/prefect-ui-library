import { KeyedDataStoreFindCallback } from './KeyedDataStore'
import { MockApi } from './MockApi'
import { Artifact } from '@/models'
import { ArtifactsFilter } from '@/models/Filters'
import { IWorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'

const artifactsItemIntersectsFilter = (filter: ArtifactsFilter): KeyedDataStoreFindCallback<Artifact> => {
  return (artifact: Artifact): boolean => {
    let filtered = false

    if (filter.artifacts?.flowRunId?.length) {
      filtered = !!artifact.flowRunId && !filter.artifacts.flowRunId.includes(artifact.flowRunId)
    }

    if (!filtered && filter.artifacts?.taskRunId?.length) {
      filtered = !!artifact.taskRunId && !filter.artifacts.taskRunId.includes(artifact.taskRunId)
    }

    if (!filtered && filter.artifacts?.key?.length) {
      filtered = !!artifact.key && !filter.artifacts.key.includes(artifact.key)
    }

    if (!filtered && filter.artifacts?.type?.length) {
      filtered = !filter.artifacts.type.includes(artifact.type)
    }

    return !filtered
  }
}

export class MockWorkspaceArtifactsApi extends MockApi implements IWorkspaceArtifactsApi {
  public async getArtifact(id: string): Promise<Artifact> {
    return await this.artifacts.get(id)
  }

  public async getArtifacts(filter: ArtifactsFilter = {}): Promise<Artifact[]> {
    const { limit = 200, offset = 0 } = filter
    let artifacts = await this.artifacts.findAll(artifactsItemIntersectsFilter(filter))
    console.log(`Artifacts: ${artifacts.length}, all: ${this.artifacts.count()}, limit: ${limit}, offset: ${offset}`)
    artifacts = artifacts.slice(offset, offset + limit)

    return artifacts
  }

  public async getArtifactsCount(filter: ArtifactsFilter = {}): Promise<number> {
    return await this.artifacts.count(artifactsItemIntersectsFilter(filter))
  }

  public async deleteArtifact(id: string): Promise<void> {
    return await this.artifacts.delete(`/${id}`)
  }
}
