<template>
  <template v-if="can.read.work_pool">
    <p-link :to="routes.workPool(workPoolName)" class="work-pool-icon-text">
      <p-icon-text icon="CircleStackIcon">
        <span>{{ workPoolName }}</span>
      </p-icon-text>
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'
  import { useCan, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    workPoolName: string,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
  const { workPoolName } = toRefs(props)
</script>