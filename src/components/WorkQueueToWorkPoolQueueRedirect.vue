<script setup lang="ts">
  /**
   * This component is used to redirect the user from an old, deprecated work queue route
   * to a work pool queue route. This is necessary because the old work queue routes are
   * were keyed on work queue id and the new routes are nested under work pools by
   * work pool name and work queue name.
   */
  import { useRouteParam, useSubscription } from '@prefecthq/vue-compositions'

  import { useRouter } from 'vue-router'
  import { useWorkspaceRoutes, useWorkspaceApi } from '@/compositions'

  const workQueueId = useRouteParam('workQueueId')

  const api = useWorkspaceApi()
  const workQueueSubscription = useSubscription(api.workQueues.getWorkQueue, [workQueueId])

  const router = useRouter()
  const routes = useWorkspaceRoutes()

  workQueueSubscription.promise().then(({ response: workQueue }) => {
    if (!workQueue.workPoolName) {
      router.replace(routes.workPools())
      return
    }
    router.replace(routes.workPoolQueue(workQueue.workPoolName, workQueue.name))
  })
</script>