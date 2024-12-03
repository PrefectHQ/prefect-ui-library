<template>
  <p-modal v-model:showModal="show">
    <template #icon>
      <p-icon icon="ExclamationCircleIcon" class="delete-modal__icon" />
    </template>
    <template #title>
      <div class="delete-modal__title">
        <slot name="title">
          {{ `${action} ${label ?? name}` }}
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
        <p-button variant="destructive" :loading @click="handleDeleteClick">
          {{ action }}
        </p-button>
      </slot>
    </template>
  </p-modal>
</template>


<script lang="ts" setup>
  const show = defineModel<boolean>('showModal', { required: true })

  withDefaults(defineProps<{
    label?: string,
    name?: string,
    loading?: boolean,
    action?: 'Delete' | 'Remove',
  }>(), {
    name: '',
    label: undefined,
    action: 'Delete',
  })

  const emits = defineEmits<{
    (event: 'delete'): void,
  }>()

  const handleDeleteClick = (): void => {
    emits('delete')
    show.value = false
  }
</script>

<style>
.delete-modal__icon { @apply
  stroke-sentiment-negative
}

.delete-modal__title { @apply
  capitalize
}
</style>
