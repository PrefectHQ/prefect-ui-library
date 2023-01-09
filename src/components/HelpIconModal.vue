<template>
  <div class="help-icon-modal">
    {{ title }}
    <p-icon class="help-icon-modal__icon" v-bind="attrs" icon="QuestionMarkCircleIcon" solid @click.stop.prevent="open" />
  </div>

  <p-modal v-model:show-modal="showModal" :title="title">
    {{ description }}

    <template #cancel>
      <p-button inset @click="showModal = false">
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
  import { useShowModal } from '@/compositions'

  defineProps<{
    title: string,
    description: string,
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