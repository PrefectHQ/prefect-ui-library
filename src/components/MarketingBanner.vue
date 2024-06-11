<template>
  <p-card class="marketing-banner" :class="classes.root">
    <div class="marketing-banner__content" :class="classes.content">
      <slot>
        <div class="marketing-banner__message">
          <p-heading v-if="title" :heading="2" class="marketing-banner__title">
            {{ title }}
          </p-heading>
          <div v-if="subtitle" class="marketing-banner__subtitle">
            {{ subtitle }}
          </div>
        </div>
      </slot>
      <div class="marketing-banner__actions">
        <slot name="actions" />
      </div>
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    title?: string,
    subtitle?: string,
    alternate?: boolean,
    centered?: boolean,
  }>()

  const classes = computed(() => ({
    root: {
      'marketing-banner--alternate': props.alternate,
    },
    content: {
      'marketing-banner__content--centered': props.centered,
    },
  }))
</script>

<style>
.marketing-banner { @apply
  relative
  overflow-hidden
  bg-[url('/marketing-banner-bg-light.svg')]
  dark:bg-[url('/marketing-banner-bg-dark.svg')];
  background-size: auto 100%;
  background-position: top right;
  background-repeat: no-repeat;
}

.marketing-banner__content { @apply
  relative
  flex
  flex-col
  items-start
  gap-3
  z-[2]
  p-4
  sm:px-8
  sm:py-10
  sm:justify-between
  sm:items-center
  sm:flex-row
}

.marketing-banner__message { @apply
  flex
  flex-col
  gap-2
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

.marketing-banner--alternate { @apply
  text-default
  bg-floating
  shadow-lg
}

.marketing-banner__content--centered { @apply
  text-center
  flex-col
  items-center
  justify-center
  gap-8
}
</style>