<template>
  <div class="code-banner">
    <template v-if="title || slots.title || subtitle || slots.subtitle">
      <div class="code-banner__message">
        <template v-if="title || slots.title">
          <div class="code-banner__message-title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </template>
        <template v-if="subtitle || slots.subtitle">
          <div class="code-banner__message-subtitle">
            <slot name="subtitle">
              {{ subtitle }}
            </slot>
          </div>
        </template>
      </div>
    </template>

    <p-terminal
      :command="command"
      :pre-command="preCommand"
      class="code-banner__terminal"
    />
  </div>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'

  defineProps<{
    title?: string,
    subtitle?: string,
    command: string,
    preCommand?: string,
  }>()

  const slots = useSlots()
</script>

<style>
.code-banner { @apply
  min-h-[160px]
  rounded
  text-white
  flex
  flex-wrap
  gap-x-6
  justify-center
  items-center
  bg-prefect-600;
  background-image: url(/constellations.svg);
  background-position: center;
  background-size: 350px, contain;
}

.code-banner__message { @apply
  text-center
  m-8
}

.code-banner__message-title { @apply
  text-2xl
  flex-shrink
  whitespace-nowrap
}

.code-banner__terminal { @apply
  max-w-2xl
  rounded-b-none
  w-11/12
}
</style>