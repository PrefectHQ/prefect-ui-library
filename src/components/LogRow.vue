<template>
  <div class="log-row">
    <div class="log-row__leading">
      <LogLevelLabel :level="log.level" />
    </div>

    <div class="log-row__content">
      <!--
        We pass the log message through an html sanitizer
        so we can use v-html more securely
      -->
      <p-sanitize-html class="log-row__content--parsed" :html="message" :config="config" />
    </div>

    <div class="log-row__trailing">
      <div>
        {{ formatTimeNumeric(log.timestamp) }}
      </div>
      <div v-if="taskRunName">
        {{ taskRunName }}
      </div>
      <div v-if="log.name" class="log-row__logger">
        {{ log.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import LogLevelLabel from '@/components/LogLevelLabel.vue'
  import { useTaskRun } from '@/compositions'
  import { Log } from '@/models'
  import { formatTimeNumeric } from '@/utilities/dates'
  import { urlRegex } from '@/utilities/urls'

  const props = defineProps<{
    log: Log,
  }>()

  const config = {
    ALLOWED_TAGS: ['a'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  }

  const convertUrlsToAnchors = (message: string): string => {
    return message.replace(urlRegex, (url: string) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    })
  }

  const message = computed(() => convertUrlsToAnchors(props.log.message))

  const taskRunId = computed(() => props.log.taskRunId)
  const { taskRun } = useTaskRun(taskRunId)
  const taskRunName = computed(() => taskRun.value?.name)
</script>

<style>
.log-row { @apply
  grid
  py-2;
  grid-template-columns: 84px minmax(0, 1fr) 150px;
}

@media (max-width: 768px) {
  .log-row { @apply
  grid
  py-2;
  grid-template-columns: none;
  grid-template-rows: 20px minmax(0, 1fr) 50px;
}
}

.log-row__leading { @apply
  select-none;
}

.log-row__content { @apply
  flex-1
  select-auto
  whitespace-pre-wrap
  break-words
}

.log-row__content--parsed a[href] { @apply
  hover:text-link
  hover:underline
}

.log-row__trailing { @apply
  text-xs
  text-subdued
  shrink-0
  text-right
  pl-1
  truncate
}

.log-row__logger { @apply
  font-black
  break-all
  whitespace-normal
}
</style>