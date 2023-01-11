
import { ISchedule } from '@/models'
import { RRuleScheduleResponse } from '@/models/api/ScheduleResponse'

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

  public getRRule(): string {
    return this.rrule
  }

  public toString(): string {
    return this.rrule
  }

  public toResponse(): RRuleScheduleResponse {
    return {
      'rrule': this.rrule,
      'timezone': this.timezone,
    }
  }
}