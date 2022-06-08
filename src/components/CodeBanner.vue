<template>
  <div class="code-banner">
    <template v-if="title || slots.title || subtitle || slots.subtitle">
      <div class="code-banner__message">
        <template v-if="title || slots.title">
          <slot name="title">
            <div class="code-banner__message-title">
              {{ title }}
            </div>
          </slot>
        </template>
        <template v-if="subtitle || slots.subtitle">
          <slot name="subtitle">
            <div class="code-banner__message-subtitle">
              {{ subtitle }}
            </div>
          </slot>
        </template>
      </div>
    </template>
    <div class="code-banner__terminal">
      <div class="code-banner__terminal-top-bar">
        <svg
          width="54"
          height="12"
          viewBox="0 0 54 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="6" fill="#FB4E4E" />
          <circle cx="27" cy="6" r="6" fill="#F6A609" />
          <circle cx="48" cy="6" r="6" fill="#2AC769" />
        </svg>
        <p-button size="xs" inset class="code-banner__copy-button" @click="copyToClipboard(command)">
          copy
        </p-button>
      </div>
      <span class="code-banner__terminal-code">
        {{ command }}<span class="code-banner_terminal-cursor" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSlots } from 'vue'
  import { copyToClipboard } from '@/utilities/copy'

  defineProps<{
    title?: string,
    subtitle?: string,
    command: string,
  }>()

  const slots = useSlots()
</script>

<style>
.code-banner { @apply
  min-h-[160px]
  rounded
  text-white
  flex
  flex-col
  gap-6
  justify-center
  items-center
  md:flex-row;
  background: var(--state-running-600) url(/constellations.svg) center;
  background-size: 350px, contain;
}

.code-banner__message { @apply
  text-center
  m-4
}

.code-banner__message-title { @apply
  text-2xl
  flex-shrink
  whitespace-nowrap
}

.code-banner__terminal { @apply
  flex
  flex-grow
  flex-col
  px-5
  py-4
  gap-3
  bg-gray-900
  rounded-t
  w-11/12
  md:min-h-[136px]
  md:mx-2
  md:mt-4
  md:self-end
}

.code-banner__terminal-top-bar { @apply
  h-5
  flex
  justify-between
}

.code-banner__terminal-code,
.code-banner__message-subtitle { @apply
  text-gray-200
}

.code-banner_terminal-cursor { @apply
  ml-1
  -mb-1
  bg-gray-400
  inline-block;
  content: "";
  width: 7px;
  height: 18px;
  animation: blink 1.2s steps(2) infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
}
</style>