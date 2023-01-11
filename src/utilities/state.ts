import { StateType } from '@/models'
import { capitalize } from '@/utilities/strings'

export function mapStateNameToStateType(stateName: string = 'Unknown'): { name: string, type: StateType | null } {
  switch (stateName.toLowerCase()) {
    case 'completed': return { name: 'Completed', type: 'completed' }
    case 'failed': return { name: 'Failed', type: 'failed' }
    case 'timedout': return { name: 'TimedOut', type: 'failed' }
    case 'running': return { name: 'Running', type: 'running' }
    case 'scheduled': return { name: 'Scheduled', type: 'scheduled' }
    case 'pending': return { name: 'Pending', type: 'pending' }
    case 'cancelled': return { name: 'Cancelled', type: 'cancelled' }
    case 'crashed': return { name: 'Crashed', type: 'crashed' }
    case 'late': return { name: 'Late', type: 'scheduled' }
    case 'cancelling': return { name: 'Cancelling', type: 'cancelled' }
    case 'resuming': return { name: 'Resuming', type: 'scheduled' }
    case 'paused': return { name: 'Paused', type: 'paused' }
    default: return { name: stateName, type: null }
  }
}

export function mapStateTypeOrNameToStateName(stateTypeOrName: string): string {
  switch (stateTypeOrName) {
    case 'completed':
    case 'running':
    case 'scheduled':
    case 'pending':
    case 'failed':
    case 'cancelled':
    case 'crashed':
    case 'paused':
      return capitalize(stateTypeOrName)
    default:
      return stateTypeOrName
  }
}