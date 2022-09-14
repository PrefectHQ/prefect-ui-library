<template>
  <span class="separated-list">
    <template v-if="itemArray.length">
      <div class="separated-list__tags">
        <template v-for="item in allButLastArrayItems(itemArray)" :key="item">
          <slot :item="item">
            {{ item }}
          </slot>
        </template>
      </div>
      <template v-if="itemArray.length > 1">
        or
      </template>
      <slot :item="lastItem">
        {{ lastItem }}
      </slot>
    </template>
    <template v-else>
      <span class="separated-list__bold">any</span>
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { allButLastArrayItems, lastItemInArray } from '@/utilities/arrays'

  const props = defineProps<{
    itemArray: string[],
  }>()

  const lastItem = computed(() => lastItemInArray(props.itemArray))
</script>

<style>
.separated-list {
  @apply
  inline-flex
  gap-1
  items-center
  flex-wrap
}

.separated-list__tags {
  @apply
  inline-flex
  gap-1
  leading-4
  align-middle
  flex-wrap
}

.separated-list__bold {
  @apply
  font-bold
}
</style>
