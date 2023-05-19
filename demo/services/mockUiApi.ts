import { UiFlowRunHistory } from '@/models/UiFlowRunHistory'
import { IUiApi } from '@/services/UiApi'

export class MockUiApi implements IUiApi {

  public getFlowRunHistory(): Promise<UiFlowRunHistory[]> {
    throw new Error('Not Implemented')
  }

}