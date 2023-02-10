
import { MockApi } from './MockApi'
import { WorkerScheduledFlowRun, WorkerScheduledFlowRuns, WorkPool, WorkPoolCreate, WorkPoolEdit } from '@/models'
import { WorkPoolsFilter } from '@/models/Filters'
import { IWorkspaceWorkPoolsApi, mocker } from '@/services'

export class MockWorkspaceWorkPoolsApi extends MockApi implements IWorkspaceWorkPoolsApi {

  public async createWorkPool(request: WorkPoolCreate): Promise<WorkPool> {
    const workPool = mocker.create('workPool', [request])
    this.workPools.create(workPool)

    return await workPool
  }

  public async getWorkPoolByName(workPoolName: string): Promise<WorkPool> {
    return await this.workPools.find(workPool => workPool.name === workPoolName)!
  }

  public async getWorkPools(filter: WorkPoolsFilter = {}): Promise<WorkPool[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceWorkPoolsApi has not implemented the filter argument of the getWorkPools method')
    }

    return await this.workPools.getAll()
  }

  public async updateWorkPool(workPoolName: string, request: WorkPoolEdit): Promise<void> {
    return await this.workPools.patch(workPoolName, request)
  }

  public async pauseWorkPool(name: string): Promise<void> {
    return await this.workPools.patch(name, { isPaused: true })
  }

  public async resumeWorkPool(name: string): Promise<void> {
    return await this.workPools.patch(name, { isPaused: false })
  }

  public async deleteWorkPool(workPoolName: string): Promise<void> {
    return await this.workPools.delete(workPoolName)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  public async getWorkPoolScheduledRuns(workPoolName: string, request: WorkerScheduledFlowRuns): Promise<WorkerScheduledFlowRun[]> {
    const workPool = this.workPools.get(workPoolName)
    const flowRun = mocker.create('flowRun')

    const data = {
      workPoolId: workPool.id,
      workPoolQueueId: workPool.defaultQueueId,
      flowRun: flowRun,
    }

    return await [data]
  }

  public async getWorkPoolLateRuns(workPoolName: string, request: WorkerScheduledFlowRuns): Promise<WorkerScheduledFlowRun[]> {
    const data = await this.getWorkPoolScheduledRuns(workPoolName, request)
    return data.filter(run => run.flowRun.stateName === 'Late')
  }
}

