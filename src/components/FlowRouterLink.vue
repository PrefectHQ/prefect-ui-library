<template>
  <span v-if="flowId" class="flow-router-link">
    <slot name="before">
      <span v-if="before">
        {{ before }}
      </span>
    </slot>
    <p-link class="flow-router-link__anchor" :to="routes.flow(flowId)">
      {{ flowName }}
    </p-link>
    <slot name="after">
      <span v-if="after">
        {{ after }}
      </span>
    </slot>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useFlow, useCan, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    flowId: string,
    before?: string,
    after?: string,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
  const route = useRoute()
  const router = useRouter()
  const flowRouteResolved = computed(() => router.resolve(routes.flow(props.flowId)))
  const matched = computed(() => route.matched.some(({ path }) => flowRouteResolved.value.path == path))
  const showLink = computed(() => can.read.flow && !matched.value)

  const flowId = computed(() => {
    if (!showLink.value) {
      return null
    }

    return props.flowId
  })

  const { flow } = useFlow(flowId)
  const flowName = computed(() => flow.value?.name ?? '')
</script>

<style>
  .flow-router-link { @apply
    inline-flex
    items-center
  }
</style>