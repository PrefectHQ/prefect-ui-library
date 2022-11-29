import { DataStoreDataNotFound } from './KeyedDataStore'
import { MockApi } from './MockApi'
import { ConcurrencyLimit } from '@/models/ConcurrencyLimit'
import { ConcurrencyLimitCreate } from '@/models/ConcurrencyLimitCreate'
import { ConcurrencyLimitsFilter } from '@/models/ConcurrencyLimitsFilter'
import { mocker } from '@/services'
import { IWorkspaceConcurrencyLimitsApi } from '@/services/WorkspaceConcurrencyLimitsApi'

export class MockWorkspaceConcurrencyLimitsApi extends MockApi implements IWorkspaceConcurrencyLimitsApi {

  public async getConcurrencyLimits(filter: ConcurrencyLimitsFilter = {}): Promise<ConcurrencyLimit[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceConcurrencyLimitsApi has not implemented the filter argument of the getConcurrencyLimits method')
    }

    return await this.concurrencyLimits.getAll()
  }

  public async getConcurrencyLimit(id: string): Promise<ConcurrencyLimit> {
    return await this.concurrencyLimits.get(id)
  }

  public async getConcurrencyLimitByTag(tag: string): Promise<ConcurrencyLimit> {
    const foundLimit = await this.concurrencyLimits.find(limit => limit.tag == tag)
    if (!foundLimit) {
      throw new DataStoreDataNotFound()
    }
    return foundLimit
  }

  public async createConcurrencyLimit(limit: ConcurrencyLimitCreate): Promise<ConcurrencyLimit> {
    const newLimit = mocker.create('concurrencyLimit', [limit])
    this.concurrencyLimits.create(newLimit)
    return await newLimit
  }

  public async deleteConcurrencyLimit(id: string): Promise<void> {
    return await this.concurrencyLimits.delete(id)
  }

  public async deleteConcurrencyLimitByTag(tag: string): Promise<void> {
    const foundTag = this.concurrencyLimits.find(limit => limit.tag == tag)
    if (!foundTag) {
      throw new DataStoreDataNotFound()
    }
    return await this.concurrencyLimits.delete(foundTag.id)
  }

}