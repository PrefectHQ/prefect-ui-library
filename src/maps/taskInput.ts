import { isConstantTaskInputResponse, isParameterTaskInputResponse, isTaskRunTaskInputResponse, TaskInputResponse } from '@/models/api/TaskInputResponse'
import { ConstantTaskInput, ParameterTaskInput, TaskInput, TaskRunTaskInput } from '@/models/TaskInput'
import { MapFunction } from '@/services/Mapper'

export const mapTaskInputResponseToTaskInput: MapFunction<TaskInputResponse, TaskInput> = function(source) {
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

export const mapTaskInputToTaskInputResponse: MapFunction<TaskInput, TaskInputResponse> = function(source) {
  return {
    input_type: source.inputType,
    // eslint-disable-next-line no-extra-parens
    type: (source as ConstantTaskInput).type,
    // eslint-disable-next-line no-extra-parens
    name: (source as ParameterTaskInput).name,
    // eslint-disable-next-line no-extra-parens
    id: (source as TaskRunTaskInput).id,
  }
}