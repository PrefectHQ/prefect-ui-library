<template>
  <DemoSection heading="Queue Form">
    <WorkQueueForm v-model:work-queue="queueData" @submit="submit" />
  </DemoSection>
</template>

<script lang="ts" setup>
  import { createActions } from '@prefecthq/vue-compositions'
  import { provide, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import { DeploymentsApi } from '../services'
  import WorkQueueForm from '@/components/WorkQueueForm.vue'
  import { Deployment } from '@/models/Deployment'
  import { WorkQueue } from '@/models/WorkQueue'
  import { deploymentsApiKey, mocker } from '@/services'
  import { UnionFilters } from '@/types/UnionFilters'

  const deployments = mocker.createMany('deployment', 10)
  const filter = mocker.create('workQueueFilter', [
    {
      deploymentIds: deployments.map(({ id }) => id).slice(0, 5),
    },
  ])

  const queueData = ref(mocker.create('workQueue', [
    {
      filter,
    },
  ]))

  class WorkQueueFormDeploymentsApi extends DeploymentsApi {

    public getDeployments(filter: UnionFilters): Promise<Deployment[]> {
      return this.promise(deployments)
    }

  }

  const queueFormDeploymentsApi = createActions(new WorkQueueFormDeploymentsApi)

  provide(deploymentsApiKey, queueFormDeploymentsApi)


  const submit = (workQueue: Partial<WorkQueue>): void => {
    console.log('Form submitted!', workQueue)
  }
</script>