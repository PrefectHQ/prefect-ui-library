<template>
  <div class="help-icon-modal">
    {{ title }}
    <p-icon class="help-icon-modal__icon" v-bind="attrs" :icon="icon" solid @click.stop.prevent="open" />

    <p-modal v-model:show-modal="showModal" :title="title">
      <slot name="description" />

      <slot name="content" />

      <template #cancel>
        <p-button inset @click="showModal = false">
          Close
        </p-button>
      </template>
    </p-modal>
  </div>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { useAttrs } from 'vue'
  import { useShowModal } from '@/compositions'

  defineProps<{
    title: string,
    icon: string,
  }>()

  const attrs = useAttrs()

  const { showModal, open } = useShowModal()
</script>

<style>
.help-icon-modal { @apply
  flex
  gap-1
  items-center
  }

.help-icon-modal__icon { @apply
  opacity-30
  transition
  hover:opacity-100
  active:opacity-70
}
</style>