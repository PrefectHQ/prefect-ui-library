<template>
  <p-card class="block-type-card">
    <BlockTypeLogo :block-type="blockType" class="block-type-card__logo" />
    <p class="block-type-card__name">
      {{ blockType.name }}
    </p>

    <template v-if="blockType.description">
      <p class="block-type-card__description">
        {{ blockType.description }}
      </p>
    </template>

    <BlockSchemaCapabilities :capabilities="capabilities" class="block-type-card__capabilities" />

    <template v-if="slots.actions">
      <div class="block-type-card__action">
        <slot name="actions" />
      </div>
    </template>
  </p-card>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'
  import BlockSchemaCapabilities from './BlockSchemaCapabilities.vue'
  import BlockTypeLogo from '@/components/BlockTypeLogo.vue'
  import { BlockType } from '@/models/BlockType'
  import { mocker } from '@/services'

  defineProps<{
    blockType: BlockType,
  }>()

  const slots = useSlots()

  // todo: update with schema subscription to get capabilities
  const capabilities = mocker.create('blockSchemaCapabilities')
</script>

<style>
.block-type-card { @apply
  flex
  flex-col
  gap-2
  p-4
}

.block-type-card__logo { @apply
  !w-11
  !h-11
}

.block-type-card__name { @apply
  text-base
}

.block-type-card__description { @apply
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