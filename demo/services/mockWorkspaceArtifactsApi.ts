import { KeyedDataStoreFindCallback } from './KeyedDataStore'
import { MockApi } from './MockApi'
import { Artifact, ArtifactCollection } from '@/models'
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
    const { limit = 200, offset = 0, sort = 'CREATED_DESC' } = filter
    let artifacts = await this.artifacts.findAll(artifactsItemIntersectsFilter(filter))

    switch (sort) {
      /* eslint-disable id-length */
      case 'CREATED_DESC':
        artifacts = artifacts.sort((a, b) => b.created.getTime() - a.created.getTime())
        break
      case 'KEY_ASC':
        artifacts = artifacts.sort((a, b) => a.key?.localeCompare(b.key ?? '') ?? 0)
        break
      case 'KEY_DESC':
        artifacts = artifacts.sort((a, b) => b.key?.localeCompare(a.key ?? '') ?? 0)
        break
      default:
        break
      /* eslint-enable id-length */
    }

    artifacts = artifacts.slice(offset, offset + limit)

    return artifacts
  }

  public async getArtifactCollections(filter: ArtifactsFilter = {}): Promise<ArtifactCollection[]> {
    const { limit = 200, offset = 0, sort = 'CREATED_DESC' } = filter
    let artifacts = await this.artifactCollections.findAll(artifactsItemIntersectsFilter(filter))

    switch (sort) {
      /* eslint-disable id-length */
      case 'CREATED_DESC':
        artifacts = artifacts.sort((a, b) => b.created.getTime() - a.created.getTime())
        break
      case 'KEY_ASC':
        artifacts = artifacts.sort((a, b) => a.key.localeCompare(b.key))
        break
      case 'KEY_DESC':
        artifacts = artifacts.sort((a, b) => b.key.localeCompare(a.key))
        break
      default:
        break
      /* eslint-enable id-length */
    }

    artifacts = artifacts.slice(offset, offset + limit)

    return artifacts
  }

  public async getArtifactCollection(key: string): Promise<ArtifactCollection> {
    const artifactCollection = await this.artifactCollections.find((artifactCollection: ArtifactCollection) => artifactCollection.key === key)

    if (!artifactCollection) {
      throw new Error(`Artifact collection with key ${key} not found`)
    }

    return artifactCollection
  }

  public async getArtifactCollectionsCount(filter: ArtifactsFilter): Promise<number> {
    return await this.artifactCollections.count(artifactsItemIntersectsFilter(filter))
  }

  public async getArtifactsCount(filter: ArtifactsFilter = {}): Promise<number> {
    return await this.artifacts.count(artifactsItemIntersectsFilter(filter))
  }

  public async deleteArtifact(id: string): Promise<void> {
    return await this.artifacts.delete(`/${id}`)
  }
}
