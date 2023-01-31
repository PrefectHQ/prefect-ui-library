import { DivergingBarChartData, DivergingBarChartItem } from '@prefecthq/vue-charts'
import { RunHistory } from '@/models/RunHistory'
import { MapFunction } from '@/services/Mapper'

export const mapRunHistoryToDivergingBarChartItem: MapFunction<RunHistory, DivergingBarChartItem> = function(source) {
  return {
    intervalStart: source.intervalStart,
    intervalEnd: source.intervalEnd,
    data: source.states.reduce<DivergingBarChartData>((data, state) => {
      data[state.stateType] = state.countRuns
      return data
    }, {}),
  }
}