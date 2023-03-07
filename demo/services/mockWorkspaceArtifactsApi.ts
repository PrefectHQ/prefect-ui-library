import { MockApi } from './MockApi'
import { Artifact } from '@/models'
import { ArtifactsFilter } from '@/models/Filters'
import { IWorkspaceArtifactsApi } from '@/services/WorkspaceArtifactsApi'

export class MockWorkspaceArtifactsApi extends MockApi implements IWorkspaceArtifactsApi {

  public async getArtifact(id: string): Promise<Artifact> {
    return await this.artifacts.get(id)
  }

  public async getArtifacts(filter: ArtifactsFilter = {}): Promise<Artifact[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceArtifactsApi has not implemented the filter argument of the getArtifacts method')
    }


    return await this.artifacts.getAll()
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
