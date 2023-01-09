<template>
  <ComponentPage title="Work Pools Stuff" :demos="demos">
    <template #pools>
      {{ workPool }}
    </template>
    <template #queues>
      {{ workPoolQueue }}
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkPoolMock } from '@/demo/compositions/useWorkPoolMock'
  import { useWorkPoolQueuesMock } from '@/demo/compositions/useWorkPoolQueueMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Pools' },
    { title: 'Queues' },
  ]

  const workPool = useWorkPoolMock()
  const workPoolQueue = useWorkPoolQueuesMock(3)
</script>