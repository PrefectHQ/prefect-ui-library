<template>
  <div class="delete-overflow-menu-item">
    <p-overflow-menu-item label="Delete" @click="showModal = true" />

    <p-modal v-model:showModal="showModal" :title="`Delete ${ name }`">
      <template #icon>
        <p-icon icon="ExclamationCircleIcon" class="delete-overflow-menu-item__title-icon" />
      </template>

      <slot name="message">
        <p class="delete-overflow-menu-item__message">
          Are you sure you want to delete {{ name }}? This action cannot be undone.
        </p>
      </slot>
      <slot name="details" />

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
  const emit = defineEmits(['delete'])

  const remove = (): void => {
    emit('delete')
    showModal.value = false
  }
</script>

<style>
.delete-overflow-menu-item__title-icon { @apply
  stroke-red-500
}

.delete-overflow-menu-item__message { @apply
  text-red-500
  font-bold
}

.delete-overflow-menu-item__delete-button { @apply
  bg-red-500
  focus:ring-red-600
  hover:!bg-red-700
}
</style>