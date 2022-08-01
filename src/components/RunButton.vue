<template>
  <RunForm :deployment="deployment" class="run-button">
    <template #default="{ open }">
      <p-button
        v-if="can.create.flow_run"
        class="run-button__modal-activator"
        inset
        :disabled="deployment.deprecated"
        v-bind="$attrs"
        @click="open"
      >
        Run
        <p-icon class="run-button__run-icon" icon="PlayIcon" solid />
      </p-button>
    </template>
  </RunForm>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import RunForm from './RunForm.vue'
  import { Deployment } from '@/models'
  import { canKey } from '@/types'
  import { inject } from '@/utilities'

  defineProps<{
    deployment: Deployment,
  }>()

  const can = inject(canKey)
</script>

<style>
.run-button__run-icon { @apply
  w-5
  h-5
}
</style>

