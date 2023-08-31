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
  rounded-default;
  background-image: url('/marketing-banner-bg.svg');
  background-size: auto 100%;
  background-position: top 0px right 0px;
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

.marketing-banner--alternate { @apply
  text-default
  bg-floating
  shadow-lg
}
</style>