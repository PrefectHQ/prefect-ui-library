<template>
  <ComponentPage title="OTable" :demos="demos">
    <OTable v-model:search="search" :data="filteredData" :columns="columns" />

    <template #empty>
      <OTable v-model:search="search" :data="[]" :columns="[]" />
    </template>

    <template #no-select>
      <OTable v-model:search="search" :data="filteredData" :columns="columns" hide-select-column disable-select />
    </template>

    <template #custom-column>
      <OTable v-model:search="search" :data="filteredData" :columns="columns">
        <template #status="{ row }">
          <p-tag :class="getClassForStatus(row.status)">
            {{ row.status }}
          </p-tag>
        </template>
      </OTable>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { OTable } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'
  import { mocker } from '@/services'
  import { choice } from '@/utilities'

  const demos: DemoSection[] = [
    { title: 'Empty' },
    { title: 'No select' },
    { title: 'Custom column' },
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
    {
      label: 'Status',
      property: 'status',
    },
  ]

  const search = ref<string>('')

  const statuses = ['active', 'inactive', 'offline'] as const

  const data = Array.from({ length: 10 }, () => {
    const name = mocker.create('noun')
    return {
      id: mocker.create('id'),
      name: name,
      email: `${name}@email.com`,
      status: choice(statuses),
    }
  })

  const filteredData = computed(() => {
    return data.filter((row) => {
      const values = Object.values(row).join(' ').toLowerCase()
      return values.includes(search.value.toLowerCase())
    })
  })

  const getClassForStatus = (status: typeof statuses[number]): Record<string, boolean> => {
    let backgroundClass = 'bg-stone-200'
    let foregroundClass = 'text-stone-800'

    switch (status) {
      case 'active':
        backgroundClass = 'bg-emerald-200'
        foregroundClass = 'text-emerald-800'
        break
      case 'inactive':
        backgroundClass = 'bg-amber-200'
        foregroundClass = 'text-amber-800'
        break
      case 'offline':
        backgroundClass = 'bg-slate-200'
        foregroundClass = 'text-slate-800'
        break

      default:
        break
    }

    return {
      [backgroundClass]: true,
      [foregroundClass]: true,
    }
  }
</script>