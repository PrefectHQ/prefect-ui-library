export type TaskInputResponse = ConstantTaskInputResponse | ParameterTaskInputResponse | TaskRunTaskInputResponse

export type ConstantTaskInputResponse = {
  input_type: 'constant',
  type: string,
}

export type ParameterTaskInputResponse = {
  input_type: 'parameter',
  name: string,
}

export type TaskRunTaskInputResponse = {
  input_type: 'task_run',
  id: string,
}

export function isConstantTaskInputResponse(taskInputResponse: TaskInputResponse): taskInputResponse is ConstantTaskInputResponse {
  return taskInputResponse.input_type === 'constant'
}

export function isParameterTaskInputResponse(taskInputResponse: TaskInputResponse): taskInputResponse is ParameterTaskInputResponse {
  return taskInputResponse.input_type === 'parameter'
}

export function isTaskRunTaskInputResponse(taskInputResponse: TaskInputResponse): taskInputResponse is TaskRunTaskInputResponse {
  return taskInputResponse.input_type === 'task_run'
}