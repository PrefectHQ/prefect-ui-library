<template>
  <ComponentPage title="BlockCapabilityBlockDocumentInput" :demos="demos">
    <div class="h-64">
      <BlockCapabilityBlockDocumentInput v-model="selected" :capability="capability" />
    </div>

    <template #empty>
      <BlockCapabilityBlockDocumentInput v-model="selectedEmpty" capability="" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import BlockCapabilityBlockDocumentInput from '@/components/BlockCapabilityBlockDocumentInput.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockSchemasMock } from '@/demo/compositions/useBlockSchemaMock'
  import { DemoSection } from '@/demo/types/demoSection'
  import { choice } from '@/utilities'

  const demos: DemoSection[] = [{ title: 'Empty', description: 'An input with no block documents to choose from' }]

  const schemas = useBlockSchemasMock(5)
  const capability = choice(schemas.flatMap(schema => schema.capabilities))

  const selected = ref(null)
  const selectedEmpty = ref(null)
</script>