<template>
  <div class="marketing-banner" :class="classes">
    <div class="marketing-banner__background-image" />
    <div class="marketing-banner__content">
      <slot>
        <div class="marketing-banner__message">
          <div v-if="title" class="marketing-banner__title">
            {{ title }}
          </div>
          <div v-if="subtitle" class="marketing-banner__subtitle">
            {{ subtitle }}
          </div>
        </div>
      </slot>
      <div class="marketing-banner__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    title?: string,
    subtitle?: string,
    alternate?: boolean,
  }>()

  const classes = computed(() => ({
    'marketing-banner--alternate': props.alternate,
  }))
</script>

<style>
.marketing-banner { @apply
  relative
  overflow-hidden
  rounded
  bg-prefect
  text-white
}

.marketing-banner__content { @apply
  relative
  flex
  flex-col
  gap-2
  justify-between
  items-center
  py-10
  px-8
  z-[2]
  sm:flex-row
}

.marketing-banner__message { @apply
  flex
  flex-col
  gap-1
}

.marketing-banner__title { @apply
  text-xl
}

.marketing-banner__subtitle { @apply
  text-base
}

.marketing-banner__actions { @apply
  flex
  flex-col
  gap-2
  flex-shrink-0
}

.marketing-banner__background-image {
  position: absolute;
  background: url("/constellations.svg");
  background-size: 500px, contain;
  background-position: right;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.marketing-banner--alternate { @apply
  bg-background
  text-foreground
  border
  dark:border-background-600
  shadow-md;
  background-image: none;
}

.marketing-banner--alternate .marketing-banner__background-image {
  background: url("/circle.svg");
  background-position: center;
  height: 100vh;
  width: 100vh;
  left: 50%;
  animation: spin 40s linear infinite
}
</style>