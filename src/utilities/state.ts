import { StateType } from '@/models'

export function mapStateNameToStateType(stateName: string): { name: string, type: StateType | null } {
  switch (stateName.toLowerCase()) {
    case 'completed': return { name: 'Completed', type: 'completed' }
    case 'failed': return { name: 'Failed ', type: 'failed' }
    case 'running': return { name: 'Running', type: 'running' }
    case 'scheduled': return { name: 'Scheduled ', type: 'scheduled' }
    case 'pending': return { name: 'Pending', type: 'pending' }
    case 'cancelled': return { name: 'Cancelled ', type: 'cancelled' }
    case 'crashed': return { name: 'Crashed ', type: 'crashed' }
    default: return { name: stateName, type: null }
  }
}