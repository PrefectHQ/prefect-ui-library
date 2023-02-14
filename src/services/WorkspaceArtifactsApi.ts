import { Artifact, ArtifactResponse } from '@/models'
import { ArtifactFilter } from '@/models/Filters'
import { BatchProcessor } from '@/services/BatchProcessor'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { toMap } from '@/utilities'

export interface IWorkspaceArtifactsApi {
  getArtifact: (id: string) => Promise<Artifact>,
  getArtifacts: (filter: ArtifactFilter) => Promise<Artifact[]>,
  getArtifactsCount: (filter: ArtifactFilter) => Promise<number>,
  deleteArtifact: (id: string) => Promise<void>,
}

export class WorkspaceArtifactsApi extends WorkspaceApi implements IWorkspaceArtifactsApi {

  protected override routePrefix = '/artifacts'

  private readonly batcher = new BatchProcessor<string, Artifact>(async ids => {
    const artifacts = await this.getArtifacts({ id: ids })
    return toMap(artifacts, 'id')
  }, { maxBatchSize: 200 })

  public getArtifact(id: string): Promise<Artifact> {
    return this.batcher.batch(id)
  }

  public async getArtifacts(filter: ArtifactFilter = {}): Promise<Artifact[]> {
    const request = mapper.map('ArtifactFilter', filter, 'ArtifactFilterRequest')
    const { data } = await this.post<ArtifactResponse[]>('filter', request)
    return mapper.map('ArtifactResponse', data, 'Artifact')
  }

  public async getArtifactsCount(filter: ArtifactFilter = {}): Promise<number> {
    const request = mapper.map('ArtifactFilter', filter, 'ArtifactFilterRequest')
    const { data } = await this.post<number>('count', request)
    return data
  }

  public deleteArtifact(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}