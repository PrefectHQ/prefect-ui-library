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
  import { urlRegex } from '@/utilities/urls'

  const props = defineProps<{
    log: Log,
  }>()

  const taskRunId = computed(() => props.log.taskRunId)
  const { taskRun } = useTaskRun(taskRunId)
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


  const ansiToTailwind: Record<string, string> = {
    // Regular colors
    '30': 'text-black',
    '31': 'text-red-600',
    '32': 'text-green-600',
    '33': 'text-yellow-600',
    '34': 'text-blue-600',
    '35': 'text-purple-600',
    '36': 'text-cyan-600',
    '37': 'text-gray-200',

    // Bright colors
    '90': 'text-gray-500',
    '91': 'text-red-500',
    '92': 'text-green-500',
    '93': 'text-yellow-500',
    '94': 'text-blue-500',
    '95': 'text-purple-500',
    '96': 'text-cyan-500',
    '97': 'text-white',

    // Background colors
    '40': 'bg-black',
    '41': 'bg-red-600',
    '42': 'bg-green-600',
    '43': 'bg-yellow-600',
    '44': 'bg-blue-600',
    '45': 'bg-purple-600',
    '46': 'bg-cyan-600',
    '47': 'bg-gray-200',

    // Bright background colors
    '100': 'bg-gray-500',
    '101': 'bg-red-500',
    '102': 'bg-green-500',
    '103': 'bg-yellow-500',
    '104': 'bg-blue-500',
    '105': 'bg-purple-500',
    '106': 'bg-cyan-500',
    '107': 'bg-white',

    // Text styling
    '1': 'font-bold',
    '2': 'opacity-75',
    '3': 'italic',
    '4': 'underline',
    '9': 'line-through',

    // Reset
    '0': '',
  }

  const ansiiColorRegex = /\u001b\[(\d+)m/g

  function replaceAnsiiColorsWithSpans(text: string): string {
    return text.replace(ansiiColorRegex, (match, p1) => {
      const newClass = ansiToTailwind[p1]
      if (newClass) {
        return `<span class="${newClass}">`
      }
      return ''
    })
  }
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