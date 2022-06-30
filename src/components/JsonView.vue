<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <p-code multiline class="json-view" v-html="highlightedValue" />
</template>

<script lang="ts" setup>
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, unref } from 'vue'

  type JsonObject = Record<string, unknown>
  type JsonArray = Record<string, unknown>[]
  type Json = JsonObject | JsonArray

  function isJson(val: unknown): val is Json {
    return typeof val == 'object' && val !== null
  }

  function isJsonObject(val: unknown): val is Json {
    return isJson(val) && !Array.isArray(val)
  }

  function isJsonArray(val: unknown): val is JsonArray {
    return isJson(val) && Array.isArray(val)
  }

  const props = defineProps<{
    value: unknown,
  }>()

  const valueRef = computed(() => props.value)
  const valueDebounced = useDebouncedRef(valueRef, 10)

  const highlightedValue = computed(() => {
    const value = unref(valueDebounced)

    try {
      if (value && typeof value === 'string') {
        const highlighted = getJsonHtml(JSON.parse(value))

        return highlighted
      }

      return value

    } catch {
      return value
    }
  })

  const getKeyHtml = (key: string): string => {
    return `<span class="json-view__key">"${key}"</span>`
  }

  const getValueHtml = (val: unknown): string => {
    const type = typeof val
    if (type == 'string') {
      val = `"${val}"`
    }
    return `<span class="json-view__${type}-value">${val}</span>`
  }

  const getNeutralHtml = (val: string): string => {
    return `<span class="json-view__neutral">${val}</span>`
  }

  const getBlockHtml = (val: string): string => {
    return `<div class="json-view__block">${val}</div>`
  }

  const getSpaceHtml = (level: number): string => {
    return '&nbsp'.repeat(level * 2)
  }

  const getArrayHtml = (val: JsonArray, level: number): string => {
    const lastIndex = val.length - 1
    let content = ''

    content += getNeutralHtml('[')

    content += val.reduce((str, value, index) => {
      let content = ''

      content += getSpaceHtml(level)

      if (isJson(value)) {
        content += getJsonHtml(value, level)
      } else {
        content += getValueHtml(value)
      }

      if (index !== lastIndex) {
        content += getNeutralHtml(',')
      }

      str += getBlockHtml(content)

      return str
    }, '')

    content += getSpaceHtml(level - 1)
    content += getNeutralHtml(']')

    return content
  }

  const getObjectHtml = (val: JsonObject, level: number): string => {
    const entries = Object.entries(val)
    const lastIndex = entries.length - 1

    let content = ''
    content += getNeutralHtml('{')

    content += entries.reduce((str, [key, value], index) => {
      let content = ''

      content += getSpaceHtml(level)
      content += getKeyHtml(key)
      content += getNeutralHtml(': ')

      if (isJson(value)) {
        content += getJsonHtml(value, level)
      } else {
        content += getValueHtml(value)
      }

      if (index !== lastIndex) {
        content += getNeutralHtml(',')
      }

      str += getBlockHtml(content)

      return str
    }, '')

    content += getSpaceHtml(level - 1)
    content += getNeutralHtml('}')

    return content
  }


  const getJsonHtml = (json: Json, level: number = 0): string => {
    level += 1

    if (isJsonArray(json)) {
      return getArrayHtml(json, level)
    }

    if (isJsonObject(json)) {
      return getObjectHtml(json, level)
    }

    return ''
  }
</script>

<style>
.json-view__key {
  @apply
  text-rose-400
}

.json-view__string-value {
  @apply
  text-emerald-400
}

.json-view__number-value, .json-view__bigint-value {
  @apply
  text-blue-400
}

.json-view__boolean-value {
  @apply
  text-red-500
}

.json-view__null-value, .json-view__object-value {
  @apply
  text-slate-400
  italic
}
</style>