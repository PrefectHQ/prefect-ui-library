<template>
  <PCard class="block-document-card">
    <PContent class="block-document-card__content">
      <template v-if="blockType.codeExample || blockType.documentationUrl">
        <p class="block-document-card__help">
          <template v-if="blockType.codeExample">
            Paste this ID into your flows to use this block.
          </template>
          <template v-if="blockType.documentationUrl">
            Need help? <p-link :to="blockType.documentationUrl">
              View Docs
            </p-link>
          </template>
        </p>
      </template>

      <CodeSnippet v-if="snippet" :snippet="snippet" />

      <BlockDocumentProperties :data="blockDocument.data" :block-schema="blockDocument.blockSchema" />
    </PContent>
    <BlockTypeCard :block-type="blockType" class="block-document-card__type" />
  </PCard>
</template>

<script lang="ts" setup>
  import { PContent, PCard } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import BlockDocumentProperties from './BlockDocumentProperties.vue'
  import CodeSnippet from './CodeSnippet.vue'
  import BlockTypeCard from '@/components/BlockTypeCard.vue'
  import { BlockDocument } from '@/models/BlockDocument'

  const props = defineProps<{
    blockDocument: BlockDocument,
  }>()

  const blockType = computed(() => props.blockDocument.blockType)
  const snippet = computed(() => blockType.value.codeExample?.replace('BLOCK_NAME', props.blockDocument.name))
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

.block-document-card__type { @apply
  self-start
}

.block-document-card__type {
  grid-area: type;
}
</style>