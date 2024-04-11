<template>
  <page-heading class="page-heading-work-pools" :crumbs="crumbs">
    <template #after-crumbs>
      <p-button v-if="can.create.work_pool && displayCreateButton" small icon="PlusIcon" :to="routes.workPoolCreate()" />
    </template>
    <template v-if="workPoolsLimit && currentWorkPools" #actions>
      <span class="page-heading-work-pools__total-counter">
        {{ currentWorkPools }} / {{ workPoolsLimit }} Work Pools
      </span>
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { PageHeading } from '@/components'
  import { useWorkspaceRoutes, useCan } from '@/compositions'

  const crumbs = [{ text: 'Work Pools' }]

  const props = defineProps<{
    workPoolsLimit: number | null,
    currentWorkPools: number | null,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()

  const displayCreateButton = computed(() => {
    if (!props.workPoolsLimit || !props.currentWorkPools) {
      return true
    }
    return props.currentWorkPools < props.workPoolsLimit
  })
</script>

<style>
.page-heading-work-pools__total-counter { @apply
  text-subdued
}
</style>
