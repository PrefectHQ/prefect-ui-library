<template>
  <p-card class="block-type-card">
    <p-content>
      <LogoImage :url="blockType.logoUrl" class="block-type-card__logo" />

      <p-key-value label="Name" :value="blockType.name" />

      <p-key-value label="Slug" :value="blockType.slug" />

      <template v-if="blockSchema && hasCapabilities">
        <p-key-value label="Capabilities">
          <template #value>
            <BlockSchemaCapabilities :capabilities="blockSchema.capabilities" class="block-type-card__capabilities" />
          </template>
        </p-key-value>
      </template>

      <template v-if="blockType.description">
        <p-key-value label="Description" :value="blockType.description" />
      </template>

      <template v-if="blockType.codeExample">
        <p-key-value label="Example">
          <template #value>
            <BlockTypeSnippet :snippet="blockType.codeExample" />
          </template>
        </p-key-value>
      </template>
      <div class="block-type-card__actions">
        <template v-if="blockType.documentationUrl">
          <a :href="blockType.documentationUrl" target="_blank">
            <p-button icon-append="ArrowTopRightOnSquareIcon">
              <slot>
                View Docs
              </slot>
            </p-button>
          </a>
        </template>

        <p-link :to="routes.blockCreate(blockType.slug)" class="block-type-card__action">
          <p-button icon-append="PlusIcon" class="block-type-card__button">
            Add Block
          </p-button>
        </p-link>
      </div>
    </p-content>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import BlockSchemaCapabilities from '@/components/BlockSchemaCapabilities.vue'
  import BlockTypeSnippet from '@/components/BlockTypeSnippet.vue'
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { BlockType } from '@/models/BlockType'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const routes = useWorkspaceRoutes()

  const blockTypeId = computed(() => props.blockType.id)
  const api = useWorkspaceApi()
  const blockSchemaSubscription = useSubscription(api.blockSchemas.getBlockSchemaForBlockType, [blockTypeId])
  const blockSchema = computed(() => blockSchemaSubscription.response)
  const hasCapabilities = computed(() => blockSchema.value?.capabilities.length)
</script>

<style>
.block-type-card__actions { @apply
  flex
  gap-2
  items-center
  justify-end
}
</style>