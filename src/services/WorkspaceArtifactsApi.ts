import { Artifact, ArtifactResponse } from '@/models'
import { ArtifactCollectionResponse } from '@/models/api/ArtifactCollectionResponse'
import { ArtifactCollection } from '@/models/ArtifactCollection'
import { ArtifactsFilter } from '@/models/Filters'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities'

export class WorkspaceArtifactsApi extends WorkspaceApi {

  protected override routePrefix = '/artifacts'

  private readonly batcher = new BatchProcessor<string, Artifact>(async ids => {
    if (ids.length === 1) {
      const [id] = ids
      const { data } = await this.get<ArtifactResponse>(`/${id}`)

      return () => mapper.map('ArtifactResponse', data, 'Artifact')
    }

    const artifacts = await this.getArtifacts({ artifacts: { id: ids } })

    return toMap(artifacts, 'id')
  }, { maxBatchSize: 200 })

  private readonly keyBatcher = new BatchProcessor<string, ArtifactCollection>(async keys => {
    if (keys.length === 1) {
      const [key] = keys
      const { data } = await this.get<ArtifactCollectionResponse>(`/${key}/latest`)

      return () => mapper.map('ArtifactCollectionResponse', data, 'ArtifactCollection')
    }

    const collections = await this.getArtifactCollections({ artifacts: { key: keys } })

    return toMap(collections, 'key')
  }, { maxBatchSize: 200 })

  public getArtifact(id: string): Promise<Artifact> {
    return this.batcher.batch(id)
  }

  public getArtifactCollection(key: string): Promise<ArtifactCollection> {
    return this.keyBatcher.batch(key)
  }

  public async getArtifacts(filter: ArtifactsFilter = {}): Promise<Artifact[]> {
    const request = mapper.map('ArtifactsFilter', filter, 'ArtifactsFilterRequest')
    const { data } = await this.post<ArtifactResponse[]>('filter', request)
    return mapper.map('ArtifactResponse', data, 'Artifact')
  }

  public async getArtifactsCount(filter: ArtifactsFilter = {}): Promise<number> {
    const request = mapper.map('ArtifactsFilter', filter, 'ArtifactsFilterRequest')
    const { data } = await this.post<number>('count', request)
    return data
  }

  public async getArtifactCollections(filter: ArtifactsFilter = {}): Promise<ArtifactCollection[]> {
    const request = mapper.map('ArtifactsFilter', filter, 'ArtifactsFilterRequest')
    const { data } = await this.post<ArtifactCollectionResponse[]>('latest/filter', request)
    return mapper.map('ArtifactCollectionResponse', data, 'ArtifactCollection')
  }

  public async getArtifactCollectionsCount(filter: ArtifactsFilter = {}): Promise<number> {
    const request = mapper.map('ArtifactsFilter', filter, 'ArtifactsFilterRequest')
    const { data } = await this.post<number>('latest/count', request)
    return data
  }

  public deleteArtifact(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}