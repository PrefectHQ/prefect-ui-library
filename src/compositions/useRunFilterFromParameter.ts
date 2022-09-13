import { addDays, endOfToday, startOfToday, subDays } from 'date-fns'
import { ref, Ref } from 'vue'
import { useFlowRunFilter } from '@/compositions/useFlowRunFilter'
import { UnionFilters } from '@/types/UnionFilters'

type UseFlowRunFilterFromParam = {

  states?: Ref<string[]>,
  deployments?: Ref<string[]>,
  workQueues?: Ref<string[]>,
  flows?: Ref<string[]>,
  filter: Ref<UnionFilters>,
}

export function useFlowRunFilterFromParameter(
  filterInputs: { states?: Ref<string[]>,
    deployments?: Ref<string[]>,
    workQueues?: Ref<string[]>,
    flows?: Ref<string[]>, }): UseFlowRunFilterFromParam {
  const sort = ref<'NAME_DESC' | 'NAME_ASC' | 'EXPECTED_START_TIME_DESC' | 'EXPECTED_START_TIME_ASC' | 'NEXT_SCHEDULED_START_TIME_ASC'>('EXPECTED_START_TIME_DESC')

  const startDate = ref<Date>(subDays(startOfToday(), 7))
  const endDate = ref<Date>(addDays(endOfToday(), 1))
  const states = filterInputs.states ? ref(filterInputs.states) : undefined
  const deployments = filterInputs.deployments ? ref(filterInputs.deployments) : undefined
  const flows = filterInputs.flows ? ref(filterInputs.flows) : undefined
  const workQueues = filterInputs.workQueues ? ref(filterInputs.workQueues) : undefined
  const filter = useFlowRunFilter({ states, deployments, workQueues, flows, startDate, endDate, sort })

  return {
    states,
    deployments,
    flows,
    workQueues,
    filter,
  }
}