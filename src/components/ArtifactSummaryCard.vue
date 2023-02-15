<template>
  <p-card>
    <header class="artifact-summary-card__header">
      <h3>
        {{ artifact.key }}
      </h3>
    </header>

    <div class="artifact-summary-card__summary-container">
      <div class="artifact-summary-card__summary-item">
        <span class="artifact-summary-card__summary-item-label">
          {{ localization.info.artifactRunLabel }}
        </span>
        <span class="artifact-summary-card__summary-item-value">
          <template v-if="hasRun">
            <span class="artifact-summary-card__summary-item-run">
              <p-bread-crumbs :crumbs="crumbs" class="artifact-summary-card__summary-item-run-crumbs" />
            </span>
          </template>
          <template v-else>
            <span class="artifact-summary-card__summary-item-none">
              {{ localization.info.artifactRunNone }}
            </span>
          </template>
        </span>
      </div>

      <div
        class="artifact-summary-card__summary-item"
        :title="artifact.updated.toLocaleString()"
      >
        <span class="artifact-summary-card__summary-item-label">
          {{ localization.info.artifactUpdatedTimestampLabel }}
        </span>
        <span class="artifact-summary-card__summary-item-value">
          {{ formatDateTime(artifact.updated) }}
        </span>
      </div>

      <div
        class="artifact-summary-card__summary-item"
        :title="artifact.created.toLocaleString()"
      >
        <span class="artifact-summary-card__summary-item-label">
          {{ localization.info.artifactCreatedTimestampLabel }}
        </span>
        <span class="artifact-summary-card__summary-item-value">
          {{ formatDateTime(artifact.created) }}
        </span>
      </div>
    </div>

    <div class="artifact-summary-card__body">
      <slot />
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { useFlowRun, useTaskRun, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { formatDateTime } from '@/utilities'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const routes = useWorkspaceRoutes()

  const flowRunId = ref(props.artifact.flowRunId)
  const taskRunId = ref(props.artifact.taskRunId)

  const flowRun = useFlowRun(flowRunId)
  const taskRun = useTaskRun(taskRunId)

  const hasRun = computed(() => props.artifact.flowRunId || props.artifact.taskRunId)

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = []

    if (flowRunId.value) {
      internalCrumbs.push({
        text: flowRun.value?.name ?? '',
        to: routes.flowRun(flowRunId.value),
      })
    }

    if (taskRunId.value) {
      internalCrumbs.push({
        text: taskRun.value?.name ?? '',
        to: routes.taskRun(taskRunId.value),
      })
    }

    return internalCrumbs
  })
</script>

<style>
.artifact-summary-card__header { @apply
  text-lg
  font-bold
  mb-4
}

.artifact-summary-card__summary-container { @apply
  flex
  flex-col
  gap-y-2
}

.artifact-summary-card__summary-item { @apply
  flex
  justify-between
  flex-row-reverse
  border-b
  border-b-foreground-50
}

.artifact-summary-card__summary-item-label { @apply
  text-sm
  text-foreground-200
}

.artifact-summary-card__summary-item-none { @apply
  text-sm
  text-foreground-200
}

.artifact-summary-card__summary-item-run-crumbs { @apply
  text-base
}
</style>