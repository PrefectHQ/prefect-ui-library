import { FlowRun } from '@/models/FlowRun'
import { Storage } from '@/services/storage/Storage'

export * from './Storage'
export * from './StorageItem'

export const flowRunStorage = new Storage<FlowRun>()