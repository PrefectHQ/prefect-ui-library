<template>
  <BlockTypeCardLayout :block-type="blockDocument.blockType" class="block-document-card">
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
.block-document-card {
  grid-template-areas: "type"
                       "content";
}

@screen md {
  .block-document-card {
    grid-template-areas: "content type";
  }
}

.block-document-card { @apply
  grid
  gap-4
  md:grid-cols-[minmax(0,1fr)_250px]
}

.block-document-card__content { @apply
  self-start
}

.block-document-card__content {
  grid-area: content;
}

.block-document-card__help { @apply
  text-gray-500
  text-sm
}

.block-document-card__emphasized-section {
  @apply font-semibold
}

.block-document-card__type { @apply
  self-start
}

.block-document-card__type {
  grid-area: type;
}
</style>