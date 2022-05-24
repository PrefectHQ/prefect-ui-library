import { UiFlowRunHistory } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomUiFlowRunHistory: MockFunction<UiFlowRunHistory> = function(history?: Partial<UiFlowRunHistory>) {
  return {
    id: history?.id ?? this.create('string'),
    stateType: history?.stateType ?? this.create('stateType'),
    duration: history?.duration ?? this.create('number', [1, 200]),
    lateness: history?.lateness ?? this.create('number', [1, 200]),
    timestamp: history?.timestamp ?? this.create('date'),
  }
}