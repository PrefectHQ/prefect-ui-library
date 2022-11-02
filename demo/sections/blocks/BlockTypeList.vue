<template>
  <ComponentPage title="BlockTypeList">
    <BlockTypeList v-model:capability="capability" :block-types="blockTypesFiltered" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import BlockTypeList from '@/components/BlockTypeList.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockTypesMock } from '@/demo/compositions/useBlockTypeMock'
  import { data } from '@/demo/utilities/data'

  const capability = ref<string | null>(null)
  const blockTypes = useBlockTypesMock(8)

  const blockTypesFiltered = computed(() => blockTypes.filter(blockType => {
    if (capability.value === null) {
      return true
    }

    const blockSchema = data.blockSchemas.find(blockSchema => blockSchema.blockTypeId === blockType.id)!

    return blockSchema.capabilities.includes(capability.value)
  }))
</script>