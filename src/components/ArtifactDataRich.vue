<template>
  <div class="artifact-data-rich">
    <iframe
      :srcdoc="processedHtml"
      :sandbox="sandboxAttribute"
      class="artifact-data-rich__iframe"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { RichArtifact } from '@/models'

  const props = defineProps<{
    artifact: RichArtifact,
  }>()

  const sandboxAttribute = computed(() => {
    const sandbox = props.artifact.data.sandbox ?? ['allow-scripts']
    return sandbox.join(' ')
  })

  // Inject CSP meta tag if provided
  const processedHtml = computed(() => {
    const html = props.artifact.data.html
    const csp = props.artifact.data.csp

    if (!csp) return html

    const cspTag = `<meta http-equiv="Content-Security-Policy" content="${csp}">`

    // Inject into <head> if present, otherwise prepend
    if (html.includes('<head>')) {
      return html.replace('<head>', `<head>${cspTag}`)
    }
    return `${cspTag}${html}`
  })
</script>

<style>
.artifact-data-rich { @apply
  w-full
}

.artifact-data-rich__iframe { @apply
  w-full
  min-h-[400px]
  border
  border-default
  rounded
}
</style>
