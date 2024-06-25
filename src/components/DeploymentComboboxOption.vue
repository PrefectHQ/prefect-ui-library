<template>
  <div class="deployment-combobox-option">
    <template v-if="flow">
      <span class="deployment-combobox-option__flow-name">
        {{ flow.name }}
      </span>
      <p-icon icon="ChevronRightIcon" size="small" class="deployment-combobox-option__chevron" />
    </template>
    {{ deploymentName ?? deployment?.name }}
  </div>
</template>

<script lang="ts" setup>
  import { useDeployment, useFlow } from '@/compositions'

  const props = defineProps<{
    deploymentId: string,
    deploymentName?: string,
  }>()

  const { deployment } = useDeployment(() => props.deploymentId)
  const { flow } = useFlow(() => deployment.value?.flowId)
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