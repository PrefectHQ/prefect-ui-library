import { FlowRunsSurveyResult } from '@/models/FlowRunsSurveyResult'
import { MockFunction } from '@/services/Mocker'

export const randomFlowRunsSurveyResult: MockFunction<FlowRunsSurveyResult, [Partial<FlowRunsSurveyResult>?]> = function(overrides = {}) {
  return {
    date: this.create('date'),
    completedCount: this.create('number', [0, 2]),
    failedCount: this.create('number', [0, 2]),
    ...overrides,
  }
}