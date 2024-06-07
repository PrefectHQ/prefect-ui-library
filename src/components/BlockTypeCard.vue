<template>
  <p-card class="block-type-card">
    <template #header>
      <LogoImage v-if="blockType.logoUrl" :url="blockType.logoUrl" class="block-type-card__logo" size="lg" />
      <p-icon v-else icon="PBlock" class="block-type-card__icon" />
      <p-heading class="block-type-card-preview__name" heading="3">
        {{ blockType.name }}
      </p-heading>
    </template>

    <p-content>
      <p-markdown-renderer v-if="description" :text="description" class="block-type-card__description" />

      <template v-if="blockType.codeExample">
        <p-heading class="block-type-card-preview__name" heading="5">
          Example
        </p-heading>
        <BlockTypeSnippet :snippet="blockType.codeExample" />
      </template>
    </p-content>

    <template #footer>
      <div class="block-type-card__actions">
        <p-link :to="routes.blockCreate(blockType.slug)" class="block-type-card__action">
          <p-button variant="default" class="block-type-card__button">
            Create
          </p-button>
        </p-link>
      </div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockTypeSnippet from '@/components/BlockTypeSnippet.vue'
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { BlockType } from '@/models/BlockType'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const routes = useWorkspaceRoutes()

  const description = computed(() => {
    let baseDescription = props.blockType.description

    if (props.blockType.documentationUrl) {
      baseDescription += ` [Documentation](${props.blockType.documentationUrl})`
    }

    return baseDescription
  })
</script>

<style>
.block-type-card .p-card-header { @apply
  flex
  flex-row
  justify-start
  items-center
  gap-4
}

.block-type-card__description { @apply
  text-sm
}

.block-type-card__actions { @apply
  flex
  gap-2
  justify-end
  w-full
  text-sm
  items-center
}

.block-type-card__logo { @apply
  shrink-0
  w-14
  h-14
}

.block-type-card__icon { @apply
  shrink-0
  w-14
  h-14
  overflow-hidden
  rounded
  bg-black
  bg-opacity-10
  dark:bg-white
  dark:bg-opacity-25
  backdrop-blur-sm
  p-1
}
</style>