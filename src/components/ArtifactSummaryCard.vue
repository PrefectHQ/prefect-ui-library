<template>
  <p-card>
    <header class="artifact-summary-card__header">
      <h3>
        {{ artifact.key }}
      </h3>
    </header>


    <div class="artifact-summary-card__summary-container">
      <template v-for="summary in summaryKeys" :key="summary.label">
        <div class="artifact-summary-card__summary-item" :title="summary.value.toLocaleString()">
          <span class="artifact-summary-card__summary-item-label">
            {{ summary.label }}
          </span>
          <span class="artifact-summary-card__summary-item-value">
            {{ summary.nice }}
          </span>
        </div>
      </template>
    </div>

    <div class="artifact-summary-card__body">
      <slot />
    </div>
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { formatDateTime } from '@/utilities'

  const props = defineProps<{
    artifact: Artifact,
  }>()

  const summaryKeys = computed(() => {
    return [
      {
        label: localization.info.artifactCreatedTimestampLabel,
        nice: formatDateTime(props.artifact.created),
        value: props.artifact.created,
      },
      {
        label: localization.info.artifactUpdatedTimestampLabel,
        nice: formatDateTime(props.artifact.updated),
        value: props.artifact.updated,
      },
    ]
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
</style>