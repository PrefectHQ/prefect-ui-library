import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { mocker } from '@/services'

export class BlockCapabilitiesApi extends MockedApi {

  public getBlockCapabilities(): Promise<string[]> {
    return this.promise(mocker.createMany('blockSchemaCapability', mocker.create('number', [1, 2])))
  }

}

export const blockCapabilitiesApi = createActions(new BlockCapabilitiesApi())