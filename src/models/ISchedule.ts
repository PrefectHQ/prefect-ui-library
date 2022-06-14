import { IRRuleSchedule, ICronSchedule, IIntervalSchedule } from '@/models'

export type ISchedule = IRRuleSchedule | ICronSchedule | IIntervalSchedule
