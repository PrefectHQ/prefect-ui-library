import { Artifact, ArtifactResponse } from '@/models'
import { ArtifactFilter } from '@/models/Filters'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export interface IWorkspaceArtifactsApi {
  getArtifact: (id: string) => Promise<Artifact>,
  getArtifacts: (filter: ArtifactFilter) => Promise<Artifact[]>,
  getArtifactsCount: (filter: ArtifactFilter) => Promise<number>,
  deleteArtifact: (id: string) => Promise<void>,
}

export class WorkspaceArtifactsApi extends WorkspaceApi implements IWorkspaceArtifactsApi {

  protected override routePrefix = '/artifacts'

  public async getArtifact(id: string): Promise<Artifact> {
    const { data } = await this.get<ArtifactResponse>(`/${id}`)
    return mapper.map('ArtifactResponse', data, 'Artifact')
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