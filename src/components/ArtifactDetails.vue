<template>
  <div class="artifact-details">
    <template v-if="artifact">
      <template v-if="hasRunOrKey">
        <p-key-value v-if="artifact.key" label="Artifact" :alternate="alternate">
          <template #value>
            <ArtifactKeyIconText :artifact-id="artifact.id" />
          </template>
        </p-key-value>

        <p-key-value v-if="artifact.flowRunId" label="Flow Run" :alternate="alternate">
          <template #value>
            <FlowRunIconText :flow-run-id="artifact.flowRunId" />
          </template>
        </p-key-value>

        <p-key-value v-if="artifact.taskRunId" label="Task Run" :alternate="alternate">
          <template #value>
            <TaskRunIconText :task-run-id="artifact.taskRunId" />
          </template>
        </p-key-value>

        <p-divider />
      </template>

      <p-heading :heading="heading">
        Artifact
      </p-heading>

      <p-key-value label="Key" :value="artifact.key" :alternate="alternate" />

      <p-key-value label="Type" :value="artifact.type" :alternate="alternate" />

      <p-key-value label="Created" :value="formatDateTimeNumeric(artifact.created)" :alternate="alternate" />
    </template>

    <template v-if="can.read.flow_run && flowRun">
      <p-divider />

      <p-heading :heading="heading">
        Flow Run
      </p-heading>

      <p-key-value label="Start Time" :alternate="alternate">
        <template #value>
          <FlowRunStartTime :flow-run="flowRun" />
        </template>
      </p-key-value>

      <p-key-value label="Duration" :alternate="alternate">
        <template #value>
          <DurationIconText :duration="flowRun.duration" />
        </template>
      </p-key-value>

      <p-key-value label="Created" :value="formatDateTimeNumeric(flowRun.created)" :alternate="alternate" />

      <template v-if="flowRun.createdBy">
        <p-key-value label="Created By" :value="flowRun.createdBy.displayValue" :alternate="alternate" />
      </template>

      <p-key-value label="Last Updated" :value="formatDateTimeNumeric(flowRun.updated)" :alternate="alternate" />

      <p-key-value label="Tags" :alternate="alternate">
        <template v-if="flowRun.tags?.length" #value>
          <p-tags :tags="flowRun.tags!" />
        </template>
      </p-key-value>

      <p-key-value label="State Message" :alternate="alternate">
        <template v-if="stateMessage" #value>
          <p-text-truncate :text="stateMessage" />
        </template>
      </p-key-value>
    </template>

    <template v-if="can.read.task_run && taskRun">
      <p-divider />

      <p-heading :heading="heading">
        Task Run
      </p-heading>

      <p-key-value label="Created" :value="formatDateTimeNumeric(taskRun.created)" :alternate="alternate" />

      <p-key-value label="Last Updated" :value="formatDateTimeNumeric(taskRun.updated)" :alternate="alternate" />

      <p-key-value label="Tags" :alternate="alternate">
        <template v-if="taskRun.tags?.length" #value>
          <p-tags :tags="taskRun.tags!" />
        </template>
      </p-key-value>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PTags } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { FlowRunStartTime, DurationIconText, FlowRunIconText, TaskRunIconText, ArtifactKeyIconText } from '@/components'
  import { useCan, useFlowRun, useTaskRun } from '@/compositions'
  import { Artifact } from '@/models'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  const props = defineProps<{
    artifact: Artifact,
    alternate?: boolean,
  }>()

  const can = useCan()
  const heading = computed(() => props.alternate ? 6 : 5)

  const flowRunId = computed(() => props.artifact.flowRunId)
  const { flowRun } = useFlowRun(flowRunId)
  const stateMessage = computed(() => flowRun.value?.state?.message)

  const taskRunId = computed(() => props.artifact.taskRunId)
  const { taskRun } = useTaskRun(taskRunId)

  const hasRunOrKey = computed(() => !!props.artifact.key || !!flowRunId.value || !!taskRunId.value)
</script>

<style>
.artifact-details { @apply
  flex
  flex-col
  gap-3
  items-start
}
</style>
