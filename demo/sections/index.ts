import { Section } from '@/demo/router/routeRecords'
import { artifacts } from '@/demo/sections/artifacts'
import { blocks } from '@/demo/sections/blocks'
import { concurrency } from '@/demo/sections/concurrency'
import { dashboard } from '@/demo/sections/dashboard'
import { deployments } from '@/demo/sections/deployments'
import { flowRuns } from '@/demo/sections/flowRuns'
import { flows } from '@/demo/sections/flows'
import { general } from '@/demo/sections/general'
import { logs } from '@/demo/sections/logs'
import { notifications } from '@/demo/sections/notifications'
import { schemas } from '@/demo/sections/schemas'
import { states } from '@/demo/sections/states'
import { workers } from '@/demo/sections/workers'

export const sections: Section = {
  artifacts,
  blocks,
  concurrency,
  dashboard,
  deployments,
  flowRuns,
  flows,
  general,
  logs,
  notifications,
  schemas,
  states,
  workers,
}