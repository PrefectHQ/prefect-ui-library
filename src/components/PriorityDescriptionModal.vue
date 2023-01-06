<template>
  <p-icon class="priority-description-modal__icon" v-bind="attrs" icon="QuestionMarkCircleIcon" solid @click.stop.prevent="show = true" />
  <p-modal v-model:show-modal="show" title="Priority">
    Priority specifies how Prefect prioritizes the delivery of work — more precisely, execution of flow runs among worker pools. Priority must be a unique, positive integer. Lower numbers indicate higher pool priorities. For example, 1 is the highest priority queue and its flow run execution takes precedence over any lower-priority pool. 10 is a lower priority queue than 1, and 100 is lower priority than both 1 and 10. If you specify a priority that already exists, the new priority supersedes any previously set priority on a worker pool.

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

<style>
.priority-description-modal__icon { @apply
  opacity-30
  transition
  hover:opacity-100
  active:opacity-70
}
</style>