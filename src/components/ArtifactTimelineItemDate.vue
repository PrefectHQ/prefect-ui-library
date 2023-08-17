<template>
  <div class="artifact-timeline-item-date" :title="formatDateTimeNumeric(artifact.created)">
    <div
      v-if="latest"
      class="artifact-timeline-item-date__latest"
    >
      <p-icon class="artifact-timeline-item-date__latest-icon" icon="TagIcon" size="small" />
      {{ localization.info.latest }}
    </div>

    <span class="artifact-timeline-item-date__time">{{ formatTime(artifact.created) }}</span>
    <span class="artifact-timeline-item-date__date">{{ formatDate(artifact.created) }} </span>
  </div>
</template>

<script lang="ts" setup>
  import { localization } from '@/localization'
  import { Artifact } from '@/models'
  import { formatDate, formatDateTimeNumeric, formatTime } from '@/utilities'

  defineProps<{
    artifact: Artifact,
    latest?: boolean,
  }>()
</script>

<style>
.artifact-timeline-item-date { @apply
  text-sm
  flex
  flex-col
  items-end
}

.artifact-timeline-item-date__latest { @apply
  inline-flex
  items-center
  border-divider
  border
  rounded-full
  px-3
  w-min
  gap-1
  mb-1
  text-sm
}

.artifact-timeline-item-date__latest-icon { @apply
  h-4
  w-4
}

.artifact-timeline-item-date__date { @apply
  text-xs
  text-subdued
  leading-5
}
</style>