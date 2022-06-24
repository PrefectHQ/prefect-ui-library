import { Log, LogLevel, logLevel } from '@/models/Log'
import { MockFunction } from '@/services/Mocker'
import { random, uniform } from '@/utilities/math'

export const randomLogLevel: MockFunction<LogLevel, []> = function() {
  return logLevel[uniform(0, logLevel.length - 1)]
}

export const randomLog: MockFunction<Log, [Partial<Log>?]> = function(overrides = {}) {
  return new Log({
    id: this.create('string'),
    created: this.create('date'),
    updated: this.create('date'),
    name: this.create('string'),
    level: this.create('logLevel'),
    message: random() > 0.75 ? this.create('paragraph') : this.create('sentence'),
    timestamp: this.create('date'),
    flowRunId: this.create('string'),
    taskRunId: this.create('string'),
    ...overrides,
  })
}