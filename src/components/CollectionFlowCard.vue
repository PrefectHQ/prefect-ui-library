<template>
  <p-card class="collection-card">
    <p-content v-if="collectionFlow">
      <LogoImage :url="collectionFlow.logoUrl" class="collection-card__logo" />

      <p-key-value label="Name" :value="collectionFlow.name" />

      <p-key-value label="Slug" :value="collectionFlow.slug" />

      <template v-if="collectionFlow.description">
        <p-key-value label="Description" :value="collectionFlow.description" />
      </template>

      <template v-for="(example, index) in collectionFlow.examples" :key="index">
        <p-key-value label="Example" class="collection-card__example">
          <template #value>
            <p-code-highlight lang="python" :text="example" show-line-numbers />
          </template>
        </p-key-value>
      </template>

      <div class="collection-card__actions">
        <template v-if="collectionFlow.documentationUrl">
          <a :href="collectionFlow.documentationUrl" target="_blank">
            <p-button inset>
              <slot>
                View Docs
              </slot>
              <p-icon icon="ExternalLinkIcon" class="collection-card__documentation-icon" />
            </p-button>
          </a>
        </template>

        <p-link :to="routes.blockCreate(collectionFlow.slug)" class="collection-card__action">
          <p-button class="collection-card__button">
            Add Block<p-icon icon="PlusIcon" />
          </p-button>
        </p-link>
      </div>
    </p-content>
  </p-card>
</template>

<script lang="ts" setup>
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { CollectionFlow } from '@/models'

  defineProps<{
    collectionFlow: CollectionFlow,
  }>()

  const routes = useWorkspaceRoutes()
</script>

<style>
.collection-card__actions { @apply
  flex
  gap-2
  items-center
  justify-end
}

.collection-card__documentation-icon { @apply
  ml-2
  w-5
  h-5
}

.collection-card__example,
.collection-card__example .p-key-value__value { @apply
  overflow-auto
}
</style>