<template>
  <DemoSection heading="Block Schemas">
    <DemoSubSection heading="Form">
      <BlockSchemaForm v-model:data="data" v-model:name="name" :block-schema="blockSchema" />
      {{ data }}
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import axios from 'axios'
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlockSchemaForm from '@/components/BlockSchemaForm.vue'
  import { BlockDocumentData } from '@/models'
  import { BlockSchema } from '@/models/BlockSchema'
  import { mapper } from '@/services/Mapper'


  const blockSchema: BlockSchema = await axios.post('http://localhost:4200/api/block_schemas/filter').then(response => mapper.map('BlockSchemaResponse', response.data[9], 'BlockSchema'))
  const data = ref<BlockDocumentData>({})
  const name = ref('')
</script>