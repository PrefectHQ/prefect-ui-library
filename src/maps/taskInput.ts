import { ConstantTaskInput, ParameterTaskInput, TaskInput, TaskRunTaskInput } from '@/models/TaskInput'
import { isConstantTaskInputResponse, isParameterTaskInputResponse, isTaskRunTaskInputResponse, TaskInputResponse } from '@/models/TaskInputResponse'
import { MapFunction } from '@/services/Mapper'

export const mapTaskInputResponseToTaskInput: MapFunction<TaskInputResponse, TaskInput> = function(source: TaskInputResponse): TaskInput {
  if (isConstantTaskInputResponse(source)) {
    return new ConstantTaskInput({
      inputType: source.input_type,
      type: source.type,
    })
  }

  if (isParameterTaskInputResponse(source)) {
    return new ParameterTaskInput({
      inputType: source.input_type,
      name: source.name,
    })
  }

  if (isTaskRunTaskInputResponse(source)) {
    return new TaskRunTaskInput({
      inputType: source.input_type,
      id: source.id,
    })
  }

  throw 'Invalid TaskInputResponse'
}

export const mapTaskInputToTaskInputResponse: MapFunction<TaskInput, TaskInputResponse> = function(source: TaskInput): TaskInputResponse {
  return {
    'input_type': source.inputType,
    'type': (source as ConstantTaskInput).type,
    'name': (source as ParameterTaskInput).name,
    'id': (source as TaskRunTaskInput).id,
  }
}