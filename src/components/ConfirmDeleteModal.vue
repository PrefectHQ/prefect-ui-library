<template>
  <p-modal v-model:showModal="internalValue">
    <template #icon>
      <p-icon icon="ExclamationCircleIcon" class="delete-modal__icon" />
    </template>
    <template #title>
      <div class="delete-modal__title">
        <slot name="title">
          {{ `Remove ${name}` }}
        </slot>
      </div>
    </template>
    <span class="delete-modal__message">
      <slot name="message">
        Are you sure you want to remove this {{ name.toLowerCase() }}?
      </slot>
    </span>
    <template #actions>
      <p-button class="delete-modal__delete-button" @click="handleDeleteClick">
        Delete
      </p-button>
    </template>
  </p-modal>
</template>


<script lang="ts" setup>
  import { computed } from 'vue'

  const props = defineProps<{
    showModal: boolean,
    name: string,
  }>()

  const emits = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'delete'): void,
  }>()

  const internalValue = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emits('update:showModal', value)
    },
  })

  const handleDeleteClick = (): void => {
    emits('delete')
    internalValue.value = false
  }
</script>

<style>
.delete-modal__icon { @apply
  stroke-red-500
}

.delete-modal__title { @apply
  capitalize
}

.delete-modal__message { @apply
  text-red-500
  font-bold
}

.delete-modal__delete-button { @apply
  bg-red-500
  focus:ring-red-600
  hover:!bg-red-700
}
</style>
