<template>
  <p-icon v-bind="attrs" icon="QuestionMarkCircleIcon" solid @click.stop.prevent="show = true" />
  <p-modal v-model:show-modal="show" title="Day Or">
    When the "Day Or" value is off, this schedule will connect day of the month and day of the week entries
    using OR logic; when on it will connect them using AND logic.

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
</script>