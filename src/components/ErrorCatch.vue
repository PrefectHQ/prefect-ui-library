<template>
  <template v-if="!error">
    <slot />
  </template>
  <template v-else>
    <slot name="error" :error="error">
      <div class="error-catch">
        <h1>Something went wrong</h1>
        <p>{{ error }}</p>
      </div>
    </slot>
  </template>
</template>

<script lang="ts" setup>
  import { onErrorCaptured, ref } from 'vue'

  const error = ref()

  onErrorCaptured((err) => {
    error.value = err
    return false
  })
</script>