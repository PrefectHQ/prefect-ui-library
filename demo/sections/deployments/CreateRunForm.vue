<template>
  <ComponentPage title="Create Run Form">
    <FlowRunCreateForm :deployment="deployment" :parameters="parameters" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunCreateForm from '@/components/FlowRunCreateForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { Deployment, SchemaResponse } from '@/models'
  import { mapper, mocker } from '@/services'

  const deploymentParameters = {
    rat: 33,
    horse: 33,
  }

  const parameters = {
    rat: 42,
  }

  const rawSchema: SchemaResponse = {
    title: 'Open API Schema',
    type: 'object',
    properties: {
      rat: {
        title: 'rat',
        type: 'number',
        default: 11,
      },
      horse: {
        title: 'horse',
        type: 'number',
      },
    },
  }

  const schema = mapper.map('SchemaResponse', rawSchema, 'Schema')

  const overrides: [Partial<Deployment>] = [
    {
      parameters: deploymentParameters,
      parameterOpenApiSchema: schema,
    },
  ]

  const deployment = mocker.create('deployment', overrides)
</script>