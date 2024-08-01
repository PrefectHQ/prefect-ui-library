<template>
  <p-tooltip text="Download a csv of all logs" avoid-collisions>
    <p-button class="flow-run-logs-download-button" icon="Download" :loading @click="download" />
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'

  const { flowRun } = defineProps<{
    flowRun: FlowRun,
  }>()

  const api = useWorkspaceApi()
  const loading = ref(false)

  async function download(): Promise<void> {
    loading.value = true

    try {
      await api.flowRuns.downloadFlowRunLogs(flowRun.id, flowRun.name)
    } catch (error) {
      console.error(error)

      showToast('There was an error downloading logs', 'error')
    }

    loading.value = false
  }
</script>