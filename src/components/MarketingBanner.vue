<template>
  <div class="marketing-banner p-background" :class="classes">
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
  rounded-default
  bg-[url('/marketing-banner-bg-light.svg')]
  dark:bg-[url('/marketing-banner-bg-dark.svg')];
  background-size: auto 100%;
  background-position: top 0px right 0px;
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

.marketing-banner--alternate { @apply
  text-default
  bg-floating
  shadow-lg
}
</style>