<template>
  <page-heading class="page-heading-concurrency-limit" :crumbs="crumbs">
    <template #actions>
      <ConcurrencyLimitMenu :concurrency-limit="concurrencyLimit" @delete="handleDelete" />
    </template>
  </page-heading>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import ConcurrencyLimitMenu from '@/components/ConcurrencyLimitMenu.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { ConcurrencyLimit } from '@/models'

  const props = defineProps<{
    concurrencyLimit: ConcurrencyLimit,
  }>()

  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const crumbs = computed(() => [
    { text: 'Concurrency Limits', to: routes.concurrencyLimits() },
    { text: props.concurrencyLimit.tag },
  ])

  const handleDelete = (): void => {
    router.back()
  }
</script>

<style>
.page-heading-deployment__run-menu { @apply
  hidden
  sm:block
}

.page-heading-deployment__run-menu-item { @apply
  block
  sm:hidden
}
</style>