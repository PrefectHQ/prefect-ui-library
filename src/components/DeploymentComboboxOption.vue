<template>
  <div class="deployment-combobox-option">
    <template v-if="flow">
      <span class="deployment-combobox-option__flow-name">
        {{ flow.name }}
      </span>
      <p-icon icon="ChevronRightIcon" size="small" class="deployment-combobox-option__chevron" />
    </template>
    {{ deploymentName }}
  </div>
</template>

<script lang="ts" setup>
  import { useFlow } from '@/compositions'

  const props = defineProps<{
    flowId: string,
    deploymentName?: string,
  }>()

  const { flow } = useFlow(() => props.flowId)
</script>

<style>
.deployment-combobox-option { @apply
  flex
  gap-1
  items-center
}

.deployment-combobox-option__chevron { @apply
  w-3
  h-3
}
</style>