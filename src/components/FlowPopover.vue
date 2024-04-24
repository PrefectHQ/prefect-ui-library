<template>
  <p-pop-over v-if="flow" :placement="placement">
    <template #target="scope">
      <slot v-bind="scope">
        {{ flow.name }}
      </slot>
    </template>

    <p-card>
      <p-heading heading="4">
        {{ flow.name }}
      </p-heading>
    </p-card>
  </p-pop-over>
</template>

<script lang="ts" setup>
  import { positions } from '@prefecthq/prefect-design'
  import { useFlow } from '@/compositions'

  const props = defineProps<{
    id: string,
  }>()

  const placement = [positions.top, positions.bottom, positions.right, positions.left]

  const { flow } = useFlow(() => props.id)
</script>