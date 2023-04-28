<template>
  <button class="extra-info-modal" v-bind="attrs" type="button" @click.stop.prevent="open">
    <p-icon icon="QuestionMarkCircleIcon" solid />
  </button>
  <p-modal v-model:show-modal="showModal" :title="title">
    <slot />

    <template #actions>
      <slot name="actions" />
    </template>

    <template #cancel>
      <p-button inset @click="close">
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
  import { useAttrs } from 'vue'
  import { useShowModal } from '@/compositions/useShowModal'

  defineProps<{
    title: string,
  }>()

  const attrs = useAttrs()
  const { showModal, open, close } = useShowModal()
</script>

<style>
.extra-info-modal { @apply
  pl-1
  align-middle
  -translate-y-[10%]
}
</style>