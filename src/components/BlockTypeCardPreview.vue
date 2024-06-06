<template>
  <p-card class="block-type-card-preview">
    <template #header>
      <LogoImage v-if="blockType.logoUrl" :url="blockType.logoUrl" class="block-type-card-preview__logo" size="lg" />
      <p-icon v-else icon="PBlock" class="block-type-card-preview__icon" />
      <!-- <img v-if="blockType.logoUrl" :src="blockType.logoUrl" class="block-type-card-preview__logo"> -->
      <p-heading class="block-type-card-preview__name" heading="4">
        {{ blockType.name }}
      </p-heading>
    </template>


    <template v-if="blockType.description">
      <p-markdown-renderer :text="blockType.description" class="block-type-card-preview__description" />
    </template>

    <template v-if="slots.actions" #footer>
      <div class="block-type-card-preview__actions">
        <p-button size="sm" variant="ghost" :to="routes.blocksCatalogView(blockType.slug)">
          Details
        </p-button>
        <slot name="actions" />
      </div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { BlockType } from '@/models/BlockType'

  defineProps<{
    blockType: BlockType,
  }>()

  const slots = useSlots()
  const routes = useWorkspaceRoutes()
</script>

<style>
.block-type-card-preview { @apply
  flex
  overflow-hidden
  flex-col
  relative
}

.block-type-card-preview .p-card-header { @apply
  flex
  flex-row
  justify-start
  items-center
  gap-4
}

.block-type-card-preview .p-card-content { @apply
  flex
  flex-col
  grow
}

.block-type-card-preview__logo { @apply
  shrink-0
}

.block-type-card-preview__icon { @apply
  shrink-0
  w-12
  h-12
  overflow-hidden
  rounded
  bg-black
  bg-opacity-10
  dark:bg-white
  dark:bg-opacity-25
  backdrop-blur-sm
  p-1
}

.block-type-card-preview__name { @apply
  grow
}

.block-type-card-preview__description { @apply
  text-subdued
  text-xs
  overflow-auto
  h-24
  grow
}

.block-type-card-preview__capabilities { @apply
  mb-2
}

.block-type-card-preview__actions { @apply
  flex
  gap-2
  justify-end
  w-full
}
</style>