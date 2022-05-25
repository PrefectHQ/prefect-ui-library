<template>
  <p-overflow-menu-item label="Delete" @click="showModal = true" />

  <p-modal
    v-model:showModal="showModal"
  >
    <template #title>
      <div class="flex gap-2 items-center pb-2">
        <p-icon icon="ExclamationCircleIcon" class="h-6 w-6 stroke-red-500" />
        <span class="font-bold text-xl">Delete {{ name }}</span>
        <p-icon icon="XIcon" class="h-6 w-6 ml-auto stroke-gray-400 cursor-pointer" @click="showModal = false" />
      </div>
      <hr
        class="border-t-1 border-gray-300 -mx-6 my-2"
      >
    </template>

    <template #content>
      <slot name="message">
        <p class="text-red-500 font-bold">
          Are you sure you want to delete {{ name }}? This action cannot be undone.
        </p>
      </slot>
      <slot name="details" />
    </template>

    <template #actions>
      <p-button class="w-full bg-red-500 inline-flex justify-center sm:w-auto sm:text-sm" @click="initiateDelete">
        Delete
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { POverflowMenuItem } from '@prefecthq/prefect-design'
  import { ref } from 'vue'

  defineProps<{
    id: string,
    name: string,
  }>()

  const showModal = ref(false)
  const emit = defineEmits(['remove'])

  const initiateDelete = (): void => {
    emit('remove')
    showModal.value = false
  }
</script>