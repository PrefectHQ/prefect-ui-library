<template>
  <DemoSection heading="Block Schemas">
    <DemoSubSection heading="Form">
      <BlockSchemaForm v-model:data="data" v-model:name="name" :block-schema="blockSchema" />
      {{ data }}
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockSchemaForm from '@/components/BlockSchemaForm.vue'
  import { BlockDocumentData } from '@/models'
  import { mocker } from '@/services'


  const blockSchema = mocker.create('blockSchema')
  const data = ref<BlockDocumentData>({})
  const name = ref('')
</script>