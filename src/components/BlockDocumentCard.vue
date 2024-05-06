<template>
  <BlockTypeCardLayout :block-type="blockDocument.blockType">
    <PContent class="block-document-card__content">
      <template v-if="blockType.codeExample || blockType.documentationUrl">
        <p class="block-document-card__help">
          <template v-if="blockType.codeExample">
            Paste this snippet <span class="block-document-card__emphasized-section">into your flows</span> to use this block.
          </template>
          <template v-if="blockType.documentationUrl">
            Need help? <p-link :to="blockType.documentationUrl">
              View Docs
            </p-link>
          </template>
        </p>
      </template>

      <BlockTypeSnippet v-if="snippet" v-bind="{ snippet, name }" />
      <SchemaPropertiesKeyValues :values="blockDocument.data" :schema="blockDocument.blockSchema.fields" />
    </PContent>
  </BlockTypeCardLayout>
</template>

<script lang="ts" setup>
  import { PContent } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import BlockTypeCardLayout from '@/components/BlockTypeCardLayout.vue'
  import BlockTypeSnippet from '@/components/BlockTypeSnippet.vue'
  import SchemaPropertiesKeyValues from '@/components/SchemaPropertiesKeyValues.vue'
  import { BlockDocument } from '@/models/BlockDocument'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const blockType = computed(() => props.blockDocument.blockType)
  const snippet = computed(() => blockType.value.codeExample)
  const name = computed(() => props.blockDocument.name)
</script>

<style>
.block-document-card__help { @apply
  text-subdued
  text-sm
}

.block-document-card__emphasized-section {
  @apply font-semibold
}
</style>