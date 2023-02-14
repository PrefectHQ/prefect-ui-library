<template>
  <ComponentPage title="Deployment Form">
    <DeploymentForm :deployment="deployment" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import DeploymentForm from '@/components/DeploymentForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { mocker } from '@/services'

  const deployment = mocker.create('deployment', [
    {
      'parameters': {
        'rat': 43,
        'horse': 54,
        'sheep': 63,
      },
      'parameterOpenApiSchema': {
        'title': 'Open API Schema',
        'type': 'object',
        'properties': {
          'rat': {
            'title': 'rat',
            'type': 'integer',
          },
          'horse': {
            'title': 'horse',
            'type': 'integer',
          },
          'sheep': {
            'title': 'sheep',
            'type': 'integer',
          },
          'kiwi': {
            'title': 'kiwi',
            'type': 'array',
            'default': [],
          },
        },
      },
      'rawSchema': {
        'title': 'Open API Schema',
        'type': 'object',
        'properties': {
          'rat': {
            'title': 'rat',
            'type': 'integer',
          },
          'horse': {
            'title': 'horse',
            'type': 'integer',
          },
          'sheep': {
            'title': 'sheep',
            'type': 'integer',
          },
          'kiwi': {
            'title': 'kiwi',
            'type': 'array',
            'default': [],
          },
        },
      },
    },
  ])
</script>