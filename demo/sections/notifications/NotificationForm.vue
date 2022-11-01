<template>
  <ComponentPage title="NotificationForm">
    <NotificationForm class="color-mode-default" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import NotificationForm from '@/components/NotificationForm.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockSchemaMock } from '@/demo/compositions/useBlockSchemaMock'
  import { useBlockTypesMock } from '@/demo/compositions/useBlockTypeMock'

  const capabilities = ['notify']
  const [firstBlockType, secondBlockType] = useBlockTypesMock(2)

  useBlockSchemaMock({
    blockType: firstBlockType,
    blockTypeId: firstBlockType.id,
    capabilities,
  })

  useBlockSchemaMock({
    blockType: secondBlockType,
    blockTypeId: secondBlockType.id,
    capabilities,
  })
</script>