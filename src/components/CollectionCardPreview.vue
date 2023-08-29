<template>
  <p-card class="collection-card-preview">
    <LogoImage :url="collectionItem.logoUrl" size="lg" class="collection-card-preview__logo" />
    <div class="collection-card-preview__type-tag">
      <p-tag :label="collectionItem.collectionType" />
    </div>
    <p class="collection-card-preview__name">
      <p-link :to="routes.flowCollection(collectionItem.name)">
        {{ collectionItem.name }}
      </p-link>
    </p>

    <p class="collection-card-preview__description">
      {{ collectionItem.description }}
    </p>
  </p-card>
</template>

<script lang="ts" setup>
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { CollectionItem } from '@/models'

  defineProps<{
    collectionItem: CollectionItem,
  }>()

  const routes = useWorkspaceRoutes()
</script>

<style>
.collection-card-preview { @apply
  grid
  gap-2
  p-4;
  grid-template-areas: 'logo tag'
  'name name'
  'description description';
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content;
}

.collection-card-preview__logo {
  grid-area: logo;
}

.collection-card-preview__type-tag { @apply
  capitalize;
  grid-area: tag;
}

.collection-card-preview__name { @apply
  text-base;
  grid-area: name;
}

.collection-card-preview__description { @apply
  text-subdued
  text-sm
  line-clamp-5;
  grid-area: description;
}

.collection-card-preview__action { @apply
  block
  mt-auto
}
</style>