<template>
  <PageHeading :crumbs="crumbs" />
</template>

<script lang="ts" setup>
  import PageHeading from './PageHeading.vue'
  import { workQueuesRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const workQueuesRoute = inject(workQueuesRouteKey)

  const crumbs = [{ text: 'Work Queues', to: workQueuesRoute() }, { text: 'Create' }]
</script>