import { RRule } from 'rrule'
import { ISchedule } from '@/models'
import { capitalize, toPluralString } from '@/utilities'


export interface IRRuleSchedule extends ISchedule {
  timezone: string | null,
  rrule: string,
}


const expressionString = /Every ([\w]+) for ([\d]+) (time[s]?)/m
const expression = new RegExp(expressionString)

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
      return RRule.fromString(this.rrule.split(' ').join('\n'))
    } catch {
      return new RRule()
    }
  }

  public toString(): string {
    let str = capitalize(this.getRRule().toText())

    const match = expression.exec(str)

    if (match) {
      str = str.replace(match[3], toPluralString(match[1], parseInt(match[2])))
    }

    return str
  }
}