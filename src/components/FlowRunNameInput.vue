<template>
  <p-text-input v-model="name" class="flow-run-name-input">
    <template #append>
      <p-button color="primary" icon="ArrowPathIcon" flat @click="name = generateRandomName()" />
    </template>
  </p-text-input>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue'
  import { mocker } from '@/services'

  const props = defineProps<{
    modelValue: string | null | undefined,
  }>()

  const emit = defineEmits<{
    'update:modelValue': [string | null | undefined],
  }>()

  onMounted(() => {
    if (!props.modelValue) {
      name.value = generateRandomName()
    }
  })

  const name = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const generateRandomName = (): string => {
    return mocker.create('runName')
  }
</script>