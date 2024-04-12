<template>
  <page-heading class="page-heading-work-pools" :crumbs="crumbs">
    <template #after-crumbs>
      <p-button v-if="can.create.work_pool && !hideCreateButton" small icon="PlusIcon" :to="routes.workPoolCreate()" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { PageHeading } from '@/components'
  import { useWorkspaceRoutes, useCan } from '@/compositions'

  const crumbs = [{ text: 'Work Pools' }]

  defineProps<{
    hideCreateButton?: boolean,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>

<style>
.page-heading-work-pools__total-counter { @apply
  text-subdued
}
</style>
