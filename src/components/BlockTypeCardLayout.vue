<template>
  <p-card class="block-type-card-layout">
    <div class="block-type-card-layout__content">
      <slot />
    </div>

    <BlockTypeCardPreview :block-type="blockType" class="block-type-card-layout__type" />
  </p-card>
</template>

<script lang="ts" setup>
  import BlockTypeCardPreview from '@/components/BlockTypeCardPreview.vue'
  import { BlockType } from '@/models'

  defineProps<{
    blockType: BlockType,
  }>()
</script>

<style>
.block-type-card-layout {
  grid-template-areas: "type"
                       "content";
}

@screen md {
  .block-type-card-layout {
    grid-template-areas: "content type";
  }
}

.block-type-card-layout { @apply
  grid
  gap-4
  md:grid-cols-[minmax(0,1fr)_250px]
}

.block-type-card-layout__content {
  grid-area: content;
}

.block-type-card-layout__type {
  align-self: start;
  grid-area: type;
}
</style>