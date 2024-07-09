import { TaskWorker, TaskWorkerResponse } from '@/models'
import { TaskWorkerFilterRequest } from '@/models/api/Filters'
import { TaskWorkerFilter } from '@/models/Filters'
import { MapFunction } from '@/services/Mapper'

export const mapTaskWorkerFilterToTaskWorkerFilterRequest: MapFunction<TaskWorkerFilter, TaskWorkerFilterRequest> = function(source) {
  return {
    task_keys: source.taskKeys,
  }
}

export const mapTaskWorkerResponseToTaskWorker: MapFunction<TaskWorkerResponse, TaskWorker> = function(source) {
  return {
    id: source.identifier,
    taskKeys: source.task_keys,
    lastSeen: this.map('string', source.timestamp, 'Date'),
  }
}