/* eslint-disable max-classes-per-file */
import { createActions } from '@prefecthq/vue-compositions'
import { provide } from 'vue'
import { Flow, FlowResponse } from '@/models'
import { mapper, mocker, WorkspaceApiConfig, WorkspaceFlowsApi } from '@/services'
import { UnionFilters } from '@/types/UnionFilters'
import { CreateApi, workspaceApiKey } from '@/utilities'

class DataStoreDataNotFound extends Error {
  public constructor() {
    super('Mocked data not found')
  }
}

type DataStoreData = Record<string, unknown> & { id: string }
type DataStoreFindCallback<T> = (value: T) => boolean

class DataStore<T extends DataStoreData> {
  private _data: string = '{}'

  private get data(): Record<string, T> {
    return JSON.parse(this._data)
  }

  private set data(value: Record<string, T>) {
    this._data = JSON.stringify(value)
  }

  public constructor(seeds: T[] = []) {
    const data = {} as Record<string, T>

    this.data = seeds.reduce((data, seed) => {
      data[seed.id] = seed

      return data
    }, data)
  }

  public all(): T[] {
    return Object.values(this.data)
  }

  public get(id: string): T {
    const record = this.data[id]

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!record) {
      throw new DataStoreDataNotFound()
    }

    return record
  }

  public find(condition: DataStoreFindCallback<T>): T | undefined {
    const data = this.all()

    return data.find(record => condition(record))
  }

  public findAll(condition: DataStoreFindCallback<T>): T[] {
    const data = this.all()

    return data.filter(record => condition(record))
  }

  public count(condition?: DataStoreFindCallback<T>): number {
    if (condition) {
      return this.findAll(condition).length
    }

    return this.all().length
  }

  public delete(id: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: removed, ...data } = this.data

    this.data = data
  }

  public create(record: T): T {
    this.data = {
      ...this.data,
      [record.id]: record,
    }

    return this.get(record.id)
  }

  public patch(id: string, update: Partial<T>): T {
    const original = this.get(id)
    const updated = { ...original, ...update }

    this.create(updated)

    return this.get(id)
  }
}

class MockWorkspaceFlowsApi extends WorkspaceFlowsApi {
  private readonly data: DataStore<FlowResponse>

  public constructor(config: WorkspaceApiConfig, seeds: FlowResponse[] = []) {
    super(config)

    this.data = new DataStore(seeds)
  }

  public override async getFlow(flowId: string): Promise<Flow> {
    const data = this.data.get(flowId)

    return await mapper.map('FlowResponse', data, 'Flow')
  }

  public override async getFlows(filter: UnionFilters = {}): Promise<Flow[]> {
    const data = this.data.all()

    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await mapper.map('FlowResponse', data, 'Flow')
  }

  public override async getFlowsCount(filter: UnionFilters = {}): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowsApi has not implemented the filter argument of the getFlows method')
    }

    return await this.data.count()
  }

  public override async deleteFlow(flowId: string): Promise<void> {
    return await this.data.delete(flowId)
  }
}

type ApiMockSeeds = {
  flows?: FlowResponse[],
}

function createApiMock(seeds: ApiMockSeeds = {}): Pick<CreateApi, 'flows'> {
  const config: WorkspaceApiConfig = { baseUrl: '' }

  return {
    flows: createActions(new MockWorkspaceFlowsApi(config, seeds.flows)),
  }
}

export function useWorkspaceApiMock(seeds: ApiMockSeeds = {}): Pick<CreateApi, 'flows'> {
  const api = createApiMock(seeds)

  provide(workspaceApiKey, api)

  return api
}

useWorkspaceApiMock({
  flows: mocker.createMany('flowResponse', 10),
})