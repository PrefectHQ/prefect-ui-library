<template>
  <DemoSection heading="Block Schemas">
    <DemoSubSection heading="Form">
      <BlockSchemaCreateForm v-model:data="data" v-model:name="name" :block-schema="blockSchema" />
      {{ data }}
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockSchemaCreateForm from '@/components/BlockSchemaCreateForm.vue'
  import { BlockDocumentData } from '@/models'
  import { mocker } from '@/services'


  const blockSchema = mocker.create('blockSchema')
  const data = ref<BlockDocumentData>({})
  const name = ref('')
</script>