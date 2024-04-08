<template>
  <AutomationCombobox v-model:selected="internalSelected" empty-message="Infer Automation" class="automation-automation-combobox">
    <template #option="{ option }">
      <template v-if="option.value === null">
        Infer Automation
      </template>
    </template>
  </AutomationCombobox>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationCombobox from '@/automations/components/AutomationCombobox.vue'

  const props = defineProps<{
    selected: string | string[] | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const internalSelected = computed({
    get() {
      return props.selected
    },
    set(selected: string | string[] | null) {
      emit('update:selected', selected)
    },
  })
</script>