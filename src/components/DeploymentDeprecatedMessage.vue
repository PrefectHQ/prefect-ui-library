<template>
  <p-empty-state>
    <template #icon>
      <p-icon icon="ExclamationCircleIcon" />
    </template>

    <template #heading>
      This deployment is deprecated
    </template>

    <template #description>
      With the General Availability release of Prefect 2.0, we modified the approach to creating deployments.
    </template>

    <template #actions>
      <DocumentationButton topic="deployments" />
      <a :href="href" target="_blank">
        <p-button>
          Find out more
        </p-button>
      </a>
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from './DocumentationButton.vue'
  const href= 'https://discourse.prefect.io/t/deployments-are-now-simplified-and-follow-a-declarative-syntax/1255'
</script>