<template>
  <div class="delete-overflow-menu-item">
    <p-overflow-menu-item label="Delete" @click="showModal = true" />

    <p-modal v-model:showModal="showModal">
      <template #title>
        <div class="delete-overflow-menu-item__title">
          <p-icon icon="ExclamationCircleIcon" class="delete-overflow-menu-item__title-icon" />
          <span class="delete-overflow-menu-item__title-name">Delete {{ name }}</span>
          <p-icon icon="XIcon" class="delete-overflow-menu-item__close-icon" @click="showModal = false" />
        </div>
        <hr class="delete-overflow-menu-item__divider">
      </template>

      <template #content>
        <slot name="message">
          <p class="delete-overflow-menu-item__message">
            Are you sure you want to delete {{ name }}? This action cannot be undone.
          </p>
        </slot>
        <slot name="details" />
      </template>

      <template #actions>
        <p-button class="delete-overflow-menu-item__delete-button" @click="remove">
          Delete
        </p-button>
      </template>
    </p-modal>
  </div>
</template>

<script lang="ts" setup>
  import { POverflowMenuItem } from '@prefecthq/prefect-design'
  import { ref } from 'vue'

  defineProps<{
    name: string,
  }>()

  const showModal = ref(false)
  const emit = defineEmits(['remove'])

  const remove = (): void => {
    emit('remove')
    showModal.value = false
  }
</script>

<style>
.delete-overflow-menu-item__title {
  @apply
  flex
  gap-2
  items-center
  pb-2
}

.delete-overflow-menu-item__title-icon {
  @apply
  h-6
  w-6
  stroke-red-500
}

.delete-overflow-menu-item__title-name {
  @apply
  font-bold
  text-xl
}

.delete-overflow-menu-item__close-icon {
  @apply
  h-6
  w-6
  ml-auto
  stroke-gray-400
  cursor-pointer
}

.delete-overflow-menu-item__divider {
  @apply
  border-gray-300
  -mx-6
  my-2
  border-t-[1px]
}

.delete-overflow-menu-item__message {
  @apply
  text-red-500
  font-bold
}

.delete-overflow-menu-item__delete-button {
  @apply
  w-full
  bg-red-500
  inline-flex
  justify-center
  sm:w-auto
  sm:text-sm
  focus:ring-red-600
  hover:!bg-red-700
}
</style>