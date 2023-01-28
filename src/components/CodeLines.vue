<template>
  <div class="code-lines" :class="classes.container">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <pre class="code-lines__lines"><template v-for="(line, index) in lines" :key="index"><span class="code-lines__line" v-html="line" /></template></pre>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { countDigits } from '@/utilities'

  const props = defineProps<{
    code: string,
    showLineNumbers?: boolean,
  }>()

  const lines = computed(() => props.code.split('\n'))
  const lineNumbersWidth = computed(() => `${30 + countDigits(lines.value.length) * 2}px`)

  const classes = computed(() => ({
    container: {
      'code-lines--with-line-numbers': props.showLineNumbers,
    },
  }))
</script>

<style>
.code-lines__lines {
  counter-reset: line;
}

.code-lines__line { @apply
  h-5
  w-full
  block
}

.code-lines--with-line-numbers .code-lines__line:before { @apply
  inline-block
  pr-3
  mr-5
  text-right
  border-r-[1px]
  border-slate-400
  text-slate-400;
  counter-increment: line;
  content: counter(line);
  width: v-bind(lineNumbersWidth);
}
</style>