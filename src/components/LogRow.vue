<template>
  <div class="log-row">
    <div class="log-row__leading">
      <LogLevelLabel :level="log.level" />
    </div>

    <div class="log-row__content">
      <template v-for="(chunk, index) in chunks" :key="index">
        <span :class="chunk.classes">
          <template v-if="chunk.type === 'text'">
            {{ chunk.value }}
          </template>

          <template v-if="chunk.type === 'link'">
            <p-link :to="chunk.value" rel="noopener noreferrer">{{ chunk.value }}</p-link>
          </template>
        </span>
      </template>
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
  import { ansiiColorRegex, ansiToTailwind } from '@/utilities/logs'
  import { urlRegex } from '@/utilities/urls'

  const props = defineProps<{
    log: Log,
  }>()

  const { taskRun } = useTaskRun(() => props.log.taskRunId)
  const taskRunName = computed(() => taskRun.value?.name)

  type LogChunk = {
    type: 'text' | 'link',
    value: string,
    classes: string[],
  }

  const chunks = computed(() => {
    const output: LogChunk[] = []
    const { message } = props.log

    let currentClasses: string[] = []

    const processText = (text: string, type: 'text' | 'link'): void => {
      let lastIndex = 0
      const ansiMatches = text.matchAll(ansiiColorRegex)

      for (const match of ansiMatches) {
        if (lastIndex < match.index) {
          output.push({
            type,
            value: text.slice(lastIndex, match.index),
            classes: [...currentClasses],
          })
        }

        const [fullMatch, codeStr] = match
        const newClass = ansiToTailwind[codeStr]

        if (newClass === '') {
          // Reset
          currentClasses = []
        } else if (newClass) {
          if (!currentClasses.includes(newClass)) {
            // Overrides the subdued default text color for logs with the theme default; this is to ensure that the text is readable when using ansii colors
            currentClasses.push('text-default')
            currentClasses.push(newClass)
          }
        }

        lastIndex = match.index + fullMatch.length
      }

      if (lastIndex < text.length) {
        output.push({
          type,
          value: text.slice(lastIndex),
          classes: [...currentClasses],
        })
      }
    }

    let lastIndex = 0
    const urlMatches = message.matchAll(urlRegex)

    for (const match of urlMatches) {
      if (lastIndex < match.index) {
        processText(message.slice(lastIndex, match.index), 'text')
      }

      const [url] = match
      processText(url, 'link')

      lastIndex = match.index + url.length
    }

    if (lastIndex < message.length) {
      processText(message.slice(lastIndex), 'text')
    }

    return output
  })
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