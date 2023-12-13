import { DateRangeSelectRangeValue, DateRangeSelectSpanValue, DateRangeSelectValue } from '@prefecthq/prefect-design'
import { addSeconds, differenceInSeconds } from 'date-fns'
import { FlowRunsFilter, TaskRunsFilter, TaskRunsHistoryFilter, WorkPoolWorkersFilter } from '@/models/Filters'
import { MapFunction } from '@/services/Mapper'
import { WorkspaceDashboardFilter } from '@/types/dashboard'
import { sortDates } from '@/utilities/dates'

function nowWithoutMilliseconds(): Date {
  const now = new Date()

  now.setMilliseconds(0)

  return now
}

type DateRange = {
  startDate: Date,
  endDate: Date,
  timeSpanInSeconds: number,
}

function mapDateRangeSelectRangeValue({ startDate, endDate }: DateRangeSelectRangeValue): DateRange {
  const timeSpanInSeconds = differenceInSeconds(endDate, startDate)

  return { startDate, endDate, timeSpanInSeconds }
}

function mapDateRangeSelectSpanValue({ seconds }: DateRangeSelectSpanValue): DateRange {
  const now = nowWithoutMilliseconds()
  const then = addSeconds(now, seconds)
  const [startDate, endDate] = [now, then].sort(sortDates)

  return { startDate, endDate, timeSpanInSeconds: seconds }
}

function mapDateRangeSelectValue(value: NonNullable<DateRangeSelectValue>): DateRange {
  switch (value.type) {
    case 'range':
      return mapDateRangeSelectRangeValue(value)
    case 'span':
      return mapDateRangeSelectSpanValue(value)
    default:
      const exhaustive: never = value
      throw new Error(`No handler for DateRangeSelectValue.type: ${exhaustive}`)
  }
}

export const mapWorkspaceDashboardFilterToTaskRunsFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsFilter> = function(source) {
  const { startDate, endDate } = mapDateRangeSelectValue(source.range)

  return {
    flowRuns: {
      tags: {
        name: source.tags,
      },
    },
    taskRuns: {
      startTimeAfter: startDate,
      startTimeBefore: endDate,
    },
  }
}

export const mapWorkspaceDashboardFilterToTaskRunsHistoryFilter: MapFunction<WorkspaceDashboardFilter, TaskRunsHistoryFilter> = function(source) {
  const { startDate, endDate, timeSpanInSeconds } = mapDateRangeSelectValue(source.range)

  return {
    historyStart: startDate,
    historyEnd: endDate,
    historyIntervalSeconds: timeSpanInSeconds / 20,
    flowRuns: {
      tags: {
        name: source.tags,
      },
    },
  }
}

export const mapWorkspaceDashboardFilterToFlowRunsFilter: MapFunction<WorkspaceDashboardFilter, FlowRunsFilter> = function(source) {
  const { startDate, endDate } = mapDateRangeSelectValue(source.range)

  const filter: FlowRunsFilter = {
    flowRuns: {
      expectedStartTimeAfter: startDate,
      expectedStartTimeBefore: endDate,
      tags: {
        name: source.tags,
      },
    },
  }

  return filter
}

export const mapWorkspaceDashboardFilterToWorkPoolWorkersFilter: MapFunction<WorkspaceDashboardFilter, WorkPoolWorkersFilter> = function(source) {
  const { startDate, endDate } = mapDateRangeSelectValue(source.range)

  return {
    workers: {
      lastHeartbeatTimeAfter: startDate,
      lastHeartbeatTimeBefore: endDate,
    },
  }
}