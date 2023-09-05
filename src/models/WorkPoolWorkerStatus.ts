export const workPoolWorkerStatus = ['online', 'offline'] as const

export type WorkPoolWorkerStatus = typeof workPoolWorkerStatus[number]
export type ServerWorkPoolWorkerStatus = Uppercase<WorkPoolWorkerStatus>
