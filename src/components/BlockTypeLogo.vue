<template>
  <template v-if="blockType.logoUrl">
    <div class="block-type-logo">
      <img :src="blockType.logoUrl">
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { BlockType } from '@/models/BlockType'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const background = computed(() => `url(${props.blockType.logoUrl})`)
</script>

<style>
.block-type-logo { @apply
  bg-cover
  bg-center
  w-8
  h-8
}

.block-type-logo {
  background-image: v-bind(background)
}
</style>