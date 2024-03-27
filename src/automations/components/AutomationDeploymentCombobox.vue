<template>
  <DeploymentCombobox v-model:selected="internalSelected" allow-unset empty-message="Infer Deployment" class="automation-deployment-combobox">
    <template #option="{ option }">
      <template v-if="option.value === null">
        Infer Deployment
      </template>
    </template>
  </DeploymentCombobox>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'

  const props = defineProps<{
    selected: string | string[] | null | undefined,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | string[] | null): void,
  }>()

  const internalSelected = computed({
    get() {
      return props.selected ?? null
    },
    set(selected: string | string[] | null) {
      emit('update:selected', selected)
    },
  })
</script>