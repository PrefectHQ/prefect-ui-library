<template>
  <p-card class="block-type-card-preview">
    <template #header>
      <LogoImage :url="blockType.logoUrl" class="block-type-card-preview__logo" />
      <p class="block-type-card-preview__name">
        <p-link :to="routes.blocksCatalogView(blockType.slug)">
          {{ blockType.name }}
        </p-link>
      </p>
    </template>

    <template v-if="blockType.description">
      <p-markdown-renderer :text="blockType.description" class="block-type-card-preview__description" />
    </template>

    <template v-if="blockSchema">
      <BlockSchemaCapabilities :capabilities="blockSchema.capabilities" class="block-type-card-preview__capabilities" />
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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, useSlots } from 'vue'
  import BlockSchemaCapabilities from '@/components/BlockSchemaCapabilities.vue'
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { BlockType } from '@/models/BlockType'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const slots = useSlots()
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const blockTypeId = computed(() => props.blockType.id)
  const blockSchemaSubscription = useSubscription(api.blockSchemas.getBlockSchemaForBlockType, [blockTypeId])
  const blockSchema = computed(() => blockSchemaSubscription.response)
</script>

<style>
.block-type-card-preview { @apply
  flex
  flex-col
}

.block-type-card-preview .p-card-content { @apply
  flex
  flex-col
  grow
}

.block-type-card-preview__logo { @apply
  !w-11
  !h-11
}

.block-type-card-preview__name { @apply
  text-base
}

.block-type-card-preview__description { @apply
  text-subdued
  text-xs
  line-clamp-5
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