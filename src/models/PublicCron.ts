import { default as Cron } from 'cronstrue'
import { Options as CronstrueOptions } from 'cronstrue/dist/options'


// This class modifies the underlying Cron class to expose string utilities as public methods
export class PublicCron extends Cron {
  public getFullDescription(): string {
    try {
      return super.getFullDescription()
    } catch {
      return ''
    }
  }

  public getSecondsDescription(): string {
    try {
      return super.getSecondsDescription()
    } catch {
      return ''
    }
  }

  public getMinutesDescription(): string {
    try {
      return super.getMinutesDescription()
    } catch {
      return ''
    }
  }

  public getHoursDescription(): string {
    try {
      return super.getHoursDescription()
    } catch {
      return ''
    }
  }

  public getTimeOfDayDescription(): string {
    try {
      return super.getTimeOfDayDescription()
    } catch {
      return ''
    }
  }

  public getDayOfMonthDescription(): string | null {
    try {
      return super.getDayOfMonthDescription()
    } catch {
      return ''
    }
  }

  public getMonthDescription(): string {
    try {
      return super.getMonthDescription()
    } catch {
      return ''
    }
  }

  public getDayOfWeekDescription(): string {
    try {
      return super.getDayOfWeekDescription()
    } catch {
      return ''
    }
  }

  public getYearDescription(): string {
    try {
      return super.getYearDescription()
    } catch {
      return ''
    }
  }

  public transformVerbosity(description: string, useVerboseFormat: boolean): string {
    return super.transformVerbosity(description, useVerboseFormat)
  }

  public constructor(expression: string, options: CronstrueOptions) {
    super(expression, options)
    this.getFullDescription()
  }
}