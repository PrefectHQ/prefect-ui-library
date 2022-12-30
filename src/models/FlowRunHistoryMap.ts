import { RunHistory } from '@/models/RunHistory'
import { StateHistory } from '@/models/StateHistory'
import { mapper } from '@/services/Mapper'
import { DateString } from '@/types/dates'
import { dateFunctions } from '@/utilities/timezone'

export class FlowRunHistoryMap {
  private readonly map: Map<DateString, StateHistory[]>

  public constructor(runHistory: RunHistory[]) {
    this.map = new Map(runHistory.map(history => [this.getKey(history.intervalStart), history.states]))
  }

  public get(date: Date): StateHistory[] {
    const key = this.getKey(date)

    return this.map.get(key) ?? []
  }

  private getKey(date: Date): DateString {
    return mapper.map('Date', dateFunctions.startOfDay(date), 'string')
  }
}