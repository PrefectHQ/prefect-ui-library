<template>
  <p-content class="flow-run-create-form-when">
    <p-button-group v-model="when" :options="['Now', 'Later']" small />

    <template v-if="when == 'Later'">
      <p-label label="Start date" :message="startErrorMessage" :state="startState">
        <DateInput v-model="start" show-time />
      </p-label>
    </template>
  </p-content>
</template>

<script lang="ts" setup>
  import { useValidation } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import DateInput from '@/components/DateInput.vue'
  import { isRequiredIf } from '@/utilities/validation'

  const props = defineProps<{
    start: Date | null,
  }>()

  const emit = defineEmits<{
    'update:start': [Date | null],
  }>()

  const start = computed({
    get() {
      return props.start
    },
    set(value) {
      emit('update:start', value)
    },
  })

  const when = ref<'Now' | 'Later'>('Now')
  const { state: startState, error: startErrorMessage } = useValidation(start, isRequiredIf(() => when.value === 'Later')('Start date'))
</script>