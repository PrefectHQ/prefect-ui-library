<template>
  <span v-if="flowRuns.length" class="indicator"> {{ flowRuns.length }} late runs</span>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useFlowRunFilterFromParam } from '@/compositions'
  import { workQueuesApiKey, flowRunsApiKey } from '@/services'
  import { inject } from '@/utilities/inject'


  const workQueuesApi = inject(workQueuesApiKey)
  const flowRunsApi = inject(flowRunsApiKey)


  const props = defineProps<{
    workQueueId: string,
  }>()


  const workQueueName = async () => await workQueuesApi.getWorkQueue(props.workQueueId)

  const WQfilter = async ()=> {
    const { name } = await workQueueName()
    const states = ref(['Late'])
    const fill = useFlowRunFilterFromParam({ workQueues: [name], states   })

    return fill.filter.value
  }
  const subscriptionOptions = {
    interval: 300000,
  }

  const flowRunsSubscription = useSubscription(flowRunsApi.getFlowRuns, [await WQfilter()], subscriptionOptions)
  const flowRuns = computed(()=> flowRunsSubscription.response ?? [])
</script>

<style>
  .indicator {
    @apply
    text-amber-600
  }
</style>