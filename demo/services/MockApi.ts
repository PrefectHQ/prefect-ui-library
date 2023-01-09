/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { data } from '@/demo/utilities/data'

export class MockApi {

  protected get flows() {
    return data.flows
  }

  protected get flowRuns() {
    return data.flowRuns
  }

  protected get flowRunGraphs() {
    return data.flowRunGraphs
  }

  protected get taskRuns() {
    return data.taskRuns
  }

  protected get blockDocuments() {
    return data.blockDocuments
  }

  protected get blockSchemas() {
    return data.blockSchemas
  }

  protected get blockTypes() {
    return data.blockTypes
  }

  protected get blockSchemaCapabilities() {
    return data.blockSchemaCapabilities
  }

  protected get concurrencyLimits() {
    return data.concurrencyLimits
  }

  protected get deployments() {
    return data.deployments
  }

  protected get workQueues() {
    return data.workQueues
  }

  protected get workPools() {
    return data.workPools
  }

  protected get workPoolQueues() {
    return data.workPoolQueues
  }

  protected get workPoolWorkers() {
    return data.workPoolWorkers
  }
}