<template>
  <DemoSection heading="Block Schemas">
    <DemoSubSection heading="Form">
      <BlockSchemaCreateForm :block-schema="blockSchema" @submit="submit" />
      {{ data }}
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockSchemaCreateForm from '@/components/BlockSchemaCreateForm.vue'
  import { BlockDocumentCreateNamed } from '@/models'
  import { mocker } from '@/services'


  const blockSchema = mocker.create('blockSchema')
  const data = ref<BlockDocumentCreateNamed>()

  function submit(value: BlockDocumentCreateNamed): void {
    data.value = value
  }
</script>