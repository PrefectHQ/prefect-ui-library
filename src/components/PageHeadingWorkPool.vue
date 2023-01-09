<template>
  <page-heading class="page-heading-work-pool" :crumbs="crumbs">
    <template #actions>
      <WorkPoolToggle :work-pool="workPool" @update="emit('update')" />
      <WorkPoolMenu :work-pool="workPool" :show-all="!media.sm" @delete="handleDelete" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { PageHeading, WorkPoolToggle, WorkPoolMenu } from '@/components'
  import { useWorkspaceRoutes } from '@/compositions'
  import { WorkPool } from '@/models'

  const props = defineProps<{
    workPool: WorkPool,
  }>()

  const routes = useWorkspaceRoutes()
  const router = useRouter()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const crumbs = computed(() => [
    { text: 'Work Pools', to: routes.workPools() },
    { text: props.workPool.name },
  ])

  const handleDelete = (): void => {
    router.back()
  }
</script>