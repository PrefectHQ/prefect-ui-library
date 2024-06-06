<template>
  <template v-if="url">
    <div class="logo-image" :class="classes">
      <img :src="url">
    </div>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = withDefaults(defineProps<{
    url: string | null,
    size?: 'sm' | 'md' | 'lg',
  }>(), {
    size: 'md',
  })

  const classes = computed(() => [`logo-image--size-${props.size}`])
</script>

<style>
.logo-image { @apply
  bg-cover
  bg-center
  overflow-hidden
  rounded
  bg-black
  bg-opacity-10
  dark:bg-white
  dark:bg-opacity-25
  backdrop-blur-sm
  p-1
}

.logo-image--size-sm { @apply
  w-4
  h-4
}

.logo-image--size-md { @apply
  w-8
  h-8
}

.logo-image--size-lg { @apply
  w-12
  h-12
}
</style>