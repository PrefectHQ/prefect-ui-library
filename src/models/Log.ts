export const logLevel = [0, 10, 20, 30, 40, 50] as const

export type LogLevel = typeof logLevel[number]

export interface ILog {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  level: LogLevel,
  message: string,
  timestamp: Date,
  flowRunId: string,
  taskRunId: string | null,
}

export class Log implements ILog {
  public readonly id: string
  public readonly created: Date
  public readonly updated: Date
  public name: string
  public level: LogLevel
  public message: string
  public timestamp: Date
  public flowRunId: string
  public taskRunId: string | null

  public constructor(log: ILog) {
    this.id = log.id
    this.created = log.created
    this.updated = log.updated
    this.name = log.name
    this.level = log.level
    this.message = log.message
    this.timestamp = log.timestamp
    this.flowRunId = log.flowRunId
    this.taskRunId = log.taskRunId
  }
}
