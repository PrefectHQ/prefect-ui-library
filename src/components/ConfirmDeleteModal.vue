<template>
  <p-modal v-model:showModal="internalValue">
    <template #icon>
      <p-icon icon="ExclamationCircleIcon" class="delete-modal__icon" />
    </template>
    <template #title>
      <div class="delete-modal__title">
        <slot name="title">
          {{ `${action} ${label}` }}
        </slot>
      </div>
    </template>
    <span class="delete-modal__message">
      <slot name="message">
        Are you sure you want to {{ action.toLowerCase() }} {{ name }}?
      </slot>
    </span>
    <template #actions>
      <slot name="actions">
        <p-button class="delete-modal__delete-button" @click="handleDeleteClick">
          {{ action }}
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>


<script lang="ts" setup>
  import { computed, withDefaults } from 'vue'

  const props = withDefaults(defineProps<{
    showModal: boolean,
    label?: string,
    name?: string,
    action?: 'Delete' | 'Remove',
  }>(), {
    name: '',
    label: undefined,
    action: 'Delete',
  })

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
