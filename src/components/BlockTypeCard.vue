<template>
  <p-card class="block-type-card">
    <p-content>
      <BlockTypeLogo :block-type="blockType" class="block-type-card__logo" />

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
      <div class="block-catalog-view__actions">
        <template v-if="blockType.documentationUrl">
          <a :href="blockType.documentationUrl" target="_blank">
            <p-button inset>
              <slot>
                View Docs
              </slot>
              <p-icon icon="ExternalLinkIcon" class="blocks-catalog-view__documentation-icon" />
            </p-button>
          </a>
        </template>

        <p-link :to="routes.blockCreate(blockType.slug)" class="block-type-card__action">
          <p-button class="block-type-card__button">
            Add Block<p-icon icon="PlusIcon" />
          </p-button>
        </p-link>
      </div>
    </p-content>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import BlockSchemaCapabilities from './BlockSchemaCapabilities.vue'
  import BlockTypeLogo from './BlockTypeLogo.vue'
  import BlockTypeSnippet from './BlockTypeSnippet.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { BlockType } from '@/models/BlockType'
  import { useWorkspaceRoutes } from '@/router/routes'

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
.block-catalog-view__actions { @apply
  flex
  gap-2
  items-center
  justify-end
}

.blocks-catalog-view__documentation-icon { @apply
  ml-2
  w-5
  h-5
}
</style>