<template>
  <p-context-menu v-if="flow">
    <template #target>
      <FlowPopover :id="id">
        <template #default="{ open, close }">
          <p-tag class="flow-tag" @mouseover="open" @mouseout="close">
            <p-icon icon="PFlow" class="flow-tag__icon" />
            {{ flow.name }}
          </p-tag>
        </template>
      </FlowPopover>
    </template>
  </p-context-menu>
</template>

<script lang="ts" setup>
  import FlowPopover from '@/components/FlowPopover.vue'
  import { useFlow } from '@/compositions'

  const props = defineProps<{
    id: string,
  }>()

  const { flow } = useFlow(() => props.id)
</script>

<style>
.flow-tag { @apply
  text-sm
  flex
  gap-1
}

.flow-tag__icon { @apply
  w-4
  h-4
}
</style>