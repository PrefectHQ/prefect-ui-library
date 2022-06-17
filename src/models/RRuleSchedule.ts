import { RRule } from 'rrule'
import { Schedule } from '@/models'
import { capitalize } from '@/utilities'


export interface IRRuleScheduleRaw {
  timezone: string | null,
  rrule: string,
}

export type IRRuleSchedule = IRRuleScheduleRaw & Schedule


export class RRuleSchedule implements IRRuleSchedule {
  public timezone: string | null
  public rrule: string

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

  public constructor(schedule: IRRuleScheduleRaw) {
    this.timezone = schedule.timezone
    this.rrule = schedule.rrule
  }
}