<template>
  <div class="code-lines" :class="classes">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <pre class="code-lines__lines"><template v-for="(line, index) in lines" :key="index"><span class="code-lines__line" v-html="line" /></template></pre>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    code: string,
    showLineNumbers?: boolean,
  }>()

  const lines = computed(() => props.code.split('\n'))

  const classes = computed(() => ({
    'code-lines--with-line-numbers': props.showLineNumbers,
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
  px-3
  mr-5
  border-r-[1px]
  border-slate-400
  text-slate-400;
  counter-increment: line;
  content: counter(line);
}
</style>