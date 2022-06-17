<template>
  <p-card class="block-type-card">
    <BlockTypeLogo :block-type="blockType" class="block-type-card__logo" />
    <p-link :to="blockCatalogCreateRoute(blockTypeNameRoute)">
      {{ blockType.name }}
    </p-link>
    <template v-if="blockType.description">
      <p class="block-type-card__description">
        {{ blockType.description }}
      </p>
    </template>
    <BlockSchemaCapabilities :capabilities="capabilities" class="block-type-card__capabilities" />
    <p-button inset class="block-type-card__action">
      Add <p-icon icon="PlusIcon" />
    </p-button>
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockSchemaCapabilities from './BlockSchemaCapabilities.vue'
  import BlockTypeLogo from '@/components/BlockTypeLogo.vue'
  import { BlockType } from '@/models/BlockType'
  import { blockCatalogCreateRouteKey } from '@/router'
  import { mocker } from '@/services'
  import { inject, kebabCase } from '@/utilities'

  const props = defineProps<{
    blockType: BlockType,
  }>()

  const blockCatalogCreateRoute = inject(blockCatalogCreateRouteKey)
  const blockTypeNameRoute = computed(() => kebabCase(props.blockType.name))

  // todo: update with schema subscription to get capabilities
  const capabilities = mocker.create('blockSchemaCapabilities')
</script>

<style>
.block-type-card { @apply
  flex
  flex-col
  gap-2
}

.block-type-card__logo { @apply
  !w-11
  !h-11
}

.block-type-card__description { @apply
  text-gray-500
  line-clamp-5
}

.block-type-card__capabilities { @apply
  mb-2
}

.block-type-card__action { @apply
  mt-auto
}
</style>