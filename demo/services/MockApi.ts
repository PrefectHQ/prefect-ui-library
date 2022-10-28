/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DataStores } from '../utilities/api'

export class MockApi {
  protected data: DataStores

  public constructor(data: DataStores) {
    this.data = data
  }

  protected get flows() {
    return this.data.flows
  }

  protected get flowRuns() {
    return this.data.flowRuns
  }

  protected get taskRuns() {
    return this.data.taskRuns
  }

  protected get blockDocuments() {
    return this.data.blockDocuments
  }

  protected get blockSchemas() {
    return this.data.blockSchemas
  }

  protected get deployments() {
    return this.data.deployments
  }

  protected get workQueues() {
    return this.data.workQueues
  }
}