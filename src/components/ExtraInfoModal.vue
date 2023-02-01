<template>
  <button v-bind="attrs" type="button" @click.stop.prevent="show = true">
    <p-icon icon="QuestionMarkCircleIcon" solid />
  </button>
  <p-modal v-model:show-modal="show" :title="title">
    <slot />
    <template #cancel>
      <p-button inset @click="show = false">
        Close
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { ref, useAttrs } from 'vue'

  const attrs = useAttrs()

  const show = ref(false)

  defineProps({
    title: {
      type: String,
      required: true,
    },
  })
</script>