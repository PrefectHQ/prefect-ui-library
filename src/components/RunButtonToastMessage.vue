<template>
  <div class="toast-message">
    Flow Run {{ runName }} Scheduled
    <p-button @click="handleClick">
      Go To Run
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { PButton } from '@prefecthq/prefect-design'
  import { computed } from '@vue/reactivity'
  // import { FlowRun } from '@/models/FlowRun'

  import { useStore } from '@/stores/toast'


  // const store = useStore()

  const props = defineProps<{
    name: string,
  }>()


  const runName = computed(() => {
    console.log('name', props.name)
    // return store.runName
    return props.name
  })
  const handleClick = (): void=> console.log('clicked')
</script>