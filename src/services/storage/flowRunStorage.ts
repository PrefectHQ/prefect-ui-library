import { FlowRun } from '@/models/FlowRun'
import { Storage } from '@/services/storage/Storage'
import { useStorage } from '@/services/storage/useStorage'

export const flowRunStorage = new Storage<FlowRun>()

export const useFlowRunStorage = useStorage(flowRunStorage)
