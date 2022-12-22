<template>
  <ComponentPage title="OTable" :demos="demos">
    <OTable :data="data" :columns="columns" />

    <template #empty>
      <OTable :data="[]" :columns="[]" />
    </template>

    <template #no-select>
      <OTable :data="data" :columns="columns" hide-select-column disable-select />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { OTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'
  import { mocker } from '@/services'

  const demos: DemoSection[] = [
    { title: 'Empty' },
    { title: 'No Select' },
  ]

  const columns = [
    {
      label: 'Name',
      property: 'name',
    },
    {
      label: 'Email',
      property: 'email',
    },
  ]

  const data = Array.from({ length: 10 }, () => {
    return {
      id: mocker.create('id'),
      name: mocker.create('noun'),
      email: mocker.create('email'),
    }
  })
</script>