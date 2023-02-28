<template>
  <p-card class="result-summary-card" :class="classes.root">
    <div class="result-summary-card__body" :class="classes.body">
      <header class="result-summary-card__header" :class="classes.header">
        <h6 class="result-summary-card__subheader" :class="classes.subheader">
          {{ localization.info.result }}
        </h6>

        <template v-if="hasRun">
          <p-bread-crumbs :crumbs="crumbs" class="result-summary-card__bread-crumbs" :class="classes.breadCrumbs" />
        </template>
      </header>

      <div class="result-summary-card__summary-container" :class="classes.summaryContainer">
        <div class="result-summary-card__summary-item">
          <span class="result-summary-card__summary-item-label">
            {{ localization.info.type }}
          </span>
          <span class="result-summary-card__summary-item-value" :class="getSummaryItemValueClass(artifact.data.type)">
            {{ artifact.data.type ?? localization.info.none }}
          </span>
        </div>

        <div class="result-summary-card__summary-item">
          <span class="result-summary-card__summary-item-label">
            {{ localization.info.created }}
          </span>
          <span class="result-summary-card__summary-item-value">
            {{ formatDateTimeColloquial(artifact.created) }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="slots.default" class="result-summary-card__slot">
      <slot />
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { BreadCrumbs, ClassValue } from '@prefecthq/prefect-design'
  import { computed, useSlots } from 'vue'
  import { useFlowRun, useTaskRun, useWorkspaceRoutes } from '@/compositions'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { formatDateTimeColloquial, isNullish } from '@/utilities'

  const props = defineProps<{
    artifact: Artifact,
    condense?: boolean,
  }>()

  const slots = useSlots()
  const routes = useWorkspaceRoutes()

  const flowRunId = computed(() => props.artifact.flowRunId)
  const taskRunId = computed(() => props.artifact.taskRunId)

  const flowRun = useFlowRun(flowRunId)
  const taskRun = useTaskRun(taskRunId)

  const hasRun = computed(() => !!props.artifact.flowRunId || !!props.artifact.taskRunId)

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

  const classes = computed(() => {
    return {
      root: {
        'result-summary-card--condensed': props.condense,
      },
      body: {
        'result-summary-card__body--condensed': props.condense,
      },
      header: {
        'result-summary-card__header--condensed': props.condense,
      },
      subheader: {
        'result-summary-card__subheader--condensed': props.condense,
      },
      breadCrumbs: {
        'result-summary-card__bread-crumbs--condensed': props.condense,
      },
      summaryContainer: {
        'result-summary-card__summary-container--condensed': props.condense,
      },
    }
  })

  const getSummaryItemValueClass = (value: unknown): ClassValue => {
    return { 'result-summary-card__summary-item-value--none': isNullish(value) }
  }
</script>

<style>
.result-summary-card { @apply
  flex
  flex-col
  gap-y-2
  text-base
}

.result-summary-card--condensed { @apply
  text-sm
  p-4
}

.result-summary-card__body { @apply
  flex
  flex-col
  gap-y-2
}

.result-summary-card__body--condensed { @apply
  flex-col
  sm:flex-row
  gap-x-2
  gap-y-0
  items-start
  sm:items-center
  sm:justify-between
}

.result-summary-card__header { @apply
  text-2xl
  font-bold
}

.result-summary-card__header--condensed { @apply
  text-lg
  font-bold
}

.result-summary-card__subheader { @apply
  text-sm
  text-foreground-200
  uppercase
}

.result-summary-card__subheader--condensed { @apply
  text-xs
  text-foreground-200
  uppercase
}

.result-summary-card__bread-crumbs { @apply
  text-sm
}

.result-summary-card__bread-crumbs--condensed { @apply
  text-sm
}

.result-summary-card__summary-container { @apply
  flex
  flex-col
  gap-y-2
}

.result-summary-card__summary-container--condensed { @apply
  gap-y-0
  justify-center
  self-stretch
  sm:self-auto
}

.result-summary-card__summary-item { @apply
  flex
  justify-between
  flex-col
  sm:flex-row-reverse
  items-baseline
  pb-1
  border-b
  border-b-foreground-50
}

.result-summary-card__summary-container--condensed .result-summary-card__summary-item { @apply
  border-b-0
  pb-0
  gap-x-2
  flex-row
  justify-self-stretch
  sm:justify-end
  items-center
}

.result-summary-card__summary-item-label { @apply
  text-sm
  text-foreground-200
  capitalize
}

.result-summary-card__summary-item-value { @apply
  capitalize
  font-medium
}

.result-summary-card__summary-item-value--none { @apply
  text-sm
  text-foreground-200
  italic
}
</style>