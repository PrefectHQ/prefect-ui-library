import { RRule } from 'rrule'
import { ISchedule } from '@/models'
import { capitalize } from '@/utilities'


export interface IRRuleSchedule extends ISchedule {
  timezone: string | null,
  rrule: string,
}


export class RRuleSchedule implements IRRuleSchedule {
  public timezone: string | null
  public rrule: string

  public constructor(schedule: Pick<IRRuleSchedule, 'rrule' | 'timezone'>) {
    this.timezone = schedule.timezone
    this.rrule = schedule.rrule
  }

  public get raw(): string {
    return this.rrule
  }

  public getRRule(): RRule {
    if (!this.rrule) {
      return new RRule()
    }

    try {
      return RRule.fromString(this.rrule)
    } catch {
      return new RRule()
    }
  }

  public toString(): string {
    return capitalize(this.getRRule().toText())
  }
}