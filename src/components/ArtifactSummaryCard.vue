<template>
  <p-card class="artifact-summary-card" :class="classes.root">
    <div class="artifact-summary-card__body" :class="classes.body">
      <header class="artifact-summary-card__header" :class="classes.header">
        <h6 class="artifact-summary-card__subheader" :class="classes.subheader">
          {{ artifactLabel }}
        </h6>
        <h3 v-if="artifact.key">
          {{ artifact.key }}
        </h3>

        <template v-if="hasRun">
          <p-bread-crumbs :crumbs="crumbs" class="artifact-summary-card__bread-crumbs" :class="classes.breadCrumbs" />
        </template>
      </header>

      <div class="artifact-summary-card__summary-container" :class="classes.summaryContainer">
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
    </div>

    <div v-if="slots.default" class="artifact-summary-card__slot">
      <slot />
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed, ref, useSlots } from 'vue'
  import { useFlowRun, useTaskRun, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { formatDateTime } from '@/utilities'

  const props = defineProps<{
    artifact: Artifact,
    condense?: boolean,
  }>()

  const slots = useSlots()
  const routes = useWorkspaceRoutes()

  const flowRunId = ref(props.artifact.flowRunId)
  const taskRunId = ref(props.artifact.taskRunId)

  const flowRun = useFlowRun(flowRunId)
  const taskRun = useTaskRun(taskRunId)

  const hasRun = computed(() => props.artifact.flowRunId || props.artifact.taskRunId)

  const artifactLabel = computed(() => {
    return props.artifact.key ? localization.info.artifactLabel : localization.info.artifactResultLabel
  })

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = []

    if (flowRunId.value) {
      internalCrumbs.push({
        text: flowRun.value?.name ?? '|',
        to: routes.flowRun(flowRunId.value),
      })
    }

    if (taskRunId.value) {
      internalCrumbs.push({
        text: taskRun.value?.name ?? '|',
        to: routes.taskRun(taskRunId.value),
      })
    }

    return internalCrumbs
  })

  const classes = computed(() => {
    return {
      root: {
        'artifact-summary-card--condensed': props.condense,
      },
      body: {
        'artifact-summary-card__body--condensed': props.condense,
      },
      header: {
        'artifact-summary-card__header--condensed': props.condense,
      },
      subheader: {
        'artifact-summary-card__subheader--condensed': props.condense,
      },
      breadCrumbs: {
        'artifact-summary-card__bread-crumbs--condensed': props.condense,
      },
      summaryContainer: {
        'artifact-summary-card__summary-container--condensed': props.condense,
      },
    }
  })
</script>

<style>
.artifact-summary-card { @apply
  flex
  flex-col
  gap-y-2
  text-base
}

.artifact-summary-card--condensed { @apply
  text-sm
  p-4
}

.artifact-summary-card__body { @apply
  flex
  flex-col
  gap-y-2
}

.artifact-summary-card__body--condensed { @apply
  flex-col
  sm:flex-row
  gap-x-2
  gap-y-0
  items-start
  sm:items-center
  sm:justify-between
}

.artifact-summary-card__header { @apply
  text-2xl
  font-bold
}

.artifact-summary-card__header--condensed { @apply
  text-lg
  font-bold
}

.artifact-summary-card__subheader { @apply
  text-sm
  text-foreground-200
  uppercase
}

.artifact-summary-card__subheader--condensed { @apply
  text-xs
  text-foreground-200
  uppercase
}

.artifact-summary-card__bread-crumbs { @apply
  text-base
}

.artifact-summary-card__bread-crumbs--condensed { @apply
  text-sm
}

.artifact-summary-card__summary-container { @apply
  flex
  flex-col
  gap-y-2
}

.artifact-summary-card__summary-container--condensed { @apply
  gap-y-0
  justify-center
  self-stretch
  sm:self-auto
}

.artifact-summary-card__summary-item { @apply
  flex
  justify-between
  flex-col
  sm:flex-row-reverse
  items-baseline
  pb-1
  border-b
  border-b-foreground-50
}

.artifact-summary-card__summary-container--condensed .artifact-summary-card__summary-item { @apply
  border-b-0
  pb-0
  gap-x-2
  flex-row
  justify-self-stretch
  sm:justify-end
  items-center
}

.artifact-summary-card__summary-item-label { @apply
  text-sm
  text-foreground-200
}

.artifact-summary-card__summary-item-none { @apply
  text-sm
  text-foreground-200
}
</style>