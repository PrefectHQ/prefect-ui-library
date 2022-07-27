<template>
  <router-link :to="blockRoute(blockDocumentId)" class="block-icon-text">
    <p-icon-text icon="CubeIcon">
      <span>{{ blockName }}</span>
    </p-icon-text>
  </router-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { blockRouteKey } from '@/router/routes'
  import { blockDocumentsApiKey } from '@/services/BlockDocumentsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    blockDocumentId: string,
  }>()

  const blockRoute = inject(blockRouteKey)

  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockSubscription = useSubscription(blockDocumentsApi.getBlockDocument, [props.blockDocumentId])
  const blockName = computed(() => blockSubscription.response?.name)
</script>