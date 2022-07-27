<template>
  <p-card class="block-type-card-preview">
    <BlockTypeLogo :block-type="blockType" class="block-type-card-preview__logo" />
    <p class="block-type-card-preview__name">
      <p-link :to="blockCatalogViewRoute(blockType.slug)">
        {{ blockType.name }}
      </p-link>
    </p>

    <template v-if="blockType.description">
      <p class="block-type-card-preview__description">
        {{ blockType.description }}
      </p>
    </template>

    <template v-if="blockSchema">
      <BlockSchemaCapabilities :capabilities="blockSchema.capabilities" class="block-type-card-preview__capabilities" />
    </template>

    <template v-if="slots.actions">
      <div class="block-type-card-preview__action">
        <slot name="actions" />
      </div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, useSlots } from 'vue'
  import BlockSchemaCapabilities from './BlockSchemaCapabilities.vue'
  import BlockTypeLogo from '@/components/BlockTypeLogo.vue'
  import { BlockType } from '@/models/BlockType'
  import { blockCatalogViewRouteKey } from '@/router'
  import { blockSchemasApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const slots = useSlots()
  const blockCatalogViewRoute = inject(blockCatalogViewRouteKey)
  const blockSchemasApi = inject(blockSchemasApiKey)

  const blockSchemaSubscriptionArgs = computed(() => ({
    blockSchemas: {
      blockTypeId: {
        any_: [props.blockType.id],
      },
    },
  }))

  const blockSchemaSubscription = useSubscription(blockSchemasApi.getBlockSchemas, [blockSchemaSubscriptionArgs])
  const blockSchema = computed(() => blockSchemaSubscription.response?.[0])
</script>

<style>
.block-type-card-preview { @apply
  flex
  flex-col
  gap-2
  p-4
}

.block-type-card-preview__logo { @apply
  !w-11
  !h-11
}

.block-type-card-preview__name { @apply
  text-base
}

.block-type-card-preview__description { @apply
  text-gray-500
  text-sm
  line-clamp-5
}

.block-type-card__capabilities { @apply
  mb-2
}

.block-type-card__action { @apply
  block
  mt-auto
}

.block-type-card__button { @apply
  block
  w-full
}
</style>