import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
import { MockWorkspaceBlockDocumentsApi } from '../services/mockWorkspaceBlockDocumentsApi'
import { MockWorkspaceBlockSchemasApi } from '../services/mockWorkspaceBlockSchemasApi'
import { MockWorkspaceFlowsApi } from '../services/mockWorkspaceFlowsApi'
import { BlockDocumentResponse, BlockSchemaResponse, FlowResponse } from '@/models'
import { WorkspaceApiConfig } from '@/services'
import { CreateApi, workspaceApiKey } from '@/utilities'


type ApiMockSeeds = {
  flows?: FlowResponse[],
  blockDocuments?: BlockDocumentResponse[],
  blockSchemas?: BlockSchemaResponse[],
}

function createApiMock(seeds: ApiMockSeeds = {}): Pick<CreateApi, 'flows' | 'blockDocuments' | 'blockSchemas'> {
  const config: WorkspaceApiConfig = { baseUrl: '' }

  return {
    flows: createActions(new MockWorkspaceFlowsApi(config, seeds.flows)),
    blockDocuments: createActions(new MockWorkspaceBlockDocumentsApi(config, seeds.blockDocuments)),
    blockSchemas: createActions(new MockWorkspaceBlockSchemasApi(config, seeds.blockSchemas)),
  }
}

export function useWorkspaceApiMock(seeds: ApiMockSeeds = {}): Pick<CreateApi, 'flows' | 'blockDocuments'> {
  const api = createApiMock(seeds)

  provide(workspaceApiKey, api)

  return api
}