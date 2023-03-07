<template>
  <p-card class="artifact-card" :class="classes.root">
    <div class="artifact-card__body" :class="classes.body">
      <header class="artifact-card__header" :class="classes.header">
        <div class="artifact-card__subheader" :class="classes.subheader">
          {{ artifact.type }}
        </div>
        <div v-if="hasKey" class="artifact-card__title">
          {{ artifact.key }}
        </div>

        <template v-if="hasRun && crumbs.length">
          <p-bread-crumbs :crumbs="crumbs" class="artifact-card__bread-crumbs" :class="classes.breadCrumbs" />
        </template>
      </header>

      <div class="artifact-card__summary-container" :class="classes.summaryContainer">
        <div
          class="artifact-card__summary-item"
          :title="artifact.updated.toLocaleString()"
        >
          <span class="artifact-card__summary-item-label">
            {{ localization.info.lastUpdated }}
          </span>
          <span class="artifact-card__summary-item-value">
            {{ formatDateTime(artifact.updated) }}
          </span>
        </div>

        <div
          class="artifact-card__summary-item"
          :title="artifact.created.toLocaleString()"
        >
          <span class="artifact-card__summary-item-label">
            {{ localization.info.created }}
          </span>
          <span class="artifact-card__summary-item-value">
            {{ formatDateTime(artifact.created) }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="slots.default" class="artifact-card__slot">
      <slot />
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { BreadCrumbs } from '@prefecthq/prefect-design'
  import { computed, useSlots } from 'vue'
  import { useRoute } from 'vue-router'
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
  const route = useRoute()

  const flowRunId = computed(() => props.artifact.flowRunId)
  const taskRunId = computed(() => props.artifact.taskRunId)

  const flowRun = useFlowRun(flowRunId)
  const taskRun = useTaskRun(taskRunId)

  const hasRun = computed(() => !!props.artifact.flowRunId || !!props.artifact.taskRunId)
  const hasKey = computed(() => !!props.artifact.key)

  const crumbs = computed<BreadCrumbs>(() => {
    const internalCrumbs: BreadCrumbs = []

    if (flowRunId.value && !routeIncludes.value.flowRun) {
      internalCrumbs.push({
        text: flowRun.value?.name ?? '',
        to: routes.flowRun(flowRunId.value),
      })
    }

    if (taskRunId.value && !routeIncludes.value.taskRun) {
      internalCrumbs.push({
        text: taskRun.value?.name ?? '',
        to: routes.taskRun(taskRunId.value),
      })
    }

    return internalCrumbs
  })

  const routeIncludes = computed(() => {
    return {
      flowRun: flowRunId.value && route.fullPath.includes(flowRunId.value),
      taskRun: taskRunId.value && route.fullPath.includes(taskRunId.value),
    }
  })

  const classes = computed(() => {
    return {
      root: {
        'artifact-card--condensed': props.condense,
      },
      body: {
        'artifact-card__body--condensed': props.condense,
      },
      header: {
        'artifact-card__header--condensed': props.condense,
      },
      subheader: {
        'artifact-card__subheader--condensed': props.condense,
      },
      breadCrumbs: {
        'artifact-card__bread-crumbs--condensed': props.condense,
      },
      summaryContainer: {
        'artifact-card__summary-container--condensed': props.condense,
      },
    }
  })
</script>

<style>
.artifact-card { @apply
  flex
  flex-col
  gap-y-2
  text-base
}

.artifact-card--condensed { @apply
  text-sm
  p-4
}

.artifact-card__body { @apply
  flex
  flex-col
  gap-y-2
}

.artifact-card__body--condensed { @apply
  flex-col
  sm:flex-row
  gap-x-2
  gap-y-0
  items-start
  sm:items-center
  sm:justify-between
}

.artifact-card__header { @apply
  text-2xl
  font-bold
}

.artifact-card__header--condensed { @apply
  text-lg
  font-bold
}

.artifact-card__subheader { @apply
  text-sm
  text-foreground-200
  uppercase
}

.artifact-card__subheader--condensed { @apply
  text-xs
  text-foreground-200
  uppercase
}

.artifact-card__bread-crumbs { @apply
  text-base
}

.artifact-card__bread-crumbs--condensed { @apply
  text-sm
}

.artifact-card__summary-container { @apply
  flex
  flex-col
  gap-y-2
}

.artifact-card__summary-container--condensed { @apply
  gap-y-0
  justify-center
  self-stretch
  sm:self-auto
}

.artifact-card__summary-item { @apply
  flex
  justify-between
  flex-col
  sm:flex-row-reverse
  items-baseline
  pb-1
  border-b
  border-b-foreground-50
}

.artifact-card__summary-container--condensed .artifact-card__summary-item { @apply
  border-b-0
  pb-0
  gap-x-2
  flex-row
  justify-self-stretch
  sm:justify-end
  items-center
}

.artifact-card__summary-item-label { @apply
  text-sm
  text-foreground-200
  capitalize
}

.artifact-card__summary-item-value--none { @apply
  text-sm
  text-foreground-100
  italic
}
</style>