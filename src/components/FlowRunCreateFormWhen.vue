<template>
  <div class="flow-run-create-form-when">
    <p-button-group v-model="when" :options="whenOptions" small />

    <template v-if="when == 'later'">
      <div class="flow-run-create-form__row">
        <p-label label="Date" :message="startErrorMessage" :state="startState">
          <DateInput v-model="start" show-time />
        </p-label>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ButtonGroupOption } from '@prefecthq/prefect-design'
  import { useValidation } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
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

  const whenOptions: ButtonGroupOption[] = [{ label: 'Now', value: 'now' }, { label: 'Later', value: 'later' }]
  const when = ref<'now' | 'later'>('now')

  const { state: startState, error: startErrorMessage } = useValidation(start, isRequiredIf(() => when.value === 'later')('Start Date'))
</script>