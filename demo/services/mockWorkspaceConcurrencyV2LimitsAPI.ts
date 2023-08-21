import { MockApi } from './MockApi'
import { ConcurrencyV2ActiveSlots } from '@/models/ConcurrencyV2ActiveSlots'
import { ConcurrencyV2Create } from '@/models/ConcurrencyV2Create'
import { ConcurrencyV2Limit } from '@/models/ConcurrencyV2Limit'
import { ConcurrencyLimitsFilter } from '@/models/Filters'
import { mocker } from '@/services'
import { IWorkspaceConcurrencyV2LimitsApi } from '@/services/WorkspaceConcurrencyLimitsV2API'

export class MockWorkspaceConcurrencyV2LimitsApi extends MockApi implements IWorkspaceConcurrencyV2LimitsApi {

  public async getConcurrencyV2Limits(filter: ConcurrencyLimitsFilter = {}): Promise<ConcurrencyV2Limit[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceConcurrencyLimitsApi has not implemented the filter argument of the getConcurrencyLimits method')
    }

    return await this.concurrencyLimitsV2.getAll()
  }

  public async getConcurrencyV2Limit(id: string): Promise<ConcurrencyV2Limit> {
    return await this.concurrencyLimitsV2.get(id)
  }


  public async createConcurrencyV2Limit(limit: ConcurrencyV2Create): Promise<ConcurrencyV2Limit> {
    const newLimit = mocker.create('concurrencyV2Limit', [limit])
    this.concurrencyLimitsV2.create(newLimit)
    return await newLimit
  }

  public async updateConcurrencyV2Limit(limit: ConcurrencyV2Create): Promise<ConcurrencyV2Limit> {
    const newLimit = mocker.create('concurrencyV2Limit', [limit])
    this.concurrencyLimitsV2.create(newLimit)
    return await newLimit
  }

  public async deleteConcurrencyV2Limit(id: string): Promise<void> {
    return await this.concurrencyLimits.delete(id)
  }

  public async bulkIncrementActiveSlots(names: string[], slots: number, mode: string): Promise<ConcurrencyV2ActiveSlots> {
    return await this.concurrencyV2ActiveSlots.find(slot => names.includes(slot.name)) ?? { id: '', name: '', limit: 0 }
  }

  public async bulkDecrementActiveSlots(names: string[], slots: number, mode: string): Promise<ConcurrencyV2ActiveSlots> {
    return await this.concurrencyV2ActiveSlots.find(slot => slot.name === names[0]) ?? { id: '', name: '', limit: 0 }
  }


}