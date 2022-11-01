<template>
  <ComponentPage title="BlockSchemaCreateForm">
    <BlockSchemaCreateForm :block-schema="blockSchema" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockSchemaCreateForm from '@/components/BlockSchemaCreateForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockSchemaMock } from '@/demo/compositions/useBlockSchemaMock'

  const blockSchema = useBlockSchemaMock()
</script>