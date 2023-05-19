import { Log } from '@/models/Log'
import { IWorkspaceLogsApi } from '@/services/WorkspaceLogsApi'

export class MockWorkspaceLogsApi implements IWorkspaceLogsApi {
  public getLogs(): Promise<Log[]> {
    throw new Error('Not Implemented')
  }
}