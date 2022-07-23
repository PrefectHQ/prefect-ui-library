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
    <div class="code-banner__terminal">
      <div class="code-banner__terminal-top-bar">
        <div class="code-banner__window">
          <div class="code-banner__window-button" />
          <div class="code-banner__window-button" />
          <div class="code-banner__window-button" />
        </div>
        <p-button size="xs" inset class="code-banner__copy-button" @click="copyToClipboard(command)">
          Copy
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
  flex
  flex-col
  self-end
  px-5
  py-4
  gap-6
  max-w-2xl
  bg-gray-900
  rounded-t
  w-11/12
}

.code-banner__terminal-top-bar { @apply
  h-5
  flex
  justify-between
}

.code-banner__window { @apply
  flex
  gap-2
}

.code-banner__window-button { @apply
  rounded-full
  h-3
  w-3
}

.code-banner__window-button:nth-of-type(1) { @apply
  bg-[#FB4E4E]
}

.code-banner__window-button:nth-of-type(2) { @apply
  bg-[#F6A609]
}

.code-banner__window-button:nth-of-type(3) { @apply
  bg-[#2AC769]
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