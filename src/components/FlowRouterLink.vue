<template>
  <span v-if="showLink" class="flow-router-link">
    <span v-if="before">{{ before }}</span>
    <router-link class="flow-router-link__anchor" :to="flowRoute(flowId)">
      {{ flowName }}
    </router-link>
    <span v-if="after">{{ after }}</span>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { RouterLink, useRoute, useRouter } from 'vue-router'
  import { useFlow } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { flowRouteKey } from '@/router/routes'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowId: string,
    before?: string,
    after?: string,
  }>()

  const can = useCan()
  const flowRoute = inject(flowRouteKey)
  const route = useRoute()
  const router = useRouter()
  const flowRouteResolved = computed(() => router.resolve(flowRoute(props.flowId)))
  const matched = computed(() => route.matched.some(({ path }) => flowRouteResolved.value.path == path))
  const showLink = computed(() => can.read.flow && !matched.value)

  const flowId = computed(() => {
    if (!showLink.value) {
      return null
    }

    return props.flowId
  })

  const flow = useFlow(flowId)
  const flowName = computed(() => flow.value?.name ?? '')
</script>

<style>
.flow-router-link__anchor { @apply
  text-prefect-500
}
</style>
